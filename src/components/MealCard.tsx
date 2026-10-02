import { Button, Card, Paragraph, Text, XStack, YStack } from 'tamagui'

import type { Meal, MealTime } from '../types/meal'

// 時間帯ごとの表示名と Tamagui テーマ。
// theme を変えるだけで、カード内の $color4 や $color11 が全部その色味に切り替わる。
const mealTimes = {
  breakfast: { label: '朝ごはん', theme: 'orange' },
  lunch: { label: 'お昼ごはん', theme: 'green' },
  dinner: { label: '晩ごはん', theme: 'purple' },
} as const satisfies Record<MealTime, { label: string; theme: string }>

// "2026-10-02" → "10月2日(金)"
function formatDate(date: string) {
  const d = new Date(`${date}T00:00:00`)
  const weekday = '日月火水木金土'[d.getDay()]
  return `${d.getMonth() + 1}月${d.getDate()}日(${weekday})`
}

type Props = {
  meal: Meal
  onPress?: (meal: Meal) => void
}

// Web でも iOS でも、この1ファイルがそのまま使われる共通コンポーネント。
export function MealCard({ meal, onPress }: Props) {
  const mealTime = mealTimes[meal.time]

  return (
    <Card
      theme={mealTime.theme}
      bg="$color2"
      borderWidth={1}
      borderColor="$color5"
      rounded="$6"
      overflow="hidden"
    >
      <Card.Header p="$4" gap="$3">
        <XStack items="center" gap="$3">
          {/* 絵文字のアイコン。width と height を同じにして角丸を大きくすると円になる */}
          <YStack
            width={56}
            height={56}
            rounded={28}
            bg="$color4"
            items="center"
            justify="center"
          >
            <Text fontSize={30}>{meal.emoji}</Text>
          </YStack>

          <YStack flex={1} gap="$1">
            <Text fontSize="$7" fontWeight="700" color="$color12">
              {meal.name}
            </Text>
            <XStack items="center" gap="$2">
              <YStack bg="$color5" px="$2" py={2} rounded="$10">
                <Text fontSize="$2" fontWeight="600" color="$color11">
                  {mealTime.label}
                </Text>
              </YStack>
              <Text fontSize="$3" color="$color10">
                {formatDate(meal.date)}
              </Text>
            </XStack>
          </YStack>
        </XStack>

        <Paragraph color="$color11">{meal.memo}</Paragraph>
      </Card.Header>

      <Card.Footer px="$4" pb="$4" justify="flex-end">
        <Button size="$3" theme="accent" onPress={() => onPress?.(meal)}>
          見る
        </Button>
      </Card.Footer>
    </Card>
  )
}
