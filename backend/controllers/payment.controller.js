import { stripe } from '../config/stripe.js';
import { query } from '../config/db.js';

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // Note: We need raw body here, so express.raw({type: 'application/json'}) is required in the router
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const contractId = session.metadata.contract_id;

      try {
        // Update payment status to held (in escrow)
        await query(
          `UPDATE payments SET status = 'held', paid_at = CURRENT_TIMESTAMP WHERE stripe_session_id = $1`,
          [session.id]
        );
        console.log(`Payment localized and held for contract: ${contractId}`);
      } catch (err) {
        console.error("Database update error on checkout complete:", err);
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};
