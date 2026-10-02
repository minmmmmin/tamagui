import { YuseiMagic_400Regular, useFonts } from '@expo-google-fonts/yusei-magic'
import { Stack } from 'expo-router'
import { TamaguiProvider } from 'tamagui'

import { tamaguiConfig } from '../../tamagui.config'

// Expo Router のルートレイアウト。Next.js App Router の app/layout.tsx に相当する。
// アプリ全体を TamaguiProvider で包むことで、どの画面からでも Tamagui の設定が使える。
export default function RootLayout() {
  // フォントファイルを読み込む。キー名が tamagui.config.ts の family と対応する
  const [fontsLoaded] = useFonts({ YuseiMagic_400Regular })

  // 読み込み前に描画すると一瞬だけ標準フォントで表示されてしまうので待つ
  if (!fontsLoaded) return null

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <Stack screenOptions={{ headerShown: false }} />
    </TamaguiProvider>
  )
}
