//Imports
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UserCard({user}) {

	//Navigation
	const navigation = useNavigation();

	const onPress = () => {
		navigation.navigate('UserScreen', {userData: user});
	}

	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.7}>
			<View style={styles.container}>
				<Image style={styles.avatar} source={{uri: user.avatar_url}}/>
				<Text style={styles.text}>{user.login}</Text>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		marginHorizontal: 20,
		height: 60,
		paddingHorizontal: 5,
		backgroundColor: 'white',
		borderRadius: 30,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.13,
		shadowRadius: 3.84,
		elevation: 5,
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25
	},
	text: {
		paddingLeft: 10,
		fontFamily: 'Ubuntu_700Bold',
		fontSize: 18,
		
	}
});