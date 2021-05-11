//Imports
import { combineReducers } from 'redux';

//Reducers
import FavoritesReducer from './FavoritesReducer';

export default combineReducers({
	favorites: FavoritesReducer
});