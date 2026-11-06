import type { Category } from '../types'

export const CATEGORY_LABEL: Record<Category, string> = {
  transit: '대중교통',
  restroom: '공공화장실',
  public: '공공장소',
  self: '개인 청결',
}

export const CATEGORY_COLOR: Record<Category, string> = {
  transit: '#0ea5e9',
  restroom: '#8b5cf6',
  public: '#f59e0b',
  self: '#16a34a',
}
