
import React from 'react';
import { Quote } from 'lucide-react';

const DuaSection: React.FC = () => {
  return (
    <section className="w-full max-w-4xl mx-auto py-12 px-4">
      <div className="glass-card p-8 md:p-12 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-5">
           <Quote size={200} className="text-white" />
        </div>
        
        <div className="relative z-10 text-center">
            <h3 className="text-xl font-bold text-yellow-500 mb-8 uppercase tracking-widest">
              ইফতারের পর দোয়া
            </h3>
            
            <div className="space-y-6">
              <p dir="rtl" className="text-3xl md:text-5xl font-serif text-white leading-relaxed">
                ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوْقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللهُ
              </p>
              <div className="h-[2px] w-16 bg-yellow-500 mx-auto"></div>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed italic">
                “পিপাসা দূর হলো, শিরা-উপশিরা সিক্ত হলো এবং ইনশাআল্লাহ সওয়াবও সাব্যস্ত হলো।”
              </p>
              <p className="text-xs text-gray-500">— আবু দাউদ, হাদিস নং ২৩৫৭</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default DuaSection;
