import React from "react";

export function ServiceCard({ icon, title, description }) {
  return (
    <div className="group relative flex items-start p-6 bg-white/60 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
      <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-tr from-blue-500 to-purple-600 opacity-10 group-hover:opacity-20 rounded-full blur-2xl transition-opacity duration-300"></div>
      <img src={icon} alt={title} className="w-12 h-12 mr-4 drop-shadow-md transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
      <div>
        <h3 className="text-xl font-bold font-chivo-bold text-gray-800 dark:text-gray-100 mb-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-100 transition-colors duration-300">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 font-chivo-regular leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
