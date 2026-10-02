import { StyleSheet, Text, View } from 'react-native'

// "/" に対応する画面。Next.js の app/page.tsx に相当する。
// まだ Tamagui は使わず、素の React Native の部品(View / Text)と StyleSheet で書いている。
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>今日のお料理</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
})
