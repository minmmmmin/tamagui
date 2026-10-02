import { defaultConfig } from '@tamagui/config/v5'
import { createFont, createTamagui } from 'tamagui'

// Tamagui の「設定」本体。
// 色(テーマ)・余白やサイズ(トークン)・フォント・ブレークポイント(media) が全部ここに入る。
// 公式のデフォルト設定をベースに、フォントだけ差し替えている。

// useFonts() で読み込むときの名前と同じにする（src/app/_layout.tsx）
const YUSEI_MAGIC = 'YuseiMagic_400Regular'

// Yusei Magic は太さが 400 の1種類しかない。
// face で「どの太さを指定されても同じフォントファイルを使う」と教えておく（主に iOS / Android 用）
const face = {
  400: { normal: YUSEI_MAGIC },
  600: { normal: YUSEI_MAGIC },
  700: { normal: YUSEI_MAGIC },
  800: { normal: YUSEI_MAGIC },
}

// サイズや行間はデフォルトのまま、family と face だけ上書きする
const fonts = {
  body: createFont({ ...defaultConfig.fonts.body, family: YUSEI_MAGIC, face }),
  heading: createFont({ ...defaultConfig.fonts.heading, family: YUSEI_MAGIC, face }),
}

export const tamaguiConfig = createTamagui({ ...defaultConfig, fonts })

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

// これを書くと <YStack gap="$4"> の "$4" などが TypeScript で補完・型チェックされる
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
