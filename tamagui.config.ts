import { defaultConfig } from '@tamagui/config/v5'
import { createTamagui } from 'tamagui'

// Tamagui の「設定」本体。
// 色(テーマ)・余白やサイズ(トークン)・フォント・ブレークポイント(media) が全部ここに入る。
// まずは公式のデフォルト設定をそのまま使う。
export const tamaguiConfig = createTamagui(defaultConfig)

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

// これを書くと <YStack gap="$4"> の "$4" などが TypeScript で補完・型チェックされる
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
