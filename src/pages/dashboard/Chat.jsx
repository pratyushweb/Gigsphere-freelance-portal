import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, MoreVertical, Search, Paperclip, Smile, Loader2 } from 'lucide-react';
import { Avatar } from '../../components/ui/Avatar';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { socket, connectSocket, disconnectSocket } from '../../lib/socket';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [partnerTyping, setPartnerTyping] = useState(false);
  const scrollRef = useRef(null);
  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Mock partner for demo - in a real app, this would come from a selected contact
  const partnerId = 'demo-partner-id'; 
  const partner = {
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    status: 'Online'
  };

  useEffect(() => {
    connectSocket();

    socket.on('receive_message', (message) => {
      setMessages((prev) => [...prev, {
        id: message.id,
        text: message.content,
        timestamp: new Date(message.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: false
      }]);
    });

    socket.on('typing', ({ userId }) => {
      if (userId !== user.id) setPartnerTyping(true);
    });

    socket.on('stop_typing', ({ userId }) => {
      if (userId !== user.id) setPartnerTyping(false);
    });

    socket.on('message_sent', (message) => {
      setMessages((prev) => [...prev, {
        id: message.id,
        text: message.content,
        timestamp: new Date(message.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMine: true
      }]);
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    socket.emit('send_message', {
      contract_id: '43997c41-acc5-4299-a968-36035f8e53a9', // Mock UUID for contract
      receiver_id: partnerId,
      content: input
    });

    setInput('');
    socket.emit('stop_typing', { receiver_id: partnerId });
  };

  const handleTyping = (e) => {
    setInput(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', { receiver_id: partnerId });
    }
    
    // Stop typing after 2 seconds of inactivity
    clearTimeout(window.typingTimer);
    window.typingTimer = setTimeout(() => {
      setIsTyping(false);
      socket.emit('stop_typing', { receiver_id: partnerId });
    }, 2000);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white overflow-hidden m-4 sm:m-6 lg:m-8 rounded-2xl border border-border shadow-soft">
      {/* Sidebar */}
      <div className="w-80 border-r border-border hidden md:flex flex-col bg-slate-50/50">
         <div className="p-4 border-b border-border bg-white">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Messages</h2>
            <Input icon={Search} placeholder="Search messages..." className="bg-slate-50 h-10 border-0" />
         </div>
         <div className="flex-1 overflow-y-auto">
            <div className="p-4 cursor-pointer bg-white border-l-4 border-primary shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
               <div className="flex gap-3 relative">
                  <div className="relative">
                     <Avatar src={partner.avatar} alt={partner.name} />
                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-baseline mb-0.5">
                        <h3 className="font-semibold text-slate-900 truncate">{partner.name}</h3>
                        <span className="text-xs text-slate-500 font-medium">Online</span>
                     </div>
                     <p className="text-sm text-slate-500 truncate">{partnerTyping ? 'Typing...' : messages[messages.length-1]?.text || 'No messages yet'}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#FDFDFD]">
         {/* Chat Header */}
         <div className="h-16 px-6 border-b border-border flex items-center justify-between bg-white z-10">
            <div className="flex items-center gap-3">
               <Avatar src={partner.avatar} alt={partner.name} />
               <div>
                  <h3 className="font-semibold text-slate-900">{partner.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <p className="text-xs text-emerald-600 font-medium">Online</p>
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900"><Phone size={18} /></Button>
               <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900"><Video size={18} /></Button>
               <div className="w-px h-6 bg-border mx-1"></div>
               <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900"><MoreVertical size={18} /></Button>
            </div>
         </div>

         {/* Messages Area */}
         <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.length === 0 && (
               <div className="py-20 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Send size={24} className="text-slate-300" />
                  </div>
                  <p className="text-slate-400 text-sm">Start your conversation with {partner.name}</p>
               </div>
            )}
            
            {messages.map((msg) => (
               <div key={msg.id} className={`flex gap-3 max-w-[80%] ${msg.isMine ? 'ml-auto flex-row-reverse' : ''}`}>
                  {!msg.isMine && <Avatar src={partner.avatar} size="sm" className="mt-1" />}
                  <div className={`flex flex-col ${msg.isMine ? 'items-end' : 'items-start'}`}>
                     <div className={`px-4 py-2.5 rounded-2xl ${
                        msg.isMine 
                        ? 'bg-primary text-white rounded-tr-sm shadow-md' 
                        : 'bg-white border border-border text-slate-800 rounded-tl-sm shadow-sm'
                     }`}>
                        <p className="text-[15px] leading-relaxed">{msg.text}</p>
                     </div>
                     <span className="text-[10px] text-slate-400 mt-1.5 font-bold uppercase tracking-wider px-1">{msg.timestamp}</span>
                  </div>
                  <div ref={scrollRef} />
               </div>
            ))}

            {/* Typing Indicator */}
            {partnerTyping && (
               <div className="flex gap-3 max-w-[80%] animate-in fade-in slide-in-from-bottom-2">
                  <Avatar src={partner.avatar} size="sm" className="mt-1" />
                  <div className="bg-white border border-border text-slate-800 rounded-2xl rounded-tl-sm shadow-sm px-4 py-3 flex items-center gap-1.5 h-10">
                     <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                     <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                     <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                  </div>
               </div>
            )}
         </div>

         {/* Message Input */}
         <div className="p-4 bg-white border-t border-border">
            <form onSubmit={handleSend} className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:ring-4 focus-within:ring-primary/10 transition-all">
               <Button type="button" variant="ghost" size="icon" className="h-10 w-10 shrink-0 text-slate-400 rounded-xl">
                  <Paperclip size={20} />
               </Button>
               <textarea 
                  className="w-full bg-transparent border-none focus:outline-none resize-none pt-2.5 pb-2 px-2 text-[15px] text-slate-700 min-h-[40px] max-h-32" 
                  placeholder="Type a message..."
                  rows="1"
                  value={input}
                  onChange={handleTyping}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend(e);
                     }
                  }}
               ></textarea>
               <Button type="submit" className="h-10 w-10 shrink-0 rounded-xl shadow-glow text-white" disabled={!input.trim()}>
                  <Send size={18} className="-ml-0.5" />
               </Button>
            </form>
         </div>
      </div>
    </div>
  );
}
