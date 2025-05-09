
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LetterEditor from './LetterEditor';
import DateSelector from './DateSelector';
import MoodSelector, { Mood } from './MoodSelector';
import { useToast } from "@/components/ui/use-toast";
import { CircleCheck } from 'lucide-react';

interface TimeCapsuleFormProps {
  onSubmit: () => void;
}

const TimeCapsuleForm: React.FC<TimeCapsuleFormProps> = ({ onSubmit }) => {
  const [letterContent, setLetterContent] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDays, setSelectedDays] = useState(90); // Default to 3 months
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!letterContent.trim()) {
      toast({
        title: "Your letter is empty",
        description: "Please write something to your future self.",
        variant: "destructive"
      });
      return;
    }
    
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please provide a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    setIsSubmitting(true);
    setTimeout(() => {
      // Console log the data that would be sent to the backend
      console.log({
        letterContent,
        email,
        deliveryDate: new Date(Date.now() + selectedDays * 24 * 60 * 60 * 1000),
        mood: selectedMood
      });
      
      setIsSubmitting(false);
      onSubmit(); // Show the confirmation message
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <LetterEditor 
        value={letterContent} 
        onChange={setLetterContent}
      />
      
      <div className="space-y-6 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0">
        <div className="space-y-4">
          <DateSelector 
            selectedDays={selectedDays} 
            onChange={setSelectedDays} 
          />
          
          <div className="space-y-2 mt-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Where should we send your letter?"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white"
            />
            <p className="text-xs text-gray-500">
              We'll only use this to deliver your letter on the selected date.
            </p>
          </div>
        </div>
        
        <MoodSelector 
          selectedMood={selectedMood} 
          onChange={setSelectedMood} 
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full sm:w-auto px-8 py-6 text-lg font-serif animate-seal"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center">Sealing your capsule...</span>
        ) : (
          <span className="flex items-center">
            Seal the Capsule
            <CircleCheck className="ml-2 h-5 w-5" />
          </span>
        )}
      </Button>
    </form>
  );
};

export default TimeCapsuleForm;
