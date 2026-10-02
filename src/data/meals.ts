import type { Meal } from '../types/meal'

// ダミーデータ（アプリ起動時の初期値）。あとで DB / API に置き換える。
// 写真は assets/meals/ に入れたもの。require() は文字列を組み立てて使えないので1つずつ書く。
export const dummyMeals: Meal[] = [
  {
    id: '1',
    name: 'ごろごろ野菜カレー',
    memo: 'じゃがいもとにんじんを大きめに切った',
    date: '2026-09-14',
    time: 'dinner',
    photo: require('../../assets/meals/kare-0914.jpg'),
  },
  {
    id: '2',
    name: 'きのこのクリームパスタ',
    memo: 'きのこたっぷり。お皿の柄がお気に入り',
    date: '2026-09-17',
    time: 'lunch',
    photo: require('../../assets/meals/pasta0917.jpg'),
  },
  {
    id: '3',
    name: 'カレー（もち麦ごはん）',
    memo: 'ごはんをもち麦にしてみた。食感がいい',
    date: '2026-09-20',
    time: 'dinner',
    photo: require('../../assets/meals/kare-0920.jpg'),
  },
  {
    id: '4',
    name: 'ふわとろオムライス',
    memo: 'ケチャップで顔を描いた',
    date: '2026-09-21',
    time: 'lunch',
    photo: require('../../assets/meals/omu0921.jpg'),
  },
  {
    id: '5',
    name: 'フレンチトーストとウインナー',
    memo: '甘いのとしょっぱいのを一緒に',
    date: '2026-09-23',
    time: 'breakfast',
    photo: require('../../assets/meals/pan0923.jpg'),
  },
  {
    id: '6',
    name: 'トーストと目玉焼きとベーコン',
    memo: '黄身がとろっと半熟にできた',
    date: '2026-09-26',
    time: 'breakfast',
    photo: require('../../assets/meals/asagohan.jpg'),
  },
  {
    id: '7',
    name: '牛丼',
    memo: '玉ねぎを多めにして甘めの味つけ',
    date: '2026-09-28',
    time: 'dinner',
    photo: require('../../assets/meals/gyudon.jpg'),
  },
  {
    id: '8',
    name: 'クリームシチューとトースト',
    memo: 'トーストをシチューにひたして食べた',
    date: '2026-10-01',
    time: 'dinner',
    photo: require('../../assets/meals/sichu.jpg'),
  },
]
