
import React from 'react';
import { Button } from "@/components/ui/button";

export type Mood = 'Hopeful' | 'Reflective' | 'Grateful' | 'Curious' | 'Determined' | 'Calm';

interface MoodSelectorProps {
  onChange: (mood: Mood) => void;
  selectedMood: Mood | null;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onChange, selectedMood }) => {
  const moods: Mood[] = ['Hopeful', 'Reflective', 'Grateful', 'Curious', 'Determined', 'Calm'];

  const getMoodColor = (mood: Mood): string => {
    switch (mood) {
      case 'Hopeful': return 'bg-capsule-soft-blue';
      case 'Reflective': return 'bg-capsule-soft-purple';
      case 'Grateful': return 'bg-capsule-soft-cream';
      case 'Curious': return 'bg-capsule-soft-peach';
      case 'Determined': return 'bg-primary/20';
      case 'Calm': return 'bg-capsule-soft-pink';
      default: return 'bg-white';
    }
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-serif font-medium text-gray-700">How are you feeling today?</h2>
      
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <Button
            key={mood}
            variant="outline"
            className={`transition-all duration-200 ${
              selectedMood === mood 
                ? `ring-2 ring-primary/50 ${getMoodColor(mood)}` 
                : 'bg-white hover:bg-gray-50'
            }`}
            onClick={() => onChange(mood)}
          >
            {mood}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
