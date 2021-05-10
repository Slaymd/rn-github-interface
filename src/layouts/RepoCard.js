//Imports
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';

export default function RepoCard({repo}) {

	//Navigation
	const navigation = useNavigation();

	const onPress = () => {
		navigation.navigate('RepoScreen', {id: repo.id});
	}

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

	const codeIcon = getCodeIcon(repo.language ?? "");

	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.7}>
			<View style={styles.container}>
				<View style={styles.ownerContainer}>
					<Image style={styles.avatar} source={{uri: repo.owner.avatar_url}}/>
					<Text style={styles.ownerText}>{repo.owner.login}</Text>
					<View/>
				</View>
				<Text style={styles.repoNameText}>{repo.name}</Text>
				{repo.description && <Text style={styles.repoDescriptionText}>{repo.description}</Text>}
				<View style={styles.attributesContainer}>
					<View style={styles.starContainer}>
						<MaterialCommunityIcons name="star-outline" size={16} color={"#8E8E93"}/>
						<Text style={styles.starCountText}>{repo.stargazers_count}</Text>
					</View>
					{repo.language && <View style={styles.codeContainer}>
						<MaterialCommunityIcons name={codeIcon} size={16}/>
						<Text style={styles.codeText}>{repo.language}</Text>
					</View>}
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
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
	ownerContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	avatar: {
		width: 16,
		height: 16,
		borderRadius: 25
	},
	ownerText: {
		paddingLeft: 10,
		fontFamily: 'Ubuntu_500Medium',
		fontSize: 12,
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
});