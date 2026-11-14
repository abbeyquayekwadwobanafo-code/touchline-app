import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>PROFILE — COMING NEXT</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center', alignItems: 'center' },
  text: { color: COLORS.textSecondary, fontWeight: '800', letterSpacing: 1 },
});
