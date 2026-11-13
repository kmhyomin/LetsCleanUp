import type { CleanSpot, Congestion } from '../types';

// TODO: 행정안전부 「전국 공공화장실 개방 정보」 API 연동 시 교체
export const MOCK_SPOTS: CleanSpot[] = [
  { id: 'p1', name: '시청역 개방화장실', type: 'restroom', address: '서울 중구 세종대로 지하 101', x: 22, y: 30, cleanScore: 92, unisex: false, openHours: '05:30 ~ 24:00' },
  { id: 'p2', name: '을지로입구역', type: 'station', address: '서울 중구 을지로 지하 42', x: 45, y: 22, cleanScore: 81, unisex: false, openHours: '05:30 ~ 24:00' },
  { id: 'p3', name: '청계천 광장 화장실', type: 'restroom', address: '서울 중구 태평로1가 1', x: 35, y: 55, cleanScore: 74, unisex: true, openHours: '24시간' },
  { id: 'p4', name: '서울숲 공원', type: 'park', address: '서울 성동구 뚝섬로 273', x: 78, y: 68, cleanScore: 88, unisex: false, openHours: '24시간' },
  { id: 'p5', name: '종로3가역', type: 'station', address: '서울 종로구 돈화문로 지하 30', x: 60, y: 40, cleanScore: 67, unisex: false, openHours: '05:30 ~ 24:00' },
  { id: 'p6', name: '남산공원 화장실', type: 'restroom', address: '서울 중구 삼일대로 231', x: 50, y: 82, cleanScore: 95, unisex: false, openHours: '06:00 ~ 23:00' },
];

// TODO: 서울시 지하철 혼잡도 API 연동 시 교체
export const MOCK_CONGESTION: Congestion[] = [
  { line: '2호선', station: '시청', level: '혼잡', recommendTime: '09:30 이후' },
  { line: '2호선', station: '을지로입구', level: '보통', recommendTime: '10:00 이후' },
  { line: '1호선', station: '종로3가', level: '여유', recommendTime: '지금 탑승 추천' },
];
