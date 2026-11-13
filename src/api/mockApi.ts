import { MOCK_CONGESTION, MOCK_SPOTS } from '../data/spots';
import type { AirQuality, CleanSpot, Congestion } from '../types';

/**
 * 실제 공공데이터 API 연동 전까지 사용하는 목(mock) API입니다.
 * 각 함수의 반환 타입만 맞추면 실제 fetch 로 바로 교체할 수 있어요.
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** 전국 공공화장실 개방 정보 (행정안전부) */
export async function fetchCleanSpots(): Promise<CleanSpot[]> {
  await delay(400);
  return MOCK_SPOTS;
}

/** AirKorea 실시간 대기오염 (한국환경공단) */
export async function fetchAirQuality(): Promise<AirQuality> {
  await delay(300);
  const pm10 = 20 + Math.round(Math.random() * 60);
  const pm25 = Math.round(pm10 * 0.55);
  const grade: AirQuality['grade'] =
    pm10 <= 30 ? '좋음' : pm10 <= 80 ? '보통' : pm10 <= 150 ? '나쁨' : '매우나쁨';
  return { pm10, pm25, grade };
}

/** 지하철 혼잡도 (서울시) */
export async function fetchCongestion(): Promise<Congestion[]> {
  await delay(350);
  return MOCK_CONGESTION;
}
