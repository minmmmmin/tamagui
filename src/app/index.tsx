import { Plus } from '@tamagui/lucide-icons-2'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, H2, Image, ScrollView, SizableText, XStack, YStack } from 'tamagui'

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
        <XStack items="flex-end" gap="$2">
          {/* require() で画像を読み込むと、Web では URL、iOS ではアプリ内の画像として扱われる */}
          <Image src={require('../../assets/piyo.png')} width={48} height={48} objectFit="contain" />
          <YStack gap="$1" flex={1}>
            <SizableText fontSize="$4" color="$color10">
              {formatDate(today)}
            </SizableText>
            <H2>今日のおりょうり</H2>
          </YStack>
        </XStack>

        <YStack gap="$2">
          <XStack items="center" justify="space-between">
            <SizableText fontSize="$5" fontWeight="700">
              今日のまとめ
            </SizableText>
            <Button theme="accent" size="$3" icon={Plus} onPress={() => router.push('/meals/new')}>
              記録する
            </Button>
          </XStack>
          <TodaySummary meals={todayMeals} />
        </YStack>

        <YStack gap="$2">
          <SizableText fontSize="$5" fontWeight="700">
            最近の記録
          </SizableText>
          {/*
            画面幅に応じて列の数を変える（Step 5）。
            React Native には CSS Grid が無いので、横に並べて折り返し(flexWrap)、
            1枚あたりの幅を media props で切り替える：
              スマホ … 100%（1列） / $md(768px〜) … 50%（2列） / $lg(1024px〜) … 33%（3列）
            カードの間隔は「外側に -6、各カードに 6 の余白」で作る（% の幅と gap を混ぜると端数で崩れやすい）
          */}
          <XStack flexWrap="wrap" mx={-6}>
            {sortedMeals.map((meal) => (
              <YStack
                key={meal.id}
                width="100%"
                $md={{ width: '50%' }}
                $lg={{ width: '33.333%' }}
                p={6}
              >
                <MealCard meal={meal} onPress={(m) => router.push(`/meals/${m.id}`)} />
              </YStack>
            ))}
          </XStack>
        </YStack>
      </YStack>
    </ScrollView>
  )
}
