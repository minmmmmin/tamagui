import { defaultConfig } from '@tamagui/config/v5'
import { Platform } from 'react-native'
import { createFont, createTamagui, getVariableValue, type GenericFont } from 'tamagui'

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

// v5 のデフォルトは、iOS / Android の文字サイズを iOS の標準(本文 17pt)に合わせていて Web(15px)より大きい。
// モバイルだけ少し小さくするため、サイズと行間を一律この倍率にする。Web は 1（そのまま）。
const FONT_SCALE = Platform.OS === 'web' ? 1 : 0.9

function scaleFont<F extends GenericFont>(font: F, scale: number): F {
  if (scale === 1) return font
  const scaleMap = (map: object = {}) =>
    Object.fromEntries(
      Object.entries(map).map(([key, value]) => [key, Math.round(getVariableValue(value) * scale)]),
    )
  return { ...font, size: scaleMap(font.size), lineHeight: scaleMap(font.lineHeight) }
}

// family と face を Yusei Magic に、サイズと行間はデフォルトに FONT_SCALE をかけたもの
const fonts = {
  body: createFont(
    scaleFont({ ...defaultConfig.fonts.body, family: YUSEI_MAGIC, face }, FONT_SCALE),
  ),
  heading: createFont(
    scaleFont({ ...defaultConfig.fonts.heading, family: YUSEI_MAGIC, face }, FONT_SCALE),
  ),
}

export const tamaguiConfig = createTamagui({ ...defaultConfig, fonts })

export default tamaguiConfig

export type Conf = typeof tamaguiConfig

// これを書くと <YStack gap="$4"> の "$4" などが TypeScript で補完・型チェックされる
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
