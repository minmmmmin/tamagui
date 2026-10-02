import type { MealTime } from '../types/meal'

// 時間帯ごとの表示名と Tamagui テーマ。
// theme を変えるだけで、その中の $color4 や $color11 が全部その色味に切り替わる。
export const mealTimes = {
  breakfast: { label: '朝ごはん', theme: 'orange' },
  lunch: { label: 'お昼ごはん', theme: 'green' },
  dinner: { label: '晩ごはん', theme: 'purple' },
} as const satisfies Record<MealTime, { label: string; theme: string }>

export const mealTimeOrder: MealTime[] = ['breakfast', 'lunch', 'dinner']
