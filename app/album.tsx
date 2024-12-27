import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function Album({ setShowAlbum }) {
    return (
        <View style={styles.container}>
            <Text>Album Page</Text>
            <Button title="Go Back" onPress={() => setShowAlbum(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFBE5',
    },
});