import React from "react";
import { MapPin, Star, Wifi, Car, Coffee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface HotelResultsProps {
  hotels: Hotel[];
  searchQuery: {
    city: string;
    checkIn: Date;
    checkOut: Date;
  };
}

const HotelResults = ({ hotels, searchQuery }: HotelResultsProps) => {
  const nights = Math.ceil(
    (searchQuery.checkOut.getTime() - searchQuery.checkIn.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "parking":
        return <Car className="h-4 w-4" />;
      case "breakfast":
        return <Coffee className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Hotels in {searchQuery.city}
        </h2>
        <p className="text-gray-600">
          {searchQuery.checkIn.toLocaleDateString()} -{" "}
          {searchQuery.checkOut.toLocaleDateString()} • {nights}{" "}
          {nights === 1 ? "night" : "nights"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <Card
            key={hotel.id}
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 shadow-md"
          >
            <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
              {hotel.image && (
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/images/default-hotel.jpg";
                  }}
                />
              )}
              <Badge className="absolute top-3 right-3 bg-white text-gray-800">
                {hotel.supplier}
              </Badge>
            </div>

            <CardContent className="p-6">
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hotel.location}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < hotel.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    ({hotel.rating}/5)
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                    >
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-gray-100">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Total for {nights} {nights === 1 ? "night" : "nights"}
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${hotel.price * nights}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      ${hotel.price}/night
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HotelResults;
