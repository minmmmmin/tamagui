import { Stack } from 'expo-router'

// Expo Router のルートレイアウト。Next.js App Router の app/layout.tsx に相当する。
export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />
}
