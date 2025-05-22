import { useState } from 'react';
import { Home, Heart, SlidersHorizontal, CodeXml } from 'lucide-react';

const BottomNavbar = () => {
  const [activeTab, setActiveTab] = useState('favorites');

  const tabs = [
    { name: 'home', icon: <Home size={24} />, label: 'HOME' },
    { name: 'favorites', icon: <Heart size={28} />, label: 'FAVORITES' },
    { name: 'settings', icon: <CodeXml size={24} />, label: 'SETTINGS' },
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
            <button
              onClick={() => setActiveTab(tab.name)}
              className="flex items-center justify-center"
            >
              <div
                className={`transition-colors duration-300 ${
                  activeTab === tab.name ? 'text-white' : 'text-gray-500'
                }`}
              >
                {tab.icon}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;