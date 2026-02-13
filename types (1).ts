
export interface RamadanDay {
  ramadan: number;
  date: string;
  day: string;
  sehri: string;
  iftar: string;
}

export interface LocationData {
  city: string;
  latitude: number;
  longitude: number;
}

export interface Timings {
  Fajr: string;
  Maghrib: string;
  Imsak: string;
  Sunrise: string;
  Sunset: string;
}

export enum ViewMode {
  DASHBOARD = 'dashboard',
  CALENDAR = 'calendar',
  PLANNER = 'planner',
  TASBIH = 'tasbih'
}
