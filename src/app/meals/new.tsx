import { Check, X } from '@tamagui/lucide-icons-2'
import { router } from 'expo-router'
import { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Button,
  H2,
  Input,
  Label,
  ScrollView,
  SizableText,
  TextArea,
  XStack,
  YStack,
} from 'tamagui'

import { mealTimeOrder, mealTimes } from '../../constants/mealTimes'
import { useMeals } from '../../store/meals'
import type { MealTime } from '../../types/meal'
import { daysAgo, toDateString } from '../../utils/date'

// "/meals/new" の記録画面。
// meals/[id].tsx より、名前が決まっている new.tsx のほうが優先される（Next.js と同じ）。
export default function NewMealScreen() {
  const insets = useSafeAreaInsets()
  const { addMeal } = useMeals()

  const today = toDateString(new Date())
  const [name, setName] = useState('')
  const [memo, setMemo] = useState('')
  const [date, setDate] = useState(today)
  const [time, setTime] = useState<MealTime>(guessMealTime())

  const isDateValid = isValidDate(date)
  const canSave = name.trim() !== '' && isDateValid

  const close = () => (router.canGoBack() ? router.back() : router.replace('/'))

  const save = () => {
    if (!canSave) return
    const meal = addMeal({ name: name.trim(), memo: memo.trim(), date, time })
    // 記録画面を履歴から消して、作った料理の詳細画面に入れ替える
    router.replace(`/meals/${meal.id}`)
  }

  return (
    <ScrollView
      flex={1}
      bg="$background"
      // キーボードが出ている状態でも、ボタンを1回のタップで押せるようにする（iOS / Android 用）
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ pt: insets.top + 8, pb: insets.bottom + 32 }}
    >
      <YStack px="$4" gap="$5" width="100%" maxW={720} self="center">
        <XStack>
          <Button size="$3" chromeless icon={X} onPress={close}>
            キャンセル
          </Button>
        </XStack>

        <H2>料理を記録</H2>

        <YStack gap="$2">
          <Label htmlFor="meal-name">料理名</Label>
          <Input
            id="meal-name"
            size="$4"
            value={name}
            onChangeText={setName}
            placeholder="例：オムライス"
            placeholderTextColor="$color8"
            returnKeyType="next"
          />
        </YStack>

        <YStack gap="$2">
          <Label>いつ食べた？</Label>
          <XStack gap="$2">
            {mealTimeOrder.map((t) => {
              const { shortLabel, theme, Icon } = mealTimes[t]
              const selected = t === time
              // Web ではマウスを乗せたとき・押したときの見た目(hoverStyle / pressStyle)が
              // bg を上書きするので、選択中はそちらにも同じ色を指定しておく
              const selectedStyle = { bg: '$color5', borderColor: '$color9' } as const
              return (
                <Button
                  key={t}
                  theme={theme}
                  flex={1}
                  icon={Icon}
                  borderWidth={2}
                  bg="$color2"
                  borderColor="$color4"
                  {...(selected && {
                    ...selectedStyle,
                    hoverStyle: selectedStyle,
                    pressStyle: selectedStyle,
                  })}
                  onPress={() => setTime(t)}
                >
                  {shortLabel}
                </Button>
              )
            })}
          </XStack>
        </YStack>

        <YStack gap="$2">
          <Label htmlFor="meal-date">日付</Label>
          <XStack gap="$2" items="center">
            <Input
              id="meal-date"
              flex={1}
              size="$4"
              value={date}
              onChangeText={setDate}
              placeholder="2026-10-02"
              placeholderTextColor="$color8"
              borderColor={isDateValid ? '$borderColor' : '$red9'}
            />
            <Button size="$3" onPress={() => setDate(today)}>
              今日
            </Button>
            <Button size="$3" onPress={() => setDate(daysAgo(1))}>
              昨日
            </Button>
          </XStack>
          {!isDateValid && (
            <SizableText size="$2" color="$red10">
              「2026-10-02」の形で入力してください
            </SizableText>
          )}
        </YStack>

        <YStack gap="$2">
          <Label htmlFor="meal-memo">ひとことメモ</Label>
          <TextArea
            id="meal-memo"
            size="$4"
            value={memo}
            onChangeText={setMemo}
            placeholder="例：卵がちょっと固くなった"
            placeholderTextColor="$color8"
            numberOfLines={4}
          />
        </YStack>

        <Button
          theme="accent"
          size="$5"
          icon={Check}
          disabled={!canSave}
          opacity={canSave ? 1 : 0.4}
          onPress={save}
        >
          記録する
        </Button>
      </YStack>
    </ScrollView>
  )
}

// 今の時刻から、朝・昼・晩のどれを記録しそうか推測する
function guessMealTime(): MealTime {
  const hour = new Date().getHours()
  if (hour < 10) return 'breakfast'
  if (hour < 16) return 'lunch'
  return 'dinner'
}

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  // "2026-02-31" のような存在しない日付をはじく
  return toDateString(new Date(`${value}T00:00:00`)) === value
}
