
import React, { useState } from 'react';
import TimeCapsuleForm from '@/components/TimeCapsuleForm';
import ConfirmationMessage from '@/components/ConfirmationMessage';

const Index = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6">
        <div className="container">
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-center">Time Capsule</h1>
          <p className="text-center text-gray-600 mt-2 font-serif">A letter to your future self</p>
        </div>
      </header>
      
      <main className="flex-grow container max-w-4xl py-6 sm:py-10">
        <div className="bg-white bg-opacity-70 backdrop-blur-sm rounded-lg shadow-sm p-6 sm:p-10">
          {isSubmitted ? (
            <ConfirmationMessage onReset={handleReset} />
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-serif mb-4 text-gray-800">Write to the Future</h2>
                <p className="text-gray-600 font-serif">
                  This letter will be delivered to your inbox on the date you choose. 
                  Take a moment to reflect, share thoughts, or leave a message for your future self.
                </p>
              </div>
              
              <TimeCapsuleForm onSubmit={handleSubmit} />
            </>
          )}
        </div>
      </main>
      
      <footer className="py-6">
        <div className="container">
          <p className="text-center text-sm text-gray-500">
            Time Capsule • Preserve moments across time
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
