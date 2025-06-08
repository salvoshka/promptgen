
import React, { useState, useCallback } from 'react';
import Button from './Button';
import { ClipboardIcon } from '../constants';

interface PromptOutputProps {
  prompt: string;
  title: string;
  isEditable?: boolean;
  onContentChange?: (newContent: string) => void;
  isLoading?: boolean;
}

const PromptOutput: React.FC<PromptOutputProps> = ({ 
  prompt, 
  title, 
  isEditable = false, 
  onContentChange,
  isLoading = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (prompt) {
      navigator.clipboard.writeText(prompt).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }).catch(err => console.error("Gagal menyalin: ", err));
    }
  }, [prompt]);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isEditable && onContentChange) {
      onContentChange(e.target.value);
    }
  };

  if (isLoading) {
     return (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow w-full">
            <h3 className="text-lg font-semibold text-indigo-400 mb-2">{title}</h3>
            <div className="animate-pulse space-y-2">
                <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                 <div className="h-4 bg-gray-700 rounded w-full"></div>
            </div>
        </div>
     )
  }


  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-lg shadow w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-indigo-400">{title}</h3>
        <Button
            onClick={handleCopy}
            variant="icon"
            className="p-1"
            disabled={!prompt}
            aria-label={`Salin ${title}`}
          >
            <ClipboardIcon className="w-4 h-4" />
            <span className="ml-1 text-xs">{copied ? 'Tersalin!' : 'Salin'}</span>
        </Button>
      </div>
      <div className="relative">
        <textarea
          readOnly={!isEditable}
          value={prompt}
          onChange={handleTextAreaChange}
          className={`w-full p-3 h-48 bg-gray-700 border border-gray-600 rounded-md text-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isEditable ? 'hover:border-indigo-400' : 'cursor-default'}`}
          aria-label={title}
          placeholder={isEditable ? "Silakan edit prompt di sini..." : "Prompt akan muncul di sini..."}
        />
      </div>
    </div>
  );
};

export default PromptOutput;
