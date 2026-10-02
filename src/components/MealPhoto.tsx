import { Image, YStack, type YStackProps } from 'tamagui'

import type { Meal } from '../types/meal'

type Props = YStackProps & {
  src: NonNullable<Meal['photo']>
}

// 料理の写真を表示する（縦横比は aspectRatio で指定、デフォルト 4:3）。
// <Image aspectRatio> は iOS で効かず元のサイズで表示されてしまうので、
// 枠(YStack)の縦横比を決めて、その中に写真を敷き詰めている。Web でも同じ見た目になる。
export function MealPhoto({ src, ...frameProps }: Props) {
  return (
    <YStack width="100%" aspectRatio={4 / 3} overflow="hidden" bg="$color3" {...frameProps}>
      <Image src={src} width="100%" height="100%" objectFit="cover" />
    </YStack>
  )
}
