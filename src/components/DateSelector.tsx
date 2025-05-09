
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DateSelectorProps {
  onChange: (days: number) => void;
  selectedDays: number;
  onSpecificDateTimeChange?: (date: Date) => void;
  selectedDateTime?: Date | null;
}

const DateSelector: React.FC<DateSelectorProps> = ({ 
  onChange, 
  selectedDays, 
  onSpecificDateTimeChange,
  selectedDateTime 
}) => {
  const dateOptions = [
    { label: '3 Months', value: 90 },
    { label: '6 Months', value: 180 },
    { label: '1 Year', value: 365 },
  ];
  
  const [date, setDate] = useState<Date | undefined>(selectedDateTime || undefined);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [hours, setHours] = useState<string>(format(new Date(), 'HH'));
  const [minutes, setMinutes] = useState<string>(format(new Date(), 'mm'));

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

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      setShowTimePicker(true);
    }
  };

  const handleTimeConfirm = () => {
    if (date) {
      const newDate = new Date(date);
      newDate.setHours(parseInt(hours), parseInt(minutes));
      
      // Calculate days from now to the selected date
      const diffTime = newDate.getTime() - new Date().getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Update parent component with both pieces of information
      onChange(diffDays);
      if (onSpecificDateTimeChange) {
        onSpecificDateTimeChange(newDate);
      }
      
      setShowTimePicker(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-serif font-medium text-gray-700 flex items-center">
        <CalendarIcon className="h-5 w-5 mr-2" />
        When would you like to receive this?
      </h2>
      
      <div className="flex flex-wrap gap-3">
        {dateOptions.map((option) => (
          <Button
            key={option.value}
            variant={selectedDays === option.value && !selectedDateTime ? "default" : "outline"}
            className={`transition-all duration-300 ${
              selectedDays === option.value && !selectedDateTime
                ? "bg-primary text-white" 
                : "bg-white text-gray-700 hover:bg-capsule-soft-cream"
            }`}
            onClick={() => {
              onChange(option.value);
              if (onSpecificDateTimeChange) {
                onSpecificDateTimeChange(null);
              }
            }}
          >
            {option.label}
          </Button>
        ))}
        
        {/* Custom date picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={selectedDateTime ? "default" : "outline"}
              className={`transition-all duration-300 ${
                selectedDateTime ? "bg-primary text-white" : "bg-white text-gray-700"
              }`}
            >
              {selectedDateTime 
                ? format(selectedDateTime, "MMM d, yyyy 'at' h:mm a")
                : "Custom Date & Time"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="start">
            {!showTimePicker ? (
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-sm">Select a specific date:</h3>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <h3 className="font-medium text-sm">Select time:</h3>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div className="flex items-center gap-1">
                    <select 
                      value={hours} 
                      onChange={(e) => setHours(e.target.value)}
                      className="rounded-md border p-2 w-16"
                    >
                      {Array.from({ length: 24 }).map((_, i) => (
                        <option key={i} value={i.toString().padStart(2, '0')}>
                          {i.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <span className="text-xl">:</span>
                    <select 
                      value={minutes} 
                      onChange={(e) => setMinutes(e.target.value)}
                      className="rounded-md border p-2 w-16"
                    >
                      {Array.from({ length: 60 }).map((_, i) => (
                        <option key={i} value={i.toString().padStart(2, '0')}>
                          {i.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <Button onClick={handleTimeConfirm} size="sm">Confirm</Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
      </div>

      {selectedDays > 0 && !selectedDateTime && (
        <p className="text-sm text-gray-500 mt-2">
          Your letter will arrive on {calculateFutureDate(selectedDays)}
        </p>
      )}
      
      {selectedDateTime && (
        <p className="text-sm text-gray-500 mt-2">
          Your letter will arrive on {format(selectedDateTime, "MMMM d, yyyy 'at' h:mm a")}
        </p>
      )}
    </div>
  );
};

export default DateSelector;
