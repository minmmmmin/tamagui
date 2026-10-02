import { Button, H1, Text, YStack } from 'tamagui'

// "/" に対応する画面。Next.js の app/page.tsx に相当する。
export default function HomeScreen() {
  return (
    <YStack flex={1} items="center" justify="center" gap="$4" p="$4" bg="$background">
      <H1>今日のお料理</H1>
      <Text color="$color10">まだ記録がありません</Text>
      <Button theme="accent" onPress={() => console.log('pressed')}>
        記録する
      </Button>
    </YStack>
  )
}
