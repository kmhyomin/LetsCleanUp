import type { Challenge, FunFact } from '../types';

export const CHALLENGES: Challenge[] = [
  { id: 'c1', category: 'transit', title: '오늘 지하철 탑승 시 백팩 앞으로 메기', description: '탑승 순간부터 하차까지 유지해요.', point: 10 },
  { id: 'c2', category: 'restroom', title: '공공화장실 깨끗이 쓰기', description: '사용 후 변기·세면대 상태를 확인해요.', point: 10 },
  { id: 'c3', category: 'transit', title: '대중교통에서 음식 먹지 않기', description: '음료 외 섭취는 내려서!', point: 5 },
  { id: 'c4', category: 'public', title: '다리 모으고 앉기', description: '내 좌석 폭 안에서 앉아요.', point: 5 },
  { id: 'c5', category: 'self', title: '외출 전 냄새 체크', description: '옷과 몸 냄새를 확인하고 나가요.', point: 5 },
  { id: 'c6', category: 'public', title: '쓰레기 하나 줍기', description: '길에 떨어진 쓰레기 한 개를 주워 버려요.', point: 15 },
];

export const FUN_FACTS: FunFact[] = [
  { id: 'f1', text: '사람의 코는 약 1조 가지의 냄새를 구별할 수 있다는 연구가 있어요. 내 냄새도 누군가에겐 선명하게 느껴져요.' },
  { id: 'f2', text: '손을 20~30초 이상 비누로 씻으면 손에 있는 세균을 크게 줄일 수 있어요.' },
  { id: 'f3', text: '변기 뚜껑을 닫고 물을 내리면 비말이 공기 중으로 퍼지는 것을 줄일 수 있어요.' },
  { id: 'f4', text: '백팩을 앞으로 메면 혼잡한 객차에서 한 사람 몫에 가까운 공간이 생기기도 해요.' },
  { id: 'f5', text: '깨진 유리창 이론: 작은 무질서를 방치하면 더 큰 무질서를 부른다는 이론이에요. 작은 매너가 중요한 이유!' },
];
