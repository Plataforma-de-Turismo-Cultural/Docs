// src/components/AboutSection.jsx
import React from "react";

export default function AboutSection() {
  return (
    <section className="py-16 bg-emerald-100 dark:bg-gray-900 text-center px-4">
      <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">About Safiri 🌱</h2>
      <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
        Safiri is a Swahili word meaning to <strong>to travel</strong> or <strong>to go on a journey</strong>.
      </p>
      <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
      Safiri is your guide to sustainable tourism in Angola. We promote eco-friendly destinations,
      local communities, and conscious travel experiences that protect the environment while creating
       unforgettable adventures.
       </p>
    </section>
  );
}
