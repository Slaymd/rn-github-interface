//Imports
import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';


function IssueScreen({route, navigation}) {
	const { issue } = route.params;
	
	// const creationDate = moment(new Date(repo.created_at)).format('DD/MM/YYYY');
	return (
		<View>
			<ScrollView style={styles.container}>
				<View style={styles.repoTitleContainer}>
					<Text style={styles.titleRepository}>About this issue</Text>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.labelInfos}>Title</Text>
					<View style={styles.infosContainer}>
						<Text style={styles.infosText}>{issue.title}</Text> 
					<View/>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.labelInfos}>State</Text>
					<View style={styles.infosContainer}>
						<Text style={styles.infosText}>{issue.state}</Text> 
					<View/>
				</View>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.labelInfos}>Body Message</Text>
					<View style={styles.infosContainer}>
						<Text style={styles.infosText}>{issue.body}</Text> 
					<View/>
				</View>
				</View>
				<View style={styles.labelContainer}>
					<Text style={styles.labelInfos}>Created by </Text>
					<View style={styles.infosContainer}>
						<Image style={styles.avatar} source={{uri: issue.user.avatar_url}}/>
						<Text style={styles.ownerText}>@{issue.user.login}</Text>
					<View/>
				</View>
				</View>
		</View> 
			</ScrollView>
		</View>
	)
}

export default IssueScreen;

const styles = StyleSheet.create({

	container: {
		height : "90%",
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
		height : "10%",
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