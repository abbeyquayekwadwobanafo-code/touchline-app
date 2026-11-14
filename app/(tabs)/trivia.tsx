import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/theme';

export default function TriviaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>TRIVIA — COMING NEXT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  text: { color: COLORS.textSecondary, fontWeight: '800', letterSpacing: 1 },
});
