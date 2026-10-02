import { Calendar, ChevronLeft } from '@tamagui/lucide-icons-2'
import { router, useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button, Card, H2, Paragraph, ScrollView, Text, XStack, YStack } from 'tamagui'

import { MealCard } from '../../components/MealCard'
import { mealTimes } from '../../constants/mealTimes'
import { getMealById, meals } from '../../data/meals'
import type { Meal } from '../../types/meal'
import { formatDate } from '../../utils/date'

// "/meals/1" のような URL に対応する画面。
// Next.js の app/meals/[id]/page.tsx と同じで、[id] の部分が URL から渡ってくる。
export default function MealDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const insets = useSafeAreaInsets()
  const meal = getMealById(id)

  // Web で URL を直接開いた場合は戻る履歴がないので、一覧へ移動する
  const goBack = () => (router.canGoBack() ? router.back() : router.replace('/'))

  return (
    <ScrollView
      flex={1}
      bg="$background"
      contentContainerStyle={{ pt: insets.top + 8, pb: insets.bottom + 32 }}
    >
      <YStack px="$4" gap="$5" width="100%" maxW={720} self="center">
        <XStack>
          <Button size="$3" chromeless icon={ChevronLeft} onPress={goBack}>
            一覧に戻る
          </Button>
        </XStack>

        {meal ? <MealDetail meal={meal} /> : <NotFound />}
      </YStack>
    </ScrollView>
  )
}

function MealDetail({ meal }: { meal: Meal }) {
  const { label, theme, Icon } = mealTimes[meal.time]
  const sameDayMeals = meals.filter((m) => m.date === meal.date && m.id !== meal.id)

  return (
    <>
      {/* この Card の中は、時間帯のテーマ色(朝=orange など)になる */}
      <Card theme={theme} bg="$color3" rounded="$8" p="$5" gap="$3" items="center">
        <YStack
          width={88}
          height={88}
          rounded={44}
          bg="$color5"
          items="center"
          justify="center"
        >
          <Icon size={44} color="$color11" />
        </YStack>
        <YStack bg="$color5" px="$3" py="$1" rounded="$10">
          <Text fontSize="$3" fontWeight="600" color="$color11">
            {label}
          </Text>
        </YStack>
        <H2 color="$color12" text="center">
          {meal.name}
        </H2>
        <XStack items="center" gap="$2">
          <Calendar size={16} color="$color10" />
          <Text fontSize="$4" color="$color10">
            {formatDate(meal.date)}
          </Text>
        </XStack>
      </Card>

      <YStack gap="$2">
        <Text fontSize="$5" fontWeight="700">
          ひとことメモ
        </Text>
        <Card bg="$color2" borderWidth={1} borderColor="$borderColor" rounded="$6" p="$4">
          <Paragraph size="$5">{meal.memo}</Paragraph>
        </Card>
      </YStack>

      {sameDayMeals.length > 0 && (
        <YStack gap="$3">
          <Text fontSize="$5" fontWeight="700">
            同じ日の料理
          </Text>
          {sameDayMeals.map((m) => (
            <MealCard key={m.id} meal={m} onPress={() => router.push(`/meals/${m.id}`)} />
          ))}
        </YStack>
      )}
    </>
  )
}

function NotFound() {
  return (
    <YStack items="center" gap="$3" py="$10">
      <H2>見つかりませんでした</H2>
      <Paragraph color="$color10">この料理の記録は削除されたか、存在しません。</Paragraph>
    </YStack>
  )
}
