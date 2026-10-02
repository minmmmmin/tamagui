import type { ImageProps } from 'tamagui'

// 料理1件分のデータ。あとで DB / API から取ってくるときもこの形のまま使う想定。
export type MealTime = 'breakfast' | 'lunch' | 'dinner'

export type Meal = {
  id: string
  name: string
  memo: string
  date: string // "2026-10-02" 形式
  time: MealTime
  // 写真。Tamagui の <Image src> にそのまま渡せる値。
  // いまは require() したアプリ内の画像、あとで画像アップロードを作ったら URL が入る。
  // 記録画面から作った料理には無い。
  photo?: ImageProps['src']
}
