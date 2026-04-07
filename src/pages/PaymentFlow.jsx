import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, CreditCard, Apple, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

const PaymentFlow = () => {
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success

  const handlePayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pt-20 px-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 shadow-inner"
          >
            <CheckCircle className="w-12 h-12" />
          </motion.div>
          <h2 className="text-3xl font-black text-textMain mb-2">Payment Secure!</h2>
          <p className="text-muted mb-8">
            Your payment of <strong>$5,000</strong> has been held in escrow. 
            The contract is now officially active.
          </p>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-8 text-left">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted">Transaction ID</span>
              <span className="font-mono">tx_89hf29hf...</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">Date</span>
              <span>Oct 12, 2026</span>
            </div>
          </div>
          <Button className="w-full">Go to Contract Room</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] pt-28 pb-20 px-6 flex items-center justify-center">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 bg-white p-2 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Order Summary */}
        <div className="w-full md:w-5/12 bg-surface p-8 rounded-2xl relative overflow-hidden">
           <div className="absolute top-[-20%] left-[-20%] w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
           <h2 className="text-xl font-bold mb-6 relative z-10">Order Summary</h2>
           
           <div className="space-y-4 mb-8 relative z-10">
             <div className="flex justify-between items-start">
               <div>
                 <h4 className="font-bold text-sm">LLaMA Fine-tuning</h4>
                 <p className="text-xs text-muted">Fixed Price Project</p>
               </div>
               <span className="font-bold">$5,000.00</span>
             </div>
             
             <div className="flex justify-between items-start pt-4 border-t border-gray-200">
               <div>
                 <h4 className="font-bold text-sm">Platform Fee (3%)</h4>
                 <p className="text-xs text-muted">Escrow protection</p>
               </div>
               <span className="font-bold">$150.00</span>
             </div>
           </div>
           
           <div className="flex justify-between items-center pt-6 border-t-2 border-gray-200 relative z-10">
              <span className="font-bold text-lg">Total Due</span>
              <span className="text-3xl font-black text-primary">$5,150.00</span>
           </div>
        </div>

        {/* Payment Form */}
        <div className="w-full md:w-7/12 p-8">
           <div className="flex items-center gap-2 text-primary font-bold mb-8">
             <Lock className="w-5 h-5" /> Secure Checkout
           </div>
           
           <div className="grid grid-cols-2 gap-4 mb-8">
             <button className="flex items-center justify-center gap-2 border-2 border-gray-200 rounded-xl py-3 hover:border-black hover:bg-gray-50 transition-colors h-14">
               <Apple className="w-5 h-5" /> Pay
             </button>
             <button className="flex items-center justify-center gap-2 border-2 border-primary bg-primary/5 rounded-xl py-3 text-primary font-bold h-14">
               <CreditCard className="w-5 h-5" /> Card
             </button>
           </div>
           
           <div className="space-y-4">
             <div>
               <label className="block text-xs font-bold text-muted mb-1 uppercase">Card Information</label>
               <input 
                 type="text" 
                 placeholder="0000 0000 0000 0000" 
                 className="w-full bg-white border border-gray-300 rounded-t-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary relative z-10"
               />
               <div className="flex -mt-px">
                 <input 
                   type="text" 
                   placeholder="MM / YY" 
                   className="w-1/2 bg-white border border-gray-300 rounded-bl-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary relative focus:z-10"
                 />
                 <input 
                   type="text" 
                   placeholder="CVC" 
                   className="w-1/2 bg-white border-b border-r border-t border-gray-300 rounded-br-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary relative -ml-px focus:z-10"
                 />
               </div>
             </div>
             
             <div>
               <label className="block text-xs font-bold text-muted mb-1 uppercase">Cardholder Name</label>
               <input 
                 type="text" 
                 placeholder="Jane Doe" 
                 className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
               />
             </div>
           </div>

           <Button 
             className={cn("w-full mt-8 h-14 text-lg hidden md:flex relative", paymentStatus === 'processing' && 'shimmer')} 
             onClick={handlePayment}
             disabled={paymentStatus === 'processing'}
           >
             {paymentStatus === 'processing' ? 'Processing...' : 'Pay Securely'}
           </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFlow;
