
import React, { useState } from 'react';
import Header from './components/Header';
import CalendarTable from './components/CalendarTable';
import DailyPlanner from './components/DailyPlanner';
import DuaSection from './components/DuaSection';
import Dashboard from './components/Dashboard';
import Tasbih from './components/Tasbih';
import { ViewMode } from './types';
import { LayoutDashboard, Calendar, ClipboardList, Zap, Heart, Info } from 'lucide-react';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.DASHBOARD);

  const renderContent = () => {
    switch (viewMode) {
      case ViewMode.DASHBOARD: return <Dashboard />;
      case ViewMode.CALENDAR: return <CalendarTable />;
      case ViewMode.PLANNER: return <DailyPlanner />;
      case ViewMode.TASBIH: return <Tasbih />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen relative pb-32">
      {/* Background Ornaments */}
      <div className="fixed inset-0 islamic-pattern pointer-events-none"></div>
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Top Header */}
      <div className="container mx-auto px-4 pt-12 text-center relative z-10">
        <h1 className="text-3xl md:text-5xl font-black gradient-text tracking-tight mb-2">
          রমজান ড্যাশবোর্ড
        </h1>
        <p className="text-gray-400 text-sm md:text-base mb-8 uppercase tracking-[4px]">
          স্মার্ট ইবাদত গাইড ২০২৫
        </p>
      </div>

      <main className="container mx-auto px-4 relative z-10">
        {renderContent()}
        {viewMode === ViewMode.DASHBOARD && <DuaSection />}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-50">
        <div className="glass-card !rounded-full p-2 flex items-center justify-around shadow-2xl border border-white/20">
          <NavItem 
            active={viewMode === ViewMode.DASHBOARD} 
            onClick={() => setViewMode(ViewMode.DASHBOARD)}
            icon={<LayoutDashboard size={20} />} 
            label="হোম" 
          />
          <NavItem 
            active={viewMode === ViewMode.CALENDAR} 
            onClick={() => setViewMode(ViewMode.CALENDAR)}
            icon={<Calendar size={20} />} 
            label="সূচি" 
          />
          <NavItem 
            active={viewMode === ViewMode.PLANNER} 
            onClick={() => setViewMode(ViewMode.PLANNER)}
            icon={<ClipboardList size={20} />} 
            label="প্ল্যানার" 
          />
          <NavItem 
            active={viewMode === ViewMode.TASBIH} 
            onClick={() => setViewMode(ViewMode.TASBIH)}
            icon={<Zap size={20} />} 
            label="তসবিহ" 
          />
        </div>
      </nav>

      {/* Footer Decoration */}
      <footer className="mt-12 text-center text-gray-500 text-xs pb-10">
        <div className="flex items-center justify-center gap-4 mb-4">
           <span className="flex items-center gap-1"><Heart size={14} className="text-red-500" /> ইবাদত কবুল হোক</span>
           <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
           <span className="flex items-center gap-1"><Info size={14} className="text-blue-400" /> সঠিক সময় দেখে নিন</span>
        </div>
        <div className="opacity-50">
          © ২০২৫ প্রোডাক্টিভ রমজান • নকীব হাসান<br/>
          বিশ্বের যে কোনো প্রান্ত থেকে ব্যবহারযোগ্য
        </div>
      </footer>
    </div>
  );
};

interface NavItemProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 ${
      active ? 'active-tab text-white scale-105' : 'text-gray-400 hover:text-white'
    }`}
  >
    {icon}
    <span className="text-[10px] font-bold">{label}</span>
  </button>
);

export default App;
