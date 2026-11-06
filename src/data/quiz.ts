import type { QuizQuestion } from '../types'

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'transit',
    question: '지하철에서 백팩을 메고 있을 때 어떻게 하나요?',
    options: [
      { label: '그냥 등에 메고 있어요', score: 0 },
      { label: '사람이 많을 때만 앞으로 메요', score: 1 },
      { label: '탑승하면 항상 앞으로 메거나 선반에 올려요', score: 2 },
    ],
  },
  {
    id: 'q2',
    category: 'transit',
    question: '대중교통 안에서 음식을 먹는 것에 대해 어떻게 생각하나요?',
    options: [
      { label: '배고프면 먹을 수도 있죠', score: 0 },
      { label: '냄새 없는 간단한 간식 정도는 괜찮아요', score: 1 },
      { label: '음료 외에는 먹지 않아요', score: 2 },
    ],
  },
  {
    id: 'q3',
    category: 'restroom',
    question: '공공화장실을 사용한 뒤 나는…',
    options: [
      { label: '볼일만 보고 바로 나와요', score: 0 },
      { label: '물은 꼭 내리고 나와요', score: 1 },
      { label: '물 내리고, 주변 정리 후 다음 사람을 생각해요', score: 2 },
    ],
  },
  {
    id: 'q4',
    category: 'public',
    question: '좌석에 앉을 때 다리 자세는?',
    options: [
      { label: '편한 대로 벌리고 앉아요', score: 0 },
      { label: '옆에 사람이 있으면 모아요', score: 1 },
      { label: '항상 내 자리 폭 안에서 앉아요', score: 2 },
    ],
  },
  {
    id: 'q5',
    category: 'self',
    question: '외출 전 개인 청결 관리는?',
    options: [
      { label: '딱히 신경 쓰지 않아요', score: 0 },
      { label: '가끔 체크해요', score: 1 },
      { label: '샤워·옷 냄새·구강 상태까지 확인해요', score: 2 },
    ],
  },
]

export const MAX_QUIZ_SCORE = QUIZ_QUESTIONS.length * 2
