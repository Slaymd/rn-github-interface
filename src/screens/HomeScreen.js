//Imports
import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, FlatList, SectionList, TouchableOpacity, Text } from 'react-native';
import axios from 'axios';

//Components
import UserCard from '../layouts/UserCard';

function HomeScreen({navigation, ...props}) {

	//State
	const [searchText, setSearchText] = useState("");
	const [searchUsersResults, setSearchUsersResults] = useState([]);
	const [searchReposResults, setSearchReposResults] = useState([]);

	/*
	**	FUNCTIONS
	*/

	const fetchSearchResults = async () => {
		//TODO: IMPLEMENT FLATLIST AND FETCH PAGES WHEN END REACHED
		console.log("Fetch search results for", searchText);
		Promise.all([axios.get(`https://api.github.com/search/repositories?q=${searchText}`),
		axios.get(`https://api.github.com/search/users?q=${searchText}`)]).then(res => {
			const repositoriesResults = res[0].data.items;
			const usersResults = res[1].data.items;

			setSearchResults([
				{title: 'Users', data: usersResults},
				{title: 'Repositories', data: repositoriesResults}
			]);

			//console.log("Repos: " + repositoriesResults.length);
			//console.log("Users: " + usersResults.length);
		}).catch(err => {
			console.log("Error: " + err.message);
		});
	}

	/*
	**	EVENTS
	*/

	useEffect(() => {
		console.log("Search text", searchText);
	}, [searchText])

	/*
	**	RENDER
	*/

	console.log(searchResults);

	const renderSearchItem = ({item}) => (item.type === 'User' || item.type === 'Organization' ?
			<UserCard user={item}/>
		:
			null
	)

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				style={styles.textInput}
				placeholder="Search user or repository"
				value={searchText}
				onChangeText={setSearchText}
			/>

			<TouchableOpacity style={styles.applyButton} onPress={fetchSearchResults}>
				<Text style={styles.applyButtonText}>Search</Text>
			</TouchableOpacity>
			<SectionList
				sections={searchResults}
				renderItem={renderSearchItem}
				keyExtractor={(item, index) => item.id + index}
				renderSectionHeader={({ section: { title } }) => (
					<Text style={styles.header}>{title}</Text>
				)}
			/>
		</SafeAreaView>
	)

}

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF'
	},
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 10,
		marginBottom: 10
	},
	textInput: {
		borderWidth: 1,
		height: 40,
		width: '65%',
		fontSize: 16,
		padding: 10,
		marginRight: 20
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
	}
})