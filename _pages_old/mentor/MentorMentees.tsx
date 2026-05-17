import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, MessageSquare, MoreVertical, Trash2, Users } from 'lucide-react';
import { Application } from '../../src/types';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { EmptyState } from '../../src/components/ui/EmptyState';

// Custom Dropdown Hook
const useClickOutside = (handler: () => void) => {
  const domNode = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const maybeHandler = (event: MouseEvent) => {
      if (domNode.current && !domNode.current.contains(event.target as Node)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  }, [handler]);
  return domNode;
};

interface MentorMenteesProps {
  mentees: Application[];
  onMessage: (menteeId: string) => void;
  onRemove: (menteeId: string) => void;
}

export const MentorMentees: React.FC<MentorMenteesProps> = ({ mentees, onMessage, onRemove }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const menuRef = useClickOutside(React.useCallback(() => setActiveMenuId(null), []));

  const filteredMentees = mentees.filter(m => 
    m.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.user_email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 sm:space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black transition-colors" size={16} />
          <input 
            type="text"
            placeholder="Search mentees by name..."
            className="w-full pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl sm:rounded-full text-[11px] sm:text-xs font-medium outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-4 border border-emerald-500/20 bg-emerald-50/50 text-emerald-600 text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-2xl sm:rounded-full whitespace-nowrap hover:bg-emerald-100 transition-all active:scale-95 shadow-sm">
          <Filter size={14} /> Advanced Filter
        </button>
      </div>

      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {filteredMentees.length === 0 ? (
          <EmptyState 
            title="No Mentees Found" 
            description="Your search criteria returned zero results, or you haven't authorized any mentees yet." 
            icon={Users} 
            className="border-none"
          />
        ) : (
          <>
            {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-100/30 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                <th className="px-8 py-5">Trajectory Data</th>
                <th className="px-8 py-5">Program</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredMentees.map((mentee) => (
                <tr key={mentee.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-black text-sm group-hover:scale-105 transition-transform">
                        {mentee.user_name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-black text-sm text-slate-900 uppercase tracking-tight truncate">{mentee.user_name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">{mentee.user_email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                      {mentee.mentor_type}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Active</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right relative">
                    <div className="flex items-center justify-end gap-1">
                       <button onClick={() => onMessage(mentee.id)} className="p-2.5 text-slate-400 hover:text-black hover:bg-slate-100 rounded-full transition-all">
                          <MessageSquare size={18} />
                       </button>
                       <div className="relative">
                         <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             setActiveMenuId(activeMenuId === mentee.id ? null : mentee.id);
                           }} 
                           className={`p-2.5 rounded-full transition-all ${activeMenuId === mentee.id ? 'bg-slate-100 text-black' : 'text-slate-400 hover:text-black hover:bg-slate-100'}`}
                         >
                            <MoreVertical size={18} />
                         </button>

                         <AnimatePresence>
                           {activeMenuId === mentee.id && (
                             <motion.div
                               ref={menuRef}
                               initial={{ opacity: 0, scale: 0.95, y: 10 }}
                               animate={{ opacity: 1, scale: 1, y: 0 }}
                               exit={{ opacity: 0, scale: 0.95, y: 10 }}
                               className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 text-left"
                             >
                               <button
                                 onClick={() => {
                                   onRemove(mentee.id);
                                   setActiveMenuId(null);
                                 }}
                                 className="w-full flex items-center gap-3 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors"
                               >
                                 <Trash2 size={16} />
                                 Delete Mentee
                               </button>
                             </motion.div>
                           )}
                         </AnimatePresence>
                       </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-slate-50">
          {filteredMentees.map((mentee) => (
            <div key={mentee.id} className="p-5 sm:p-6 space-y-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-11 h-11 bg-black text-white rounded-xl flex items-center justify-center font-black text-lg">
                    {mentee.user_name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-black text-slate-900 uppercase tracking-tight text-sm truncate">{mentee.user_name}</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest truncate">{mentee.user_email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 relative">
                   <button onClick={() => onMessage(mentee.id)} className="p-2 text-slate-400 active:text-black active:bg-slate-200 rounded-full transition-colors">
                      <MessageSquare size={16} />
                   </button>
                   <div className="relative">
                     <button 
                       onClick={(e) => {
                         e.stopPropagation();
                         setActiveMenuId(activeMenuId === mentee.id ? null : mentee.id);
                       }} 
                       className={`p-2 rounded-full transition-colors ${activeMenuId === mentee.id ? 'bg-slate-200 text-black' : 'text-slate-400 active:text-black active:bg-slate-200'}`}
                     >
                        <MoreVertical size={16} />
                     </button>
                     
                     <AnimatePresence>
                       {activeMenuId === mentee.id && (
                         <motion.div
                           ref={menuRef}
                           initial={{ opacity: 0, scale: 0.95, y: 10 }}
                           animate={{ opacity: 1, scale: 1, y: 0 }}
                           exit={{ opacity: 0, scale: 0.95, y: 10 }}
                           className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50 text-left"
                         >
                           <button
                             onClick={() => {
                               onRemove(mentee.id);
                               setActiveMenuId(null);
                             }}
                             className="w-full flex items-center gap-3 px-4 py-2.5 text-[9px] font-black uppercase tracking-widest text-red-500 active:bg-red-50 transition-colors"
                           >
                             <Trash2 size={14} />
                             Delete Mentee
                           </button>
                         </motion.div>
                       )}
                     </AnimatePresence>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </>
        )}
      </div>
    </motion.div>
  );
};
