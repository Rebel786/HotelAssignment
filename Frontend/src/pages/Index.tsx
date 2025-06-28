
import React, { useState } from 'react';
import { Plane, MapPin, Calendar, Shield } from 'lucide-react';
import HotelSearchForm from '@/components/HotelSearchForm';
import HotelResults from '@/components/HotelResults';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';

interface SearchData {
  city: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
}

interface Hotel {
  id: string;
  name: string;
  price: number;
  supplier: string;
  rating: number;
  image: string;
  location: string;
  amenities: string[];
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<SearchData | null>(null);

const handleSearch = async (searchData: SearchData) => {
  if (!searchData.checkIn || !searchData.checkOut) return;
  
  setIsLoading(true);
  setError(null);
  setSearchQuery(searchData);

  try {
    console.log('Searching hotels for:', searchData);
    
    const response = await fetch('http://localhost:3000/api/search-hotels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        city: searchData.city,
        checkIn: searchData.checkIn.toISOString().split('T')[0],
        checkOut: searchData.checkOut.toISOString().split('T')[0],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('API Response:', result);

    if (result.error) {
      throw new Error(result.error);
    }

    // Handle both single hotel and array response
    const hotelsArray = Array.isArray(result) ? result : [result];

    const transformedHotels: Hotel[] = hotelsArray.map((hotel: any, index: number) => ({
  id: hotel.hotelId || `hotel-${index}`,
  name: hotel.name || 'Unknown Hotel',
  price: hotel.price || 0,
  supplier: hotel.supplier || 'Unknown',
  rating: hotel.rating || 3,
  image: hotel.image || `https://source.unsplash.com/random/800x600/?hotel,${hotel.name}`,
  location: hotel.city || searchData.city,
  amenities: ['WiFi', 'Parking', 'Breakfast']
}));

    setHotels(transformedHotels);
  } catch (err) {
    console.error('Search error:', err);
    setError(err instanceof Error ? err.message : 'An unexpected error occurred while searching for hotels');
    setHotels([]);
  } finally {
    setIsLoading(false);
  }
};

  const handleRetry = () => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
        <div className="relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 p-3 rounded-full">
                <Plane className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Find Your Perfect
              <span className="text-blue-600"> Hotel</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Search and compare hotels from multiple suppliers to get the best deals for your next trip.
            </p>
          </div>

          {/* Search Form */}
          <HotelSearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </div>

      {/* Results Section */}
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        {isLoading && <LoadingSpinner />}
        
        {error && (
          <ErrorDisplay message={error} onRetry={handleRetry} />
        )}
        
        {hotels.length > 0 && searchQuery && searchQuery.checkIn && searchQuery.checkOut && (
          <HotelResults 
            hotels={hotels} 
            searchQuery={{
              city: searchQuery.city,
              checkIn: searchQuery.checkIn,
              checkOut: searchQuery.checkOut
            }} 
          />
        )}

        {/* Features Section */}
        {!isLoading && hotels.length === 0 && !error && (
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Our Platform?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Global Coverage</h3>
                <p className="text-gray-600">Search hotels worldwide from multiple trusted suppliers</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Easy Booking</h3>
                <p className="text-gray-600">Simple search with flexible dates and instant results</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Best Prices</h3>
                <p className="text-gray-600">Compare prices from top suppliers to get the best deals</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;