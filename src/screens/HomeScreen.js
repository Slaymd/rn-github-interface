//Imports
import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { StyleSheet, TextInput, View, ScrollView, TouchableOpacity, Text, FlatList } from 'react-native';
import axios from 'axios';

function HomeScreen({navigation, ...props}) {

	//State
	const [searchText, setSearchText] = useState("");
	const [searchUsersResults, setSearchUsersResults] = useState([]);
	const [searchReposResults, setSearchReposResults] = useState([]);

	/*
	**	FUNCTIONS
	*/

	const fetchSearchResults = async () => {
		console.log("Fetch search results for", searchText);
		Promise.all([axios.get(`https://api.github.com/search/repositories?q=${searchText}`),
		axios.get(`https://api.github.com/search/users?q=${searchText}`)]).then(res => {
			const repositoriesResults = res[0].data.items;
			const usersResults = res[1].data.items;

			console.log("Repos: " + repositoriesResults.length);
			console.log(repositoriesResults);
			console.log("Users: " + usersResults.length);
			setSearchUsersResults(usersResults);
			setSearchReposResults(repositoriesResults);
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

	return (
		<View style={styles.container}>
				<View>
					<ScrollView>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.textInput}
								placeholder="Search user or repository"
								value={searchText}
								onChangeText={setSearchText}
							/>

							<TouchableOpacity style={styles.applyButton} onPress={fetchSearchResults}>
								<Text style={styles.applyButtonText}>Search</Text>
							</TouchableOpacity>

						</View>

						<FlatList
							data={searchUsersResults}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({item}) => <Text>{item.login}</Text>}
						/>
						<FlatList
							data={searchReposResults}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({item}) => <Text>{item.full_name}</Text>}
						/>

					</ScrollView>
				</View>
			</View>
	)

}

export default HomeScreen;

export class HomeScreenClass extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			search: '',
			list: []
		}

		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearchChange(search) {
		this.setState({ search });
	}

	handleSearch() {
		console.log(this.state.search);
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<ScrollView>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.textInput}
								placeholder="Search user or repository"
								value={this.state.search}
								onChangeText={this.handleSearchChange}
							/>
							<Button onClick={this.handleSearch} text={'coucou'}/>
						</View>
						<View style={{backgroundColor: 'red', flexDirection: 'row', marginBottom: 3}}>
							<Text>coucou</Text>
						</View>
						{this.state.list}
						<Button onClick={this.handleSearch} text={'Découvrir plus'}/>

					</ScrollView>
				</View>
			</View>
		);
	}
}

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