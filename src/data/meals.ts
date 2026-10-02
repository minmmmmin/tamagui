import type { Meal } from '../types/meal'
import { toDateString } from '../utils/date'

// ダミーデータ。あとで DB / API に置き換える。
// いつ開いても「今日」の記録があるように、日付は今日からの相対で作っている。
function daysAgo(n: number) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return toDateString(d)
}

export const meals: Meal[] = [
  {
    id: '1',
    name: 'オムライス',
    memo: '卵がちょっと固くなった',
    date: daysAgo(0),
    time: 'lunch',
  },
  {
    id: '2',
    name: 'ハニートースト',
    memo: 'はちみつをかけすぎた。でもおいしい',
    date: daysAgo(0),
    time: 'breakfast',
  },
  {
    id: '3',
    name: '鮭のホイル焼き',
    memo: 'きのこたっぷり。レモンを絞ると最高',
    date: daysAgo(0),
    time: 'dinner',
  },
  {
    id: '4',
    name: 'カレーライス',
    memo: '隠し味にチョコを入れてみた',
    date: daysAgo(1),
    time: 'dinner',
  },
  {
    id: '5',
    name: 'ざるそば',
    memo: '暑かったのでさっぱりと',
    date: daysAgo(1),
    time: 'lunch',
  },
  {
    id: '6',
    name: 'フルーツヨーグルト',
    memo: 'バナナとキウイ。朝は軽めに',
    date: daysAgo(1),
    time: 'breakfast',
  },
]

// あとで API の GET /meals/:id に置き換える想定
export function getMealById(id: string) {
  return meals.find((m) => m.id === id)
}
