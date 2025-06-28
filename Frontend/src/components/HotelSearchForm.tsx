import React, { useState } from 'react';
import { Calendar, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar as DatePicker } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface HotelSearchFormProps {
  onSearch: (searchData: {
    city: string;
    checkIn: Date | undefined;
    checkOut: Date | undefined;
  }) => void;
  isLoading: boolean;
}

const HotelSearchForm = ({ onSearch, isLoading }: HotelSearchFormProps) => {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city && checkIn && checkOut) {
      onSearch({ city, checkIn, checkOut });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {/* City Input */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium text-gray-700">
              Destination
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="city"
                type="text"
                placeholder="Enter city name"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Check-in Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Check-in</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal border-gray-200 hover:border-blue-500",
                    !checkIn && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <DatePicker
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Check-out</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal border-gray-200 hover:border-blue-500",
                    !checkOut && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <DatePicker
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => date < new Date() || (checkIn && date <= checkIn)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Search Button */}
          <Button 
            type="submit" 
            className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            disabled={isLoading || !city || !checkIn || !checkOut}
          >
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? "Searching..." : "Search Hotels"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default HotelSearchForm;
