//Imports
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function IconButton(props) {
	return (
		<TouchableOpacity {...props} style={[styles.container, props.style]} activeOpacity={0.7}>
			<MaterialCommunityIcons name={props.iconName} size={props.iconSize ?? 18} color={props.color ?? 'white'}/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: 40,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.13,
		shadowRadius: 3.84,
		elevation: 4,
		backgroundColor: 'white'
	}
});