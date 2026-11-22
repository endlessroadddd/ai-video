import React from 'react';
import { cn } from '../lib/utils';
import { Sparkles, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export type Role = 'user' | 'assistant';

export interface ChatBubbleProps {
  role: Role;
  content: string; // Changed to string for ReactMarkdown
  isStreaming?: boolean;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ role, content, isStreaming }) => {
  const isAssistant = role === 'assistant';

  return (
    <div className={cn(
      "w-full flex gap-4 px-6 py-6 transition-all duration-500 ease-out animate-slide-up",
      isAssistant ? "bg-slate-50/50 backdrop-blur-sm border-y border-slate-200/50" : "bg-transparent"
    )}>
      <div className="max-w-3xl mx-auto flex gap-4 w-full">
        {/* Avatar */}
        <div className="flex-shrink-0 flex items-start">
          <div className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center shadow-lg border-2 transform hover:scale-110 transition-transform",
            isAssistant 
              ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-white/20" 
              : "bg-white text-slate-600 border-slate-100"
          )}>
            {isAssistant ? <Sparkles size={18} /> : <User size={18} />}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-slate-900 tracking-tight">
              {isAssistant ? 'Support AI' : 'Nina Hart'}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-500 font-medium uppercase tracking-wider">
              {isAssistant ? 'Agent' : 'User'}
            </span>
          </div>
          
          <div className="text-[15px] leading-relaxed text-slate-700 font-medium whitespace-pre-wrap">
            <ReactMarkdown 
              components={{
                p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                strong: ({children}) => <strong className="font-bold text-indigo-700">{children}</strong>,
                ul: ({children}) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
                li: ({children}) => <li>{children}</li>,
                code: ({children}) => <code className="bg-slate-200 px-1 py-0.5 rounded text-sm font-mono">{children}</code>
              }}
            >
              {content}
            </ReactMarkdown>
            {isStreaming && (
              <span className="inline-block w-2 h-5 ml-1.5 bg-indigo-500 rounded-sm animate-pulse align-middle" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
