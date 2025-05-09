
import React from 'react';
import { Button } from "@/components/ui/button";

interface ConfirmationMessageProps {
  onReset: () => void;
}

const ConfirmationMessage: React.FC<ConfirmationMessageProps> = ({ onReset }) => {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center py-10 px-6 text-center space-y-6 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      </div>
      
      <h2 className="text-2xl font-serif font-medium text-gray-800">Your letter is sealed</h2>
      
      <p className="text-gray-600 font-serif text-lg">
        The future will bring it back to you. Take a moment to reflect on how you feel now, knowing that your words will travel through time.
      </p>
      
      <Button 
        onClick={onReset}
        variant="outline"
        className="mt-6"
      >
        Write another letter
      </Button>
    </div>
  );
};

export default ConfirmationMessage;
