import { Card, SizableText, XStack, YStack } from 'tamagui'

import { mealTimeOrder, mealTimes } from '../constants/mealTimes'
import type { Meal } from '../types/meal'

type Props = {
  meals: Meal[] // 今日の分だけ渡す
}

// 今日の朝・昼・晩に何を食べたかを横並びで見せる
export function TodaySummary({ meals }: Props) {
  return (
    <XStack gap="$3">
      {mealTimeOrder.map((time) => {
        const meal = meals.find((m) => m.time === time)
        const { label, theme, Icon } = mealTimes[time]

        return (
          <Card
            key={time}
            theme={theme}
            flex={1}
            bg="$color3"
            rounded="$6"
            p="$3"
            gap="$1"
            items="center"
          >
            <Icon size={24} color="$color11" opacity={meal ? 1 : 0.3} />
            <SizableText fontSize="$2" fontWeight="600" color="$color11">
              {label}
            </SizableText>
            <SizableText fontSize="$3" color="$color12" numberOfLines={1}>
              {meal?.name ?? 'まだ'}
            </SizableText>
          </Card>
        )
      })}
    </XStack>
  )
}
