// src/components/DestinationCard.jsx
import React from "react";

export default function DestinationCard({ image, name, description, location }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 overflow-hidden">
      <img src={image} alt={name} className="h-48 w-full object-cover" />
      <div className="p-4 text-left">
        <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">{name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{description}</p>
        <p className="text-sm text-emerald-600 mt-2">📍 {location}</p>
      </div>
    </div>
  );
}
