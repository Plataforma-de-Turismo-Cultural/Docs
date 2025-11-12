// src/components/ContactSection.jsx
import React from "react";

export default function ContactSection() {
  return (
    <section className="py-16 bg-green-50 dark:bg-gray-800 text-center px-4">
      <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">Get in Touch 📩</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Have a suggestion or partnership idea? Let’s collaborate to make eco-tourism thrive!
      </p>
      <form className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Your name"
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
        />
        <input
          type="email"
          placeholder="Your email"
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
        />
        <textarea
          placeholder="Your message"
          rows="4"
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
        ></textarea>
        <button
          type="submit"
          className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
