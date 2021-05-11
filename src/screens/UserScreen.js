import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, ScrollView } from 'react-native';

import UserCard from '../layouts/UserCard';
import RepoCard from '../layouts/RepoCard';

function UserScreen({ navigation, ...props }) {

    const [user, setUser] = useState({
        "avatar_url": "https://avatars.githubusercontent.com/u/1348035?v=4",
        "events_url": "https://api.github.com/users/Slaymd/events{/privacy}",
        "followers_url": "https://api.github.com/users/Slaymd/followers",
        "following_url": "https://api.github.com/users/Slaymd/following{/other_user}",
        "gists_url": "https://api.github.com/users/Slaymd/gists{/gist_id}",
        "gravatar_id": "",
        "html_url": "https://github.com/Slaymd",
        "id": 1348035,
        "login": "Slaymd",
        "node_id": "MDQ6VXNlcjEzNDgwMzU=",
        "organizations_url": "https://api.github.com/users/Slaymd/orgs",
        "received_events_url": "https://api.github.com/users/Slaymd/received_events",
        "repos_url": "https://api.github.com/users/Slaymd/repos",
        "score": 1,
        "site_admin": false,
        "starred_url": "https://api.github.com/users/Slaymd/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/Slaymd/subscriptions",
        "type": "User",
        "url": "https://api.github.com/users/Slaymd",
    });
    const [repos, setRepos] = useState([]);
    const [followers, setFollowers] = useState([]);

    const fetchResult = () => {
        axios.get(user.repos_url).then(res => {
            setRepos(res.data)
        }).catch(err => {
            console.log("Error : ", err);
        })

        axios.get(user.followers_url).then(res => {
            setFollowers(res.data)
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
                                uri: 'https://avatars.githubusercontent.com/u/1348035?v=4',
                            }}
                        />
                        <View style={{ marginLeft: 15 }}>
                            <Text style={[styles.name, { marginTop: 15, marginBottom: 15}]}>{user.login}</Text>
                            <Text>Type : {user.type}</Text>
                        </View>
                    </View>
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
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})