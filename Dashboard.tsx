
import React, { useState, useEffect } from 'react';
import { RAMADAN_DATA } from '../constants';
import { Clock, MapPin, Wind, Sun, Moon, Search, Loader2 } from 'lucide-react';
import { Timings, LocationData } from '../types';

const Dashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timings, setTimings] = useState<Timings | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchCity, setSearchCity] = useState('');
  const [ramadanDay, setRamadanDay] = useState<number | null>(null);
  const [countdown, setCountdown] = useState('00:00:00');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchTimings = async (lat: number, lon: number, city?: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`
      );
      const data = await response.json();
      if (data.code === 200) {
        setTimings(data.data.timings);
        setLocation({
          city: city || data.data.meta.timezone.split('/')[1].replace('_', ' '),
          latitude: lat,
          longitude: lon
        });
        
        // Detect Ramadan Day
        const hijri = data.data.date.hijri;
        if (hijri.month.number === 9) {
          setRamadanDay(parseInt(hijri.day));
        } else {
          setRamadanDay(null);
        }
      }
    } catch (err) {
      setError('তথ্য লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchTimings(pos.coords.latitude, pos.coords.longitude),
        () => fetchTimings(23.8103, 90.4125, 'Dhaka') // Fallback to Dhaka
      );
    } else {
      fetchTimings(23.8103, 90.4125, 'Dhaka');
    }
  }, []);

  useEffect(() => {
    if (!timings) return;

    const updateCountdown = () => {
      const now = new Date();
      const [h, m] = timings.Maghrib.split(':');
      const iftarTime = new Date();
      iftarTime.setHours(parseInt(h), parseInt(m), 0);

      if (now > iftarTime) {
        // If passed today, show next Sahri (Fajr)
        const [sh, sm] = timings.Fajr.split(':');
        const sahriTime = new Date();
        sahriTime.setDate(sahriTime.getDate() + 1);
        sahriTime.setHours(parseInt(sh), parseInt(sm), 0);
        
        const diff = sahriTime.getTime() - now.getTime();
        setCountdown(formatDiff(diff));
      } else {
        const diff = iftarTime.getTime() - now.getTime();
        setCountdown(formatDiff(diff));
      }
    };

    const cTimer = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(cTimer);
  }, [timings]);

  const formatDiff = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCitySearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCity) return;
    setLoading(true);
    try {
      const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchCity}`);
      const geoData = await geoRes.json();
      if (geoData.length > 0) {
        fetchTimings(parseFloat(geoData[0].lat), parseFloat(geoData[0].lon), geoData[0].display_name.split(',')[0]);
      } else {
        setError('শহরটি খুঁজে পাওয়া যায়নি।');
        setLoading(false);
      }
    } catch (err) {
      setError('খুঁজতে সমস্যা হয়েছে।');
      setLoading(false);
    }
  };

  if (loading && !timings) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-purple-400">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p className="animate-pulse">আপনার এলাকার সময় লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 px-4 animate-in fade-in duration-700">
      {/* Location Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-4 px-6">
        <div className="flex items-center gap-2 text-white">
          <MapPin size={18} className="text-yellow-500" />
          <span className="font-bold">{location?.city || 'আপনার এলাকা'}</span>
        </div>
        <form onSubmit={handleCitySearch} className="relative w-full md:w-auto">
          <input 
            type="text" 
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="অন্য শহরের নাম খুঁজুন..." 
            className="w-full md:w-64 bg-white/5 border border-white/10 rounded-full py-2 px-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={16} />
        </form>
      </div>

      {/* Big Hero Card */}
      <div className="glass-card overflow-hidden p-8 relative border-t-4 border-yellow-500">
        <div className="absolute top-0 right-0 p-8 opacity-10 floating">
          <Moon size={120} className="text-yellow-400" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-yellow-400 font-bold mb-4">
            <span className="animate-pulse w-3 h-3 bg-yellow-400 rounded-full"></span>
            {ramadanDay ? `রমজান - ${ramadanDay.toString().padStart(2, '০')}` : 'রমজানের প্রস্তুতি'}
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black mb-2">
            {new Date().getHours() >= 12 && new Date().getHours() < parseInt(timings?.Maghrib.split(':')[0] || '18') 
              ? 'ইফতারের বাকি' 
              : 'সেহরির বাকি'}
          </h2>
          <div className="text-6xl md:text-7xl font-mono font-black text-white mb-6 tracking-tighter">
            {countdown}
          </div>
          
          <div className="flex flex-wrap gap-4 text-xs md:text-sm text-gray-400">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
              আজকের তারিখ: {currentTime.toLocaleDateString('bn-BD')}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/5">
              বর্তমান সময়: {currentTime.toLocaleTimeString('bn-BD')}
            </div>
          </div>
        </div>
      </div>

      {/* Grid for Times */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-6 flex items-center justify-between border-l-4 border-red-500 group hover:bg-red-500/5 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-red-500/10 rounded-2xl text-red-500 group-hover:scale-110 transition-transform">
              <Sun size={32} />
            </div>
            <div>
              <div className="text-gray-400 text-xs uppercase tracking-widest">সেহরির শেষ সময় (ফজর)</div>
              <div className="text-3xl font-black text-white">{timings?.Fajr} <span className="text-sm font-normal text-gray-500">AM</span></div>
            </div>
          </div>
          <div className="hidden sm:block text-right text-[10px] text-red-400 font-bold bg-red-400/10 px-2 py-1 rounded">
            ধৈর্য ধরুন
          </div>
        </div>

        <div className="glass-card p-6 flex items-center justify-between border-l-4 border-green-500 group hover:bg-green-500/5 transition-all">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-green-500/10 rounded-2xl text-green-500 group-hover:scale-110 transition-transform">
              <Moon size={32} />
            </div>
            <div>
              <div className="text-gray-400 text-xs uppercase tracking-widest">ইফতারের সময় (মাগরিব)</div>
              <div className="text-3xl font-black text-white">{timings?.Maghrib} <span className="text-sm font-normal text-gray-500">PM</span></div>
            </div>
          </div>
          <div className="hidden sm:block text-right text-[10px] text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded">
            আলহামদুলিল্লাহ
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-center text-sm">
          {error}
        </div>
      )}

      {/* Dynamic Verse based on Ramadan Day or Random */}
      <div className="glass-card p-6 bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-none italic text-center">
        {ramadanDay ? (
          <>
            "রমজান মাসই সেই মাস, যাতে নাজিল করা হয়েছে আল কুরআন, যা মানুষের জন্য হেদায়াত এবং সত্য-মিথ্যার পার্থক্যকারী।"
            <div className="mt-2 text-yellow-500 font-bold not-italic">— সূরা আল-বাকারা, ১৮৫</div>
          </>
        ) : (
          <>
            "নিশ্চয় কষ্টের সাথেই স্বস্তি রয়েছে।"
            <div className="mt-2 text-yellow-500 font-bold not-italic">— সূরা আল-ইনশিরাহ, ০৬</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
