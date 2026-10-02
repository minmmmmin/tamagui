import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, H2, ScrollView, SizableText, XStack, YStack } from 'tamagui'

import { MealCard } from '../components/MealCard'
import { TodaySummary } from '../components/TodaySummary'
import { mealTimeOrder } from '../constants/mealTimes'
import { useMeals } from '../store/meals'
import { formatDate, toDateString } from '../utils/date'

// "/" に対応する画面。Next.js の app/page.tsx に相当する。
export default function HomeScreen() {
  // iPhone のノッチやホームバーに中身が隠れないための余白。Web では 0 になる。
  const insets = useSafeAreaInsets()
  const { meals } = useMeals()

  const today = toDateString(new Date())
  const todayMeals = meals.filter((m) => m.date === today)

  // 新しい順：日付の降順 → 同じ日なら 晩 → 昼 → 朝
  const sortedMeals = [...meals].sort(
    (a, b) =>
      b.date.localeCompare(a.date) ||
      mealTimeOrder.indexOf(b.time) - mealTimeOrder.indexOf(a.time),
  )

  return (
    <ScrollView
      flex={1}
      bg="$background"
      contentContainerStyle={{ pt: insets.top + 16, pb: insets.bottom + 32 }}
    >
      <YStack px="$4" gap="$5" width="100%" maxW={1100} self="center">
        <XStack items="flex-end" justify="space-between" gap="$3">
          <YStack gap="$1" flex={1}>
            <SizableText fontSize="$4" color="$color10">
              {formatDate(today)}
            </SizableText>
            <H2>今日のお料理</H2>
          </YStack>
          <Button theme="accent" onPress={() => router.push('/meals/new')}>
            ＋ 記録する
          </Button>
        </XStack>

        <YStack gap="$2">
          <SizableText fontSize="$5" fontWeight="700">
            今日のまとめ
          </SizableText>
          <TodaySummary meals={todayMeals} />
        </YStack>

        <YStack gap="$3">
          <SizableText fontSize="$5" fontWeight="700">
            最近の記録
          </SizableText>
          {sortedMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} onPress={(m) => router.push(`/meals/${m.id}`)} />
          ))}
        </YStack>
      </YStack>
    </ScrollView>
  )
}
