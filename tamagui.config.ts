import { defaultConfig } from '@tamagui/config/v5'
import { Platform } from 'react-native'
import { createFont, createTamagui, getVariableValue, type GenericFont } from 'tamagui'

// Tamagui の「設定」本体。
// 色(テーマ)・余白やサイズ(トークン)・フォント・ブレークポイント(media) が全部ここに入る。
// 公式のデフォルト設定をベースに、フォントだけ差し替えている。

// 読み込んであるフォント。名前は useFonts() のキーと同じにする（src/app/_layout.tsx）
const YUSEI_MAGIC = 'YuseiMagic_400Regular'
const DOTGOTHIC = 'DotGothic16_400Regular'

const FONT = DOTGOTHIC

// どちらのフォントも太さが 400 の1種類しかない。
// face で「どの太さを指定されても同じフォントファイルを使う」と教えておく（主に iOS / Android 用）
const face = {
  400: { normal: FONT },
  600: { normal: FONT },
  700: { normal: FONT },
  800: { normal: FONT },
}

const FONT_SCALE = Platform.OS === 'web' ? 1 : 0.9

function scaleFont<F extends GenericFont>(font: F, scale: number): F {
  if (scale === 1) return font
  const scaleMap = (map: object = {}) =>
    Object.fromEntries(
      Object.entries(map).map(([key, value]) => [key, Math.round(getVariableValue(value) * scale)]),
    )
  return { ...font, size: scaleMap(font.size), lineHeight: scaleMap(font.lineHeight) }
}

// family と face を FONT に、サイズと行間はデフォルトに FONT_SCALE をかけたもの
const fonts = {
  body: createFont(
    scaleFont({ ...defaultConfig.fonts.body, family: FONT, face }, FONT_SCALE),
  ),
  heading: createFont(
    scaleFont({ ...defaultConfig.fonts.heading, family: FONT, face }, FONT_SCALE),
  ),
}

export const tamaguiConfig = createTamagui({ ...defaultConfig, fonts })

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

// これを書くと <YStack gap="$4"> の "$4" などが TypeScript で補完・型チェックされる
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
