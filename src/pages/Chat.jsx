import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, MoreVertical, Smile } from 'lucide-react';
import { AvatarGroup } from '../components/ui/AvatarGroup';

const ChatBubble = ({ message, time, isSender, status }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex flex-col max-w-[70%] ${isSender ? 'items-end self-end ml-auto' : 'items-start self-start mr-auto'} mb-4`}
  >
    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${isSender ? 'bg-primary text-white rounded-br-sm' : 'bg-white border border-gray-200 text-textMain rounded-bl-sm shadow-sm'}`}>
      {message}
    </div>
    <div className="flex items-center gap-1 mt-1 text-xs text-muted">
      <span>{time}</span>
      {isSender && (
        <span className="text-primary font-bold ml-1">{status}</span>
      )}
    </div>
  </motion.div>
);

const Chat = () => {
  const [inputText, setInputText] = useState('');

  return (
    <div className="min-h-screen pt-20 flex bg-surface h-screen">
      {/* Sidebar - Contract Details */}
      <aside className="w-80 border-r border-gray-200 bg-white hidden md:flex flex-col h-[calc(100vh-80px)] overflow-y-auto shrink-0">
        <div className="p-6 border-b border-gray-100">
           <h3 className="font-bold text-lg mb-1">Contract Overview</h3>
           <p className="text-sm text-green-600 font-medium">In Progress</p>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-muted mb-2 uppercase">Project</h4>
            <p className="font-medium text-sm">Computer Vision Model for Defect Detection</p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-muted mb-2 uppercase">Client</h4>
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                 <img src="https://i.pravatar.cc/150?u=4" alt="Client" />
               </div>
               <div>
                 <p className="font-medium text-sm">LexTech Inc.</p>
                 <p className="text-xs text-muted">Enterprise Client</p>
               </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-bold text-muted mb-2 uppercase">Agreed Terms</h4>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
               <div className="flex justify-between mb-2">
                 <span className="text-sm text-muted">Budget:</span>
                 <span className="font-bold text-sm">$8,000</span>
               </div>
               <div className="flex justify-between mb-2">
                 <span className="text-sm text-muted">Paid to date:</span>
                 <span className="font-bold text-sm">$2,000</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-sm text-muted">Deadline:</span>
                 <span className="font-bold text-sm">Oct 24, 2026</span>
               </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-[calc(100vh-80px)] bg-[#FDFDFF]">
        {/* Chat Header */}
        <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
               <img src="https://i.pravatar.cc/150?u=4" alt="Client" />
               <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
             </div>
             <div>
               <h2 className="font-bold text-sm">Sarah Jenkins (LexTech Inc.)</h2>
               <p className="text-xs text-green-500 font-medium">Online</p>
             </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full text-muted transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
           <div className="text-center mb-6">
             <span className="text-xs font-medium bg-gray-100 text-gray-500 px-3 py-1 rounded-full">Yesterday</span>
           </div>
           
           <ChatBubble 
             isSender={false} 
             time="10:24 AM" 
             message="Hi Alex, how is the training going for the initial layer? Are we still on track for the milestone on Friday?"
           />
           <ChatBubble 
             isSender={true} 
             time="10:45 AM" 
             status="Read"
             message="Hey Sarah! Yes, training is progressing well. I hit a small snag with the dataset formatting, but I wrote a script to clean it up. The initial accuracy is actually looking better than expected (around 88% right now)."
           />
           
           <div className="text-center mb-6 mt-4">
             <span className="text-xs font-medium bg-gray-100 text-gray-500 px-3 py-1 rounded-full">Today</span>
           </div>

           <ChatBubble 
             isSender={false} 
             time="09:12 AM" 
             message="That's fantastic news! 🎉 Can you push the latest weights to the staging repo so my QA team can start writing automated tests?"
           />

           {/* Typing indicator */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="flex items-center gap-1 mt-2 text-muted bg-white border border-gray-200 p-3 rounded-xl rounded-bl-sm self-start shadow-sm w-16 h-10"
           >
             <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-gray-400 rounded-full" />
             <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
             <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-gray-400 rounded-full" />
           </motion.div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200 shrink-0">
           <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl p-2 focus-within:border-primary focus-within:ring-1 ring-primary transition-all shadow-inner">
             <button className="p-2 text-muted hover:text-primary transition-colors">
               <Paperclip className="w-5 h-5" />
             </button>
             <textarea 
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               placeholder="Type a message..."
               className="flex-1 bg-transparent border-none focus:outline-none resize-none max-h-32 min-h-[44px] py-3 text-sm px-2"
               rows={1}
             />
             <button className="p-2 text-muted hover:text-primary transition-colors">
               <Smile className="w-5 h-5" />
             </button>
             <button className="p-3 bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors shadow-md shadow-primary/20">
               <Send className="w-5 h-5" />
             </button>
           </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
