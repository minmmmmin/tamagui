import { Button, Card, Paragraph, Text, XStack, YStack } from 'tamagui'

import { mealTimes } from '../constants/mealTimes'
import type { Meal } from '../types/meal'
import { formatDate } from '../utils/date'

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
