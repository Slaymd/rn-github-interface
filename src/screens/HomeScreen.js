import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, ScrollView, TouchableOpacity, Text } from 'react-native';

function HomeScreen({navigation, ...props}) {

	//State
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	/*
	**	FUNCTIONS
	*/

	const fetchSearchResults = () => {
		console.log("Fetch search results for", searchText);
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

						{searchResults}

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

							<TouchableOpacity style={styles.applyButton} onPress={this.handleSearch}>
								<Text style={styles.applyButtonText}>Search</Text>
							</TouchableOpacity>

						</View>

						{this.state.list}

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