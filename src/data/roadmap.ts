import type { Level, RoadmapStage } from '../types'

export const LEVEL_LABEL: Record<Level, string> = {
  beginner: '새싹 시민',
  intermediate: '매너 시민',
  advanced: '클린 리더',
}

export const LEVEL_ORDER: Level[] = ['beginner', 'intermediate', 'advanced']

export const ROADMAP: RoadmapStage[] = [
  {
    id: 's1',
    level: 'beginner',
    category: 'self',
    title: '나부터 깨끗하게',
    summary: '타인을 배려하는 첫걸음은 나의 청결입니다.',
    tasks: [
      { id: 's1-t1', title: '외출 전 냄새 체크', description: '옷·몸·입 냄새를 한 번 더 확인해요.' },
      { id: 's1-t2', title: '손 씻기 30초', description: '외출 후, 식사 전 비누로 30초 이상 씻어요.' },
    ],
  },
  {
    id: 's2',
    level: 'beginner',
    category: 'transit',
    title: '대중교통 기본 매너',
    summary: '좁은 공간일수록 작은 배려가 크게 느껴져요.',
    tasks: [
      { id: 's2-t1', title: '백팩 앞으로 메기', description: '탑승하면 가방을 앞으로 메거나 선반에 올려요.' },
      { id: 's2-t2', title: '이어폰 볼륨 낮추기', description: '옆 사람에게 소리가 새지 않게 해요.' },
      { id: 's2-t3', title: '내린 후 탑승', description: '문 앞을 비켜 내리는 사람을 먼저 보내요.' },
    ],
  },
  {
    id: 's3',
    level: 'intermediate',
    category: 'restroom',
    title: '공공화장실 에티켓',
    summary: '다음 사람이 기분 좋게 쓸 수 있도록.',
    tasks: [
      { id: 's3-t1', title: '물 내리고 확인하기', description: '나오기 전 변기 상태를 한 번 확인해요.' },
      { id: 's3-t2', title: '세면대 물기 닦기', description: '손 씻은 뒤 튄 물을 휴지로 정리해요.' },
    ],
  },
  {
    id: 's4',
    level: 'intermediate',
    category: 'public',
    title: '공공장소 공간 매너',
    summary: '내 자리는 내 폭만큼만.',
    tasks: [
      { id: 's4-t1', title: '다리 모으고 앉기', description: '옆 좌석을 침범하지 않아요.' },
      { id: 's4-t2', title: '음식물 섭취 자제', description: '냄새 나는 음식은 대중교통·실내 공공장소에서 피해요.' },
    ],
  },
  {
    id: 's5',
    level: 'advanced',
    category: 'public',
    title: '클린 리더 되기',
    summary: '내가 지킨 매너를 주변에 퍼뜨려요.',
    tasks: [
      { id: 's5-t1', title: '떨어진 쓰레기 줍기', description: '하루 한 번, 내 것이 아니어도 주워요.' },
      { id: 's5-t2', title: '클린 스팟 제보', description: '깨끗하게 관리되는 장소를 공유해요.' },
    ],
  },
]
