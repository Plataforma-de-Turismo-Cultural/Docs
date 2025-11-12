// src/components/DestinationList.jsx
import React from "react";
import DestinationCard from "./DestinationCard";

const destinations = [
  {
    name: "Kalandula Falls",
    description: "One of the largest waterfalls in Africa, surrounded by lush forest.",
    location: "Malanje, Angola",
    image: "/images/kalandula.jpg",
  },
  {
    name: "Kissama National Park",
    description: "Wildlife-rich reserve offering safaris with elephants, zebras, and giraffes.",
    location: "Bengo Province, Angola",
    image: "/images/kissama.jpg",
  },
  {
    name: "Ilha de Luanda",
    description: "A peaceful escape with clean beaches, restaurants, and scenic views.",
    location: "Luanda, Angola",
    image: "/images/ilha.jpg",
  },
];

export default function DestinationList() {
  return (
    <section className="py-16 bg-gradient-to-b from-emerald-50 to-white dark:from-gray-900 dark:to-gray-800">
      <h2 className="text-3xl font-bold text-center text-green-800 dark:text-green-400 mb-8">
        Popular Eco Destinations 🌍
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {destinations.map((dest, i) => (
          <DestinationCard key={i} {...dest} />
        ))}
      </div>
    </section>
  );
}
