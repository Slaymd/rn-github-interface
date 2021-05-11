//Imports
import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, FlatList, RefreshControl, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//Redux
import { useDispatch } from 'react-redux';
import { loadFavorites } from '../actions/FavoritesActions';

//Components
import UserCard from '../layouts/UserCard';
import RepoCard from '../layouts/RepoCard';
import IconButton from '../layouts/IconButton';

function HomeScreen({navigation, ...props}) {

	const safeAreaInsets = useSafeAreaInsets();

	//Redux
    const dispatch = useDispatch();

	//State
	const [searchMode, setSearchMode] = useState('users');
	const [searchText, setSearchText] = useState("");
	const [userResults, setUsersResults] = useState([]);
	const [repoResults, setRepoResults] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	/*
	**	FUNCTIONS
	*/

	const fetchSearchResults = () => {
		if (!searchText || searchText.length === 0 || isLoading)
			return;
		const apiUrl = `https://api.github.com/search/${searchMode}?q=${searchText}&page=${currentPage}&per_page=10`

		setIsLoading(true);
		axios.get(apiUrl).then(res => {
			if (searchMode === 'users')
				setUsersResults(currentPage > 1 ? [...userResults, ...res.data.items] : res.data.items);
			else if (searchMode === 'repositories')
				setRepoResults(currentPage > 1 ? [...repoResults, ...res.data.items] : res.data.items);
			setIsLoading(false);
			setErrorMessage(null);
		}).catch(err => {
			setErrorMessage("An error occured ! Please try again later.");
			setIsLoading(false);
		})
	}

	const onSearchButtonPressed = () => {
		if (isLoading)
			return;
		setUsersResults([]);
		setRepoResults([]);
		setCurrentPage(1)
		setTimeout(() => {
			fetchSearchResults();
		}, 100)
	}

	const onSwitchButtonPressed = () => {
		setSearchMode(searchMode === 'users' ? 'repositories' : 'users');
	}

	/*
	**	EVENTS
	*/

	useEffect(() => {
		dispatch(loadFavorites());
	}, []);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchText]);

	useEffect(() => {
		setUsersResults([]);
		setRepoResults([]);
		fetchSearchResults();
		setCurrentPage(1);
	}, [searchMode]);

	useEffect(() => {
		if (currentPage > 1)
			fetchSearchResults();
	}, [currentPage]);

	/*
	**	RENDER
	*/

	const renderSearchItem = ({item}) => (item.type === 'User' || item.type === 'Organization' ?
			<UserCard user={item}/>
		:
			<RepoCard repo={item}/>
	)

	return (
		<View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
			<View style={styles.searchFieldContainer}>
				<TextInput
					style={styles.textInput}
					placeholder={searchMode === 'users' ? 'Search user' : 'Search repository'}
					value={searchText}
					onChangeText={setSearchText}
					onEndEditing={onSearchButtonPressed}
					returnKeyType="search"
				/>
				<IconButton
					style={{backgroundColor: searchMode !== 'users' ? '#3c40c6' : '#9b59b6'}}
					iconName={searchMode !== 'users' ? 'account' : 'source-repository-multiple'}
					onPress={onSwitchButtonPressed}
				/>
			</View>
			{errorMessage && <View style={styles.alertContainer}>
				<MaterialCommunityIcons name="alert" size={16} color="white"/>
				<Text style={styles.alertText}>{errorMessage}</Text>
			</View>}
			<FlatList
				data={searchMode === 'users' ? userResults : repoResults}
				renderItem={renderSearchItem}
				keyExtractor={(item, index) => item.id + "-" + index}
				refreshControl={
					<RefreshControl
					  refreshing={isLoading}
					  onRefresh={onSearchButtonPressed}
					/>
				}
				onEndReachedThreshold={0.5}
				onEndReached={() => {
					if ((searchMode === 'users' && userResults.length >= 10) || (searchMode === 'repositories' && repoResults.length >= 10) && !isLoading)
						setCurrentPage(currentPage + 1)
				}}
			/>
		</View>
	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F6F6FB'
	},
	searchFieldContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10
	},
	textInput: {
		flex: 1,
		marginVertical: 10,
		marginHorizontal: 10,
		backgroundColor: 'white',
		fontSize: 16,
		height: 40,
		paddingHorizontal: 15,
		fontFamily: 'Ubuntu_500Medium',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.13,
		shadowRadius: 3.84,
		elevation: 4,
		borderRadius: 20,
	},
	applyButton: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0000FF',
		padding: 10,
	},
	applyButtonText: {
		color: '#FFFFFF',
		fontSize: 16,
		textAlign: 'center'
	},
	alertContainer: {
		height: 40,
		marginTop: 20,
		marginHorizontal: 20,
		borderRadius: 5,
		backgroundColor: '#e74c3c',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.13,
		shadowRadius: 3.84,
		elevation: 4,
		alignItems: 'center',
		paddingHorizontal: 10,
		flexDirection: 'row'
	},
	alertText: {
		color: 'white',
		fontFamily: 'Ubuntu_700Bold',
		fontSize: 14,
		paddingLeft: 5
	}
});

export default HomeScreen;