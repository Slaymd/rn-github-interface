import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function Button({text, onClick}) {

  return (
      <View style={styles.test}>
        <TouchableOpacity style={styles.buttonContainer} onPress={onClick}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
    test: {
        backgroundColor: 'red'
    },
	buttonContainer: {
        alignSelf: 'center',
		// backgroundColor: '#0000FF',
		// padding: 10,
	},
	buttonText: {
		// color: '#FFFFFF',
		// fontSize: 16,
		// textAlign: 'center'
	}
});