import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector } from "react-redux";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//Components
import UserCard from '../layouts/UserCard';
import RepoCard from '../layouts/RepoCard';

function FavoritesScreen() {

	const safeAreaInsets = useSafeAreaInsets();


	//Redux
	const favorites = useSelector(state => state.favorites.favorites);

	/*
	**	RENDER
	*/

	const renderSearchItem = ({item}) => (item.type === 'User' || item.type === 'Organization' ?
			<UserCard user={item}/>
		:
			<RepoCard repo={item}/>
	)
	
	return (
		<FlatList
			style={[styles.container, {paddingTop: safeAreaInsets.top + 15}]}
			data={favorites}
			renderItem={renderSearchItem}
			keyExtractor={(item, index) => item.id + "-" + index}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F6F6FB',
		paddingBottom: 15
	}
});

export default FavoritesScreen;