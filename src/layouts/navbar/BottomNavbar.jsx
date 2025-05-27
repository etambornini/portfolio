import { useState } from 'react';
import { Home, Heart, SlidersHorizontal, CodeXml } from 'lucide-react';

const BottomNavbar = () => {
  const tabs = [
    { name: 'home', icon: <Home size={24} />, label: 'HOME', href: '/' },
    { name: 'favorites', icon: <Heart size={28} />, label: 'PORTFOLIO', href: '/portfolio' },
    { name: 'settings', icon: <CodeXml size={24} />, label: 'CONTACT', href: '/settings' },
  ];

  return (
    <div className="fixed bottom-10 w-full flex justify-center items-center pb-4 z-50">
      {/* Contenedor del navbar */}
      <div className="bg-[#2C2F3B] rounded-2xl px-6 py-3 flex items-center gap-12">
        {tabs.map((tab) => (
          <div key={tab.name} className="relative group">
            {/* Etiqueta flotante individual por ícono */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#2C2F3B] text-white text-sm px-4 py-1 rounded-md shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {tab.label}
            </div>
            <a
              href={tab.href}
            
              className="flex items-center justify-center transition-link"
            >
              <div
                className="text-gray-500 transition-colors duration-300"
              >
                {tab.icon}
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;