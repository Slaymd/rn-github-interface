//Imports
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function SearchSectionHeader({title}) {
	return (
		<View style={styles.container}>
			<MaterialCommunityIcons name={title.toLowerCase() === 'users' ? 'account-multiple' : 'source-repository-multiple'} size={18}/>
			<Text style={styles.titleText}>{title}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F6F6FB9F',
		height: 40,
		alignItems: 'center',
		paddingHorizontal: 10,
		flexDirection: 'row'
	},
	titleText: {
		fontFamily: 'Ubuntu_700Bold',
		fontSize: 18,
		paddingLeft: 10
	}
})
