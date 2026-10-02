import { H1, YStack } from 'tamagui'

import { MealCard } from '../components/MealCard'

// "/" に対応する画面。Next.js の app/page.tsx に相当する。
export default function HomeScreen() {
  return (
    <YStack flex={1} justify="center" gap="$4" p="$4" bg="$background">
      <H1 self="center">今日のお料理</H1>
      <MealCard
        meal={{
          id: '1',
          name: 'オムライス',
          memo: '卵がちょっと固くなった',
          date: '2026-10-02',
          time: 'lunch',
          emoji: '🍳',
        }}
        onPress={(meal) => console.log('見る:', meal.name)}
      />
    </YStack>
  )
}
