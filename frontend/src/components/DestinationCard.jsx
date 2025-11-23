import React from "react";
import { Star } from "lucide-react";

const DestinationCard = ({ destination, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
  >
    <div className="relative h-64">
      <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        <span className="text-sm font-bold text-gray-800">
          {destination.rating}
        </span>
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-1">
        {destination.fullName}
      </h3>
      <p className="text-sm text-gray-600 mb-3">{destination.location}</p>
      <p className="text-sm text-gray-700 line-clamp-2">
        {destination.description}
      </p>
    </div>
  </div>
);

export default DestinationCard;
