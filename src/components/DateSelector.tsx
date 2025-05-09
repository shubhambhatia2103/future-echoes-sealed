
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from 'lucide-react';

interface DateOption {
  label: string;
  value: number; // days in the future
}

interface DateSelectorProps {
  onChange: (days: number) => void;
  selectedDays: number;
}

const DateSelector: React.FC<DateSelectorProps> = ({ onChange, selectedDays }) => {
  const dateOptions: DateOption[] = [
    { label: '3 Months', value: 90 },
    { label: '6 Months', value: 180 },
    { label: '1 Year', value: 365 },
  ];

  // Calculate the future date based on the selected days
  const calculateFutureDate = (days: number): string => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + days);
    return futureDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-serif font-medium text-gray-700 flex items-center">
        <Calendar className="h-5 w-5 mr-2" />
        When would you like to receive this?
      </h2>
      
      <div className="flex flex-wrap gap-3">
        {dateOptions.map((option) => (
          <Button
            key={option.value}
            variant={selectedDays === option.value ? "default" : "outline"}
            className={`transition-all duration-300 ${
              selectedDays === option.value 
                ? "bg-primary text-white" 
                : "bg-white text-gray-700 hover:bg-capsule-soft-cream"
            }`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {selectedDays > 0 && (
        <p className="text-sm text-gray-500 mt-2">
          Your letter will arrive on {calculateFutureDate(selectedDays)}
        </p>
      )}
    </div>
  );
};

export default DateSelector;
