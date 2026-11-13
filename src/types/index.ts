export type Level = 'beginner' | 'intermediate' | 'advanced';

export type Category = 'transit' | 'restroom' | 'public' | 'self';

export interface QuizOption {
  label: string;
  score: number;
}

export interface QuizQuestion {
  id: string;
  category: Category;
  question: string;
  options: QuizOption[];
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
}

export interface RoadmapStage {
  id: string;
  level: Level;
  category: Category;
  title: string;
  summary: string;
  tasks: RoadmapTask[];
}

export interface Challenge {
  id: string;
  category: Category;
  title: string;
  description: string;
  point: number;
}

export interface FunFact {
  id: string;
  text: string;
}

export interface CleanSpot {
  id: string;
  name: string;
  type: 'restroom' | 'station' | 'park';
  address: string;
  /** 지도 위 상대 좌표 (0 ~ 100) */
  x: number;
  y: number;
  cleanScore: number;
  unisex: boolean;
  openHours: string;
}

export interface AirQuality {
  pm10: number;
  pm25: number;
  grade: '좋음' | '보통' | '나쁨' | '매우나쁨';
}

export interface Congestion {
  line: string;
  station: string;
  level: '여유' | '보통' | '혼잡';
  recommendTime: string;
}
