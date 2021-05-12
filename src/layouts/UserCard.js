//Imports
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite } from '../actions/FavoritesActions';

export default function UserCard({user}) {

	//Redux
	const dispatch = useDispatch();
	const favorites = useSelector(state => state.favorites.favorites);
	const isFavorite = typeof favorites.find(el => el.id === user.id) === 'object';

	//Navigation
	const navigation = useNavigation();

	const onPress = () => {
		try {
			navigation.push('Users', {userData: user});
		} catch (e) {
			navigation.navigate('Users', {userData: user});
		}
	}

	const onLongPress = () => {
		if (!isFavorite) {
			alert("Added to favorites");
			dispatch(addFavorite(user));
		} else {
			alert("Removed from favorites");
			dispatch(deleteFavorite(user.id));
		}
	}

	return (
		<TouchableOpacity onPress={onPress} onLongPress={onLongPress} activeOpacity={0.7}>
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