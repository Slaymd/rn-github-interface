import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const DATA = [
	{
		name : 'Marco',
		type : 'Repository'
	},
	{
		name : 'Darius',
		type : 'User'
	},
	{
		name : 'Camille',
		type : 'Repository'
	},
	{
		name : 'François',
		type : 'Repository'
	},
	{
		name : 'Marco',
		type : 'Repository'
	},
	{
		name : 'Darius',
		type : 'User'
	},
	{
		name : 'Camille',
		type : 'Repository'
	},
	{
		name : 'François',
		type : 'Repository'
	},
	{
		name : 'Marco',
		type : 'Repository'
	},
	{
		name : 'Darius',
		type : 'User'
	},
	{
		name : 'Camille',
		type : 'Repository'
	},
	{
		name : 'François',
		type : 'Repository'
	},


  ];


const Favorite = ({ type, name }) => (
	<View style={styles.item}>
		<Text >Type : {type}</Text>
		<Text >Name : {name}</Text>
	</View>
);

function FavoriteScreen() {
	const renderItem = ({ item }) => (
		<Favorite name={item.name} type={item.type}/>
	);
	
	return (
		<SafeAreaView style={styles.container}>
			<FlatList
			data={DATA}
			renderItem={renderItem}
			keyExtractor={item => item.name}
			/>
	  	</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  marginTop: StatusBar.currentHeight || 0,
	},
	item: {
	  backgroundColor: '#f9c2ff',
	  padding: 20,
	  marginVertical: 8,
	  marginHorizontal: 16,
	},
	title: {
	  fontSize: 32,
	},
  });

export default FavoriteScreen;