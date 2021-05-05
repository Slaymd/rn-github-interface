//Imports
import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function UserCard({user}) {

	console.log(user);
	return (
		<View style={styles.container}>
			<Image style={styles.avatar} source={{uri: user.avatar_url}}/>
			<Text>{user.login}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		marginHorizontal: 20,
		paddingVertical: 5,
		paddingHorizontal: 10,
		backgroundColor: 'white',
		borderRadius: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.13,
		shadowRadius: 3.84,
		elevation: 5,
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25
	}
});