//Imports
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import moment from "moment";
import axios from 'axios';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite } from '../actions/FavoritesActions';

//Components
import UserCard from '../layouts/UserCard';
import IssueCard from '../layouts/IssueCard';

function GetListofIssue(props) {
	const renderIssueItem = ({item}) => (
		<IssueCard issue={item}/>
	)

	return (
			
		<View style={styles.labelContainer}>
			<Text style={styles.labelInfos}>Issues </Text>
			<ScrollView style={styles.containerIssues}>
				<FlatList
				data={props.repoIssues}
				renderItem={renderIssueItem}
				keyExtractor={(item, index) => item.id + "-" + index}
				onEndReachedThreshold={0.5}
				/>
			</ScrollView>
		</View>
	)
}

function RepoScreen({ route }) {

    //Redux
	const dispatch = useDispatch();
	const favorites = useSelector(state => state.favorites.favorites);

	//Values
	const { repo, collab } = route.params;
	const apiUrlCollabs = `https://api.github.com/repos/${repo.owner.login}/${repo.name}/issues`;

	//State
	const [issuesList, setIssuesList] = useState([]);

	const isFavorite = typeof favorites.find(el => el.id === repo.id) === 'object';

    const switchFavorite = () => {
        if (!isFavorite) {
			dispatch(addFavorite(repo));
		} else {
			dispatch(deleteFavorite(repo.id));
		}
    }

	const getAllRepositoryIssues = () => {
		axios.get(apiUrlCollabs).then(res => {
			setIssuesList(res.data);
		}).catch(err => {
			alert("Error: " + err.message);
		})
	}

	useEffect(() => {
		getAllRepositoryIssues();
   	}, []);

	const getCodeIcon = (/*string*/language) => {
		switch(language.toLowerCase()) {
			case 'javascript':
				return 'language-javascript';
			case 'typescript':
				return 'language-javascript';
			case 'html':
				return 'language-html5';
			case 'css':
				return 'language-css3';
			case 'java':
				return 'language-java';
			case 'c':
				return 'language-c';
			case 'c#':
				return 'language-csharp';
			case 'c++':
				return 'language-cpp';
			case 'python':
				return 'language-python';
			case 'php':
				return 'language-php';
			case 'swift':
				return 'language-swift';
			default:
				return 'code-braces'
		}
	}
	
	const renderUserItem = ({item}) => (
			<UserCard user={item}/>
	)
	
	const codeIcon = getCodeIcon(repo.language ?? "");
	const creationDate = moment(new Date(repo.created_at)).format('DD/MM/YYYY');
	return (
		<View>
			<ScrollView style={styles.container}>
				<View style={styles.repoTitleContainer}>
					<Text style={styles.titleRepository}>About this repository</Text>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.labelInfos}>Name</Text>
					<View style={styles.infosContainer}>
						<Text style={styles.infosText}>{repo.name}</Text> 
					<View/>
				</View>
				</View> 
				<View style={styles.labelContainer}>
					<Text style={styles.labelInfos}>Date of creation</Text>
					<View style={styles.infosContainer}>
						<Text style={styles.infosText}>{creationDate}</Text> 
					<View/>
				</View>
				</View> 
				<View style={styles.labelContainer}>
					<Text style={styles.labelInfos}>Created by </Text>
					<View style={styles.infosContainer}>
						<Image style={styles.avatar} source={{uri: repo.owner.avatar_url}}/>
						<Text style={styles.ownerText}>@{repo.owner.login}</Text>
					<View/>
				</View>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.labelInfos}>Description </Text>
					<View style={styles.infosContainer}>
						<Text style={styles.infosText}>{repo.description}</Text>
					<View/>
				</View>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.labelInfos}>Size </Text>
					<View style={styles.infosContainer}>
						<Text style={styles.infosText}>{repo.size}</Text>
					<View/>
				</View>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.labelInfos}>Visibility </Text>
					<View style={styles.infosContainer}>
						{repo.private ? <Text style={styles.infosText}>private</Text> : <Text style={styles.infosText}>public</Text>}
					<View/>
				</View>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.labelInfos}>Fork </Text>
					<View style={styles.infosContainer}>
						{repo.fork ? <Text style={styles.infosText}>Yes</Text> : <Text style={styles.infosText}>No</Text>}
					<View/>
					</View>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.labelInfos}>Technology - Language </Text>
					<View style={styles.infosContainer}>
						<MaterialCommunityIcons name={codeIcon} size={22}/>
						<Text style={styles.techText}>{repo.language}</Text>
					</View>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.labelInfos}>Default branch </Text>
					<View style={styles.infosContainer}>
						<MaterialCommunityIcons style={styles.branchIcon} name="source-branch" size={22}/>
						<Text style={styles.branchText}>{repo.default_branch}</Text>
					</View>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.labelInfos}>Watchers - Stargazers </Text>
					<View style={styles.infosContainer}>
						<MaterialCommunityIcons style={styles.starIcon} name="star-outline" size={22}/>
						<Text style={styles.infosText}>{repo.stargazers_count}</Text>
				</View>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.labelInfos}>Contributors </Text>
					<ScrollView style={styles.containerContributors}>
						<FlatList
						data={collab.data}
						renderItem={renderUserItem}
						keyExtractor={(item, index) => item.id + "-" + index}
						onEndReachedThreshold={0.5}
						/>
					</ScrollView>
				</View>
				<GetListofIssue repoIssues={issuesList}/>
			</ScrollView>
			<TouchableOpacity onPress={switchFavorite}>
				<View style={styles.containerFav}>
					<Text style={styles.textFav}>{isFavorite ? "Remove favorite" : "Add as favorite"}</Text>
					<MaterialCommunityIcons name="star-outline" size={17} color={'#8E8E93'} />
				</View>
			</TouchableOpacity>
		</View>
	)
}

export default RepoScreen;

const styles = StyleSheet.create({
	containerContributors: {
		height : 300,
		marginVertical: 10,
		marginHorizontal: 20,
		borderRadius: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.13,
		shadowRadius: 3.84,
		elevation: 5
	},
	containerIssues: {
		height : 300,
		marginVertical: 10,
		marginHorizontal: 20,
		borderRadius: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.13,
		shadowRadius: 3.84,
		elevation: 5
	},
	container: {
		height : "80%",
		marginVertical: 10,
		marginHorizontal: 20,
		padding: 15,
		backgroundColor: 'white',
		borderRadius: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.13,
		shadowRadius: 3.84,
		elevation: 5
	},
	branchIcon: {
		color: "#021B79",
		paddingRight : 10
	},
	branchText: {
		color: "#021B79",
		fontFamily: 'Ubuntu_500Medium',
		fontSize: 17,
	},
	techText: {
		fontFamily: 'Ubuntu_500Medium',
		fontSize: 17,
		paddingLeft : 10
	},
	repoTitleContainer:{
		justifyContent : "center",
		flexDirection: "row",
		alignItems: "center",
		display :"flex",
		paddingBottom: 25
	},
	titleRepository : {
		color: "#8E8E93",
		fontFamily: 'Ubuntu_500Medium',
		fontSize: 15,
		paddingRight: 10,

	},
	labelInfos : {
		color: "lightgrey",
		fontFamily: 'Ubuntu_500Medium',
		fontSize: 12,
		paddingRight: 10,
	},
	infosText : {
		color: "black",
		fontFamily: 'Ubuntu_500Medium',
		fontSize: 17,
		paddingRight: 10,
	},
	starIcon : {
		color: "black",
		paddingRight : 10
	},
	containerFav: {
		justifyContent : "center",
		flexDirection: "row",
		alignItems: "center",
		display :"flex",
		height : 40,
		marginVertical: 10,
		marginHorizontal: 20,
		padding: 10,
		backgroundColor: 'white',
		borderRadius: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.13,
		shadowRadius: 3.84,
		elevation: 5
	},
	textFav: {
		color: "#8E8E93",
		fontFamily: 'Ubuntu_500Medium',
		fontSize: 15,
		paddingRight: 10,

	},
	labelContainer: {
		flexDirection: 'column',
		paddingBottom: 10,
	},
	starContainer : {
		flexDirection: 'column',
		paddingBottom: 10,
	},
	infosContainer: {
		flexDirection: 'row',
		paddingTop: 8,
		alignItems: "center"
	},
	avatar: {
		width: 30,
		height: 30,
		borderRadius: 6
	},
	ownerText: {
		paddingLeft: 10,
		fontFamily: 'Ubuntu_500Medium',
		fontSize: 17,
		color: 'black'
	},
	repoNameText: {
		fontFamily: 'Ubuntu_700Bold',
		fontSize: 16,
		paddingTop: 5
	},
	repoDescriptionText: {
		fontFamily: 'Ubuntu_500Medium',
		fontSize: 12,
		paddingBottom: 5,
		color: '#8E8E93'
	},
	attributesContainer: {
		flexDirection: 'row'
	},
	starContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	starCountText: {
		fontFamily: 'Ubuntu_500Medium',
		fontSize: 13,
		paddingLeft: 2,
		color: '#8E8E93'
	},
	codeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 10
	},
	codeText: {
		fontFamily: 'Ubuntu_500Medium',
		fontSize: 13,
		paddingLeft: 2
	}
})