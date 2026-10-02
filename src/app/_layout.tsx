import { Stack } from 'expo-router'
import { TamaguiProvider } from 'tamagui'

import { tamaguiConfig } from '../../tamagui.config'

// Expo Router のルートレイアウト。Next.js App Router の app/layout.tsx に相当する。
// アプリ全体を TamaguiProvider で包むことで、どの画面からでも Tamagui の設定が使える。
export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <Stack screenOptions={{ headerShown: false }} />
    </TamaguiProvider>
  )
}
