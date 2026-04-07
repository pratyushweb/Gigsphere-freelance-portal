# Deploying GigSphere

GigSphere is a massive full-stack application. Here is the step-by-step guide to deploying this system production-ready.

## 1. Database Setup (Supabase)
1. Log into your [Supabase](https://supabase.com) account and create a new project.
2. Go to the SQL Editor and paste the entire contents of the `backend/schema.sql` file.
3. Run the SQL script. This establishes all tables, constraints, and foreign key relations securely.
4. Retrieve your **Transaction Connection String** from `Project Settings > Database`.

## 2. Stripe Configuration
1. Log into your [Stripe Dashboard](https://stripe.com).
2. Go to API Keys, and copy your `Secret Key`.
3. Go to Webhooks, add an endpoint for `https://your-backend-url.com/api/payments/webhook`, select listening for `checkout.session.completed`, and copy the `Webhook Signing Secret`.

## 3. Anthropic (Claude AI)
1. Go to the [Anthropic Console](https://console.anthropic.com).
2. Generate an API Key to ensure the `/proposals` ranking system works.

## 4. Deploy Backend (Railway)
1. Push the `backend` folder to a GitHub repository or use the Railway CLI:
   ```bash
   cd backend
   railway up
   ```
2. Navigate to your Railway project variables and set:
   - `NODE_ENV=production`
   - `PORT=8080`
   - `CLIENT_URL=https://your-frontend-deployment-url.vercel.app`
   - `DATABASE_URL=[Your Supabase connection string]`
   - `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`
   - `ANTHROPIC_API_KEY`
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
3. Railway will auto-detect Node.js via `package.json` and start the server using `npm start` -> `node server.js`.

## 5. Deploy Frontend (Vercel)
1. Ensure your `frontend` React/Vite project makes Axios or Fetch requests to the deployed Railway URL.
2. Connect your GitHub repository to [Vercel](https://vercel.com).
3. Important: Ensure the Vite framework preset is selected on Vercel.
4. Set any frontend environmental variables.
5. Deploy!

### Common Deployment Issues
- **CORS Errors**: Ensure your Railway `CLIENT_URL` exactly matches the Vercel URL (with `https://` and without a trailing slash).
- **Socket Disconnecting**: If deployed on Railway, the load balancers automatically support Websockets natively. Ensure the Frontend connects to `wss://your-railway-app.up.railway.app`.
- **Database Refusing Connection**: Ensure you're using the connection pooling string from Supabase (usually port 6543) if you're experiencing timeout issues rather than the direct string (port 5432).
