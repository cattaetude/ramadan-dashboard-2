
import React, { useState } from 'react';
import { TASK_LABELS } from '../constants';
import { Check, Calendar, Sun, Moon, ArrowRight } from 'lucide-react';

const DailyPlanner: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [selectedDay, setSelectedDay] = useState(1);

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [`${selectedDay}-${taskId}`]: !prev[`${selectedDay}-${taskId}`]
    }));
  };

  const calculateProgress = () => {
    const dayTasks = TASK_LABELS.filter(label => completedTasks[`${selectedDay}-${label}`]);
    return Math.round((dayTasks.length / TASK_LABELS.length) * 100);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar">
        {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`flex-shrink-0 w-14 h-16 flex flex-col items-center justify-center rounded-2xl font-bold transition-all ${
              selectedDay === day 
                ? 'bg-yellow-500 text-black scale-110' 
                : 'glass-card text-gray-400 border-none'
            }`}
          >
            <span className="text-[10px] opacity-70">DAY</span>
            <span className="text-xl">{day}</span>
          </button>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-8 bg-gradient-to-br from-purple-900 to-black text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black mb-1">ইবাদত চেকলিস্ট</h3>
            <p className="text-yellow-500 flex items-center justify-center md:justify-start gap-2">
              <Calendar size={18} /> রমজান - {selectedDay} তম দিন
            </p>
          </div>
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path className="text-white/10" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              <path className="text-yellow-500 transition-all duration-700" strokeDasharray={`${calculateProgress()}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-black text-xl">
              {calculateProgress()}%
            </div>
          </div>
        </div>

        <div className="p-6 grid md:grid-cols-2 gap-3">
          {TASK_LABELS.map((label, index) => {
            const isCompleted = !!completedTasks[`${selectedDay}-${label}`];
            return (
              <button
                key={label}
                onClick={() => toggleTask(label)}
                className={`group flex items-center justify-between p-4 rounded-xl transition-all border ${
                  isCompleted 
                    ? 'bg-purple-900/40 border-purple-500/50' 
                    : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${
                    isCompleted ? 'bg-yellow-500 border-yellow-500 text-black' : 'border-white/20 text-transparent'
                  }`}>
                    <Check size={14} />
                  </div>
                  <span className={`font-medium ${isCompleted ? 'text-white' : 'text-gray-400'}`}>
                    {label}
                  </span>
                </div>
                {index % 2 === 0 ? <Sun size={16} className="text-yellow-500/40" /> : <Moon size={16} className="text-blue-500/40" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyPlanner;
