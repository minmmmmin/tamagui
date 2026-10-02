// 料理1件分のデータ。あとで DB / API から取ってくるときもこの形のまま使う想定。
export type MealTime = 'breakfast' | 'lunch' | 'dinner'

export type Meal = {
  id: string
  name: string
  memo: string
  date: string // "2026-10-02" 形式
  time: MealTime
  emoji: string
}
