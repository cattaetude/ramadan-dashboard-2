
import React from 'react';
import { ViewMode } from '../types';
import { LanternIcon, CrescentIcon } from '../constants';

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const Header: React.FC<HeaderProps> = ({ viewMode, setViewMode }) => {
  return (
    <header className="relative w-full overflow-hidden pt-12 pb-8 px-4 text-center">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-4 md:left-20 animate-bounce transition-all duration-1000">
        <LanternIcon />
      </div>
      <div className="absolute top-4 right-4 md:right-20">
        <CrescentIcon />
      </div>
      <div className="hidden md:block absolute top-10 left-1/4 opacity-20">
        <LanternIcon />
      </div>
      <div className="hidden md:block absolute top-0 right-1/4 opacity-20">
        <LanternIcon />
      </div>

      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#4a2c8a] mb-2 tracking-tight">
          প্রোডাক্টিভ রমজান
        </h1>
        <p className="text-xl md:text-2xl text-[#6b46c1] font-medium mb-8">
          কাটানোর সেরা সঙ্গী
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setViewMode(ViewMode.CALENDAR)}
            className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg ${
              viewMode === ViewMode.CALENDAR
                ? 'bg-[#4a2c8a] text-white'
                : 'bg-white text-[#4a2c8a] hover:bg-gray-50'
            }`}
          >
            রমজান ক্যালেন্ডার
          </button>
          <button
            onClick={() => setViewMode(ViewMode.PLANNER)}
            className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg ${
              viewMode === ViewMode.PLANNER
                ? 'bg-[#4a2c8a] text-white'
                : 'bg-white text-[#4a2c8a] hover:bg-gray-50'
            }`}
          >
            রমজান ডেইলি প্ল্যানার
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
