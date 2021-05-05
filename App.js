//Imports
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts, Ubuntu_500Medium, Ubuntu_700Bold } from '@expo-google-fonts/ubuntu';

//Screens
import HomeScreen from './src/screens/HomeScreen';
import FavoriteScreen from './src/screens/FavoritesScreen';
import ProfileScreen from './src/screens/ProfileScreen';

//Redux
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import reducers from './src/reducers/Reducer';

//Navigator
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();

//Store
let middlewares = [ReduxThunk];
const store = createStore(reducers, applyMiddleware(...middlewares));

export default function App() {

  let [fontsLoaded] = useFonts({
    Ubuntu_500Medium, Ubuntu_700Bold
  });

  if (!fontsLoaded)
    return <AppLoading/>

  return (
    <>
      <StoreProvider store={store}>
        <StatusBar/>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>
    </>
  );
}