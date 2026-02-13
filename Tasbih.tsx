
import React, { useState } from 'react';
import { RotateCcw, Plus } from 'lucide-react';

const Tasbih: React.FC = () => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const handleIncrement = () => {
    setCount(prev => (prev === 33 ? 0 : prev + 1));
    setTotal(prev => prev + 1);
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const reset = () => {
    setCount(0);
    setTotal(0);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold gradient-text">তসবিহ কাউন্টার</h2>
        <p className="text-gray-400">প্রতিটি জিকিরে আল্লাহকে স্মরণ করুন</p>
      </div>

      <div className="relative flex items-center justify-center">
        {/* Progress Circle Decoration */}
        <div className="absolute inset-0 border-8 border-purple-900/30 rounded-full"></div>
        <div 
          className="absolute inset-0 border-8 border-yellow-500 rounded-full transition-all duration-300"
          style={{ clipPath: `inset(0 0 ${100 - (count/33)*100}% 0)` }}
        ></div>

        <button 
          onClick={handleIncrement}
          className="w-64 h-64 glass-card rounded-full flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition-all group z-10"
        >
          <span className="text-6xl font-black text-white group-hover:text-yellow-400 transition-colors">
            {count}
          </span>
          <span className="text-gray-400 mt-2">/ ৩৩</span>
          <div className="mt-4 p-3 bg-yellow-500 rounded-full text-black">
            <Plus size={32} />
          </div>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card p-4 text-center">
          <div className="text-sm text-gray-400 uppercase">মোট জিকির</div>
          <div className="text-2xl font-bold text-white">{total}</div>
        </div>
        <button 
          onClick={reset}
          className="glass-card p-4 flex flex-col items-center justify-center hover:bg-red-500/10 transition-colors"
        >
          <RotateCcw size={20} className="text-red-400 mb-1" />
          <span className="text-sm text-red-400">রিসেট করুন</span>
        </button>
      </div>
    </div>
  );
};

export default Tasbih;
