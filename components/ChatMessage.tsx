import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAI = message.role === 'model';

  return (
    <div className={`flex w-full mb-8 ${isAI ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[90%] md:max-w-[75%] px-6 py-4 shadow-sm ${
          isAI
            ? 'bg-white border border-zinc-100 text-zinc-800 rounded-2xl rounded-tl-none'
            : 'bg-zinc-900 text-zinc-50 rounded-2xl rounded-tr-none'
        }`}
      >
        <div className="whitespace-pre-wrap leading-relaxed text-[15px]">
          {message.text}
        </div>
        <div className={`text-[10px] mt-2 font-medium tracking-wider uppercase opacity-40 ${isAI ? 'text-zinc-500' : 'text-zinc-400 text-right'}`}>
          {isAI ? 'AI Interviewer' : 'You'}
        </div>
      </div>
    </div>
  );
};