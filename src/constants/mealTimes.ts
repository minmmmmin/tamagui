import { Moon, Sun, Sunrise } from '@tamagui/lucide-icons-2'

import type { MealTime } from '../types/meal'

// 時間帯ごとの表示名・Tamagui テーマ・アイコン。
// theme を変えるだけで、その中の $color4 や $color11 が全部その色味に切り替わる。
export const mealTimes = {
  breakfast: { label: '朝ごはん', theme: 'orange', Icon: Sunrise },
  lunch: { label: 'お昼ごはん', theme: 'green', Icon: Sun },
  dinner: { label: '晩ごはん', theme: 'purple', Icon: Moon },
} as const satisfies Record<MealTime, { label: string; theme: string; Icon: typeof Sun }>

export const mealTimeOrder: MealTime[] = ['breakfast', 'lunch', 'dinner']
