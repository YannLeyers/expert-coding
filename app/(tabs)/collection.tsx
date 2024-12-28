import { StyleSheet, ScrollView, View, Text } from 'react-native';

export default function collection() {
  return (
    <ScrollView>
      <View style={styles.shapeContainer}>
        <Text>Random Shape 1</Text>
        <Text>Random Shape 2</Text>
        <Text>Random Shape 3</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shapeContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 16,
    backgroundColor: '#FFFBE5',
  },
});
