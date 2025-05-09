
import React, { useState } from 'react';

interface LetterEditorProps {
  onChange: (content: string) => void;
  value: string;
}

const LetterEditor: React.FC<LetterEditorProps> = ({ onChange, value }) => {
  const placeholder = "Dear future me,\n\nI'm writing to share something important...";

  return (
    <div className="w-full">
      <div className="paper rounded-md p-6 min-h-[300px] relative mb-4">
        <textarea
          className="w-full h-full min-h-[250px] bg-transparent font-serif text-gray-800 text-lg focus:outline-none resize-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default LetterEditor;
