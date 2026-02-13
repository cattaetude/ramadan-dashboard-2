
import React from 'react';
import { RamadanDay } from './types';

export const RAMADAN_DATA: RamadanDay[] = [
  { ramadan: 1, date: '০১ মার্চ', day: 'শনিবার', sehri: '৫:০৫', iftar: '৬:০২' },
  { ramadan: 2, date: '০২ মার্চ', day: 'রবিবার', sehri: '৫:০৪', iftar: '৬:০৩' },
  { ramadan: 3, date: '০৩ মার্চ', day: 'সোমবার', sehri: '৫:০৩', iftar: '৬:০৩' },
  { ramadan: 4, date: '০৪ মার্চ', day: 'মঙ্গলবার', sehri: '৫:০২', iftar: '৬:০৪' },
  { ramadan: 5, date: '০৫ মার্চ', day: 'বুধবার', sehri: '৫:০১', iftar: '৬:০৪' },
  { ramadan: 6, date: '০৬ মার্চ', day: 'বৃহস্পতিবার', sehri: '৫:০০', iftar: '৬:০৫' },
  { ramadan: 7, date: '০৭ মার্চ', day: 'শুক্রবার', sehri: '৪:৫৯', iftar: '৬:০৫' },
  { ramadan: 8, date: '০৮ মার্চ', day: 'শনিবার', sehri: '৪:৫৮', iftar: '৬:০৬' },
  { ramadan: 9, date: '০৯ মার্চ', day: 'রবিবার', sehri: '৪:৫৭', iftar: '৬:০৬' },
  { ramadan: 10, date: '১০ মার্চ', day: 'সোমবার', sehri: '৪:৫৬', iftar: '৬:০৭' },
  // ... Adding some more for visualization
  { ramadan: 11, date: '১১ মার্চ', day: 'মঙ্গলবার', sehri: '৪:৫৫', iftar: '৬:০৭' },
  { ramadan: 12, date: '১২ মার্চ', day: 'বুধবার', sehri: '৪:৫৪', iftar: '৬:০৮' },
  { ramadan: 13, date: '১৩ মার্চ', day: 'বৃহস্পতিবার', sehri: '৪:৫৩', iftar: '৬:০৮' },
  { ramadan: 14, date: '১৪ মার্চ', day: 'শুক্রবার', sehri: '৪:৫১', iftar: '৬:০৯' },
  { ramadan: 15, date: '১৫ মার্চ', day: 'শনিবার', sehri: '৪:৫০', iftar: '৬:০৯' },
];

export const TASK_LABELS = [
  '৫ ওয়াক্ত নামাজ',
  'কুরআন তিলাওয়াত',
  'জিকির ও দুআ',
  'সদকাহ',
  'তারাবীহ',
  'তাহাজ্জুদ',
  'ইলম অর্জন',
  'পরিবারকে সময় দেয়া'
];

export const LanternIcon = () => (
  <svg width="40" height="60" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0L60 20H40L50 0Z" fill="#FBBF24" />
    <rect x="30" y="20" width="40" height="10" fill="#F59E0B" />
    <path d="M20 30H80V120H20V30Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
    <path d="M35 30V120M50 30V120M65 30V120" stroke="#D97706" strokeWidth="1" />
    <path d="M20 120H80V135H20V120Z" fill="#F59E0B" />
    <circle cx="50" cy="75" r="10" fill="white" fillOpacity="0.5" />
  </svg>
);

export const CrescentIcon = () => (
  <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50C20 33.4315 33.4315 20 50 20C55.8239 20 61.2751 21.6599 65.8893 24.5323C61.3402 24.3196 57.0396 25.3344 53.2536 27.3828C44.7554 31.9804 40 40.854 40 50C40 59.146 44.7554 68.0196 53.2536 72.6172C57.0396 74.6656 61.3402 75.6804 65.8893 75.4677C61.2751 78.3401 55.8239 80 50 80C33.4315 80 20 66.5685 20 50C20 33.4315 33.4315 20 50 20Z" fill="#FBBF24" />
  </svg>
);
