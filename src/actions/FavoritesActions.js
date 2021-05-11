import AsyncStorage from '@react-native-async-storage/async-storage';

export const SET_FAVORITES = 'SET_FAVORITES';
const setFavorites = (favorites) => {
    return ({
		type: SET_FAVORITES,
		favorites
	});
};

export const loadFavorites = () => {
	return async dispatch => {
        try {
			const favorites = await AsyncStorage.getItem('favorites');
			let favoritesJSON = !favorites ? [] : JSON.parse(favorites);

			dispatch(setFavorites(favoritesJSON));
		} catch (err) {
			console.error(err.message);
		}
	}
}

export const addFavorite = (favorite) => {
    return async dispatch => {
        try {
			const favorites = await AsyncStorage.getItem('favorites');
			let favoritesJSON = !favorites ? [] : JSON.parse(favorites);


			if (favoritesJSON.find(el => el.id === favorite.id))
				return;
			favoritesJSON.push(favorite);
			dispatch(setFavorites(favoritesJSON));
			await AsyncStorage.setItem('favorites', JSON.stringify(favoritesJSON));
		} catch (err) {
			console.error(err.message);
		}
	}
}

export const deleteFavorite = (id) => {
    return async dispatch => {
        try {
			const favorites = await AsyncStorage.getItem('favorites');
			let favoritesJSON = !favorites ? [] : JSON.parse(favorites);

			const indexToRemove = favoritesJSON.findIndex(el => el.id === id);

			if (indexToRemove < 0)
				return;
			favoritesJSON.splice(indexToRemove, 1);
			dispatch(setFavorites(favoritesJSON));
			await AsyncStorage.setItem('favorites', JSON.stringify(favoritesJSON));
		} catch (err) {
			console.error(err.message);
		}
	}
}