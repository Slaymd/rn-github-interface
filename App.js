//Imports
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';
import { MaterialCommunityIcons } from '@expo/vector-icons'

//Screens
import HomeScreen from './src/screens/HomeScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ProfileScreen from './src/screens/ProfileScreen';

//Redux
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import reducers from './src/reducers/Reducer';

//Navigator
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//Store
let middlewares = [ReduxThunk];
const store = createStore(reducers, applyMiddleware(...middlewares));

function SearchStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Search" component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default function App() {

  //Fonts
  let [fontsLoaded] = useFonts({
    Ubuntu_500Medium, Ubuntu_700Bold
  });

  return (fontsLoaded &&
    <StoreProvider store={store}>
      <StatusBar/>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Search" component={SearchStackNavigator} options={{tabBarIcon: ({focused, color, size}) => <MaterialCommunityIcons name={"magnify"} size={size} color={color}/>}} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} options={{tabBarIcon: ({focused, color, size}) => <MaterialCommunityIcons name={"star"} size={size} color={color}/>}} />
        </Tab.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}