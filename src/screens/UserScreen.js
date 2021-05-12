//Imports
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite } from '../actions/FavoritesActions';

//Components
import UserCard from '../layouts/UserCard';
import RepoCard from '../layouts/RepoCard';

function UserScreen({ route }) {

    //Redux
	const dispatch = useDispatch();
	const favorites = useSelector(state => state.favorites.favorites);

    //State
    const user = route.params;
    const [repos, setRepos] = useState([]);
    const [followers, setFollowers] = useState([]);

    const isFavorite = typeof favorites.find(el => el.id === user.userData.id) === 'object';

    const switchFavorite = () => {
        if (!isFavorite) {
			dispatch(addFavorite(user.userData));
		} else {
			dispatch(deleteFavorite(user.userData.id));
		}
    }

    const fetchResult = () => {
        axios.get(user.userData.followers_url).then(res => {
            setFollowers(res.data)
        }).catch(err => {
            console.log("Error : ", err);
        })

        axios.get(user.userData.repos_url).then(res => {
            setRepos(res.data)
        }).catch(err => {
            console.log("Error : ", err);
        })
    }

    useEffect(() => {
        fetchResult();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.userInfos}>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <Image
                            style={styles.logo}
                            source={{
                                uri: user.userData.avatar_url,
                            }}
                        />
                        <View style={{ marginLeft: 20 }}>
                            <Text style={[styles.userName, { marginTop: 15, marginBottom: 15}]}>{user.userData.login}</Text>
                            <Text>Type : {user.userData.type}</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={switchFavorite}>
                        <View style={styles.containerFav}>
                            <Text style={styles.textFav}>{isFavorite ? "Remove favorite" : "Add as favorite"}</Text>
                            <MaterialCommunityIcons name="star-outline" size={17} color={'#8E8E93'} />
                        </View>
                    </TouchableOpacity>
                </View>

                <Text style={styles.text}>Repos : </Text>

                <FlatList
                    data={repos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <RepoCard repo={item} />}
                />

                <Text style={styles.text}>Followers :</Text>

                <FlatList
                    data={followers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <UserCard user={item} />}
                />
            </ScrollView>
        </View>
    );
}

export default UserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    userInfos: {
        paddingHorizontal: 30,
        marginTop: 15,
        marginBottom: 10,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    text: {
        fontSize: 24,
        borderColor: '#000000',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    containerFav: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        display: 'flex',
        marginVertical: 25,
        height: 40,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.13,
        shadowRadius: 3.84,
        elevation: 5
    },
    textFav: {
        color: '#8E8E93',
		fontFamily: 'Ubuntu_500Medium',
        fontSize: 15,
        paddingRight: 10
    }
})