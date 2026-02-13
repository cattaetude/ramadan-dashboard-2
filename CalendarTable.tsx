
import React from 'react';
import { RAMADAN_DATA } from '../constants';

const CalendarTable: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto glass-card overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 bg-gradient-to-r from-purple-900 to-indigo-900 text-white text-center">
        <h2 className="text-2xl font-bold">সেহরি ও ইফতারের সময়সূচি</h2>
        <p className="text-purple-300 mt-1">১৪৪৬ হিজরি - ২০২৫ ইংরেজি (ঢাকা ও পার্শ্ববর্তী এলাকা)</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-yellow-500 border-b border-white/10">
              <th className="px-6 py-4 font-bold">রমজান</th>
              <th className="px-6 py-4 font-bold">তারিখ</th>
              <th className="px-6 py-4 font-bold">বার</th>
              <th className="px-6 py-4 font-bold">সেহরি</th>
              <th className="px-6 py-4 font-bold">ইফতার</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {RAMADAN_DATA.map((day) => (
              <tr key={day.ramadan} className="hover:bg-white/10 transition-colors">
                <td className="px-6 py-4">
                  <span className="w-8 h-8 flex items-center justify-center bg-yellow-500/20 text-yellow-500 rounded-full text-sm font-bold">
                    {day.ramadan}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">{day.date}</td>
                <td className="px-6 py-4 text-gray-400">{day.day}</td>
                <td className="px-6 py-4 text-red-400 font-bold">{day.sehri}</td>
                <td className="px-6 py-4 text-green-400 font-bold">{day.iftar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarTable;
