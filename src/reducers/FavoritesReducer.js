import { SET_FAVORITES } from "../actions/FavoritesActions";

const INITIAL_STATE = {
	favorites: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_FAVORITES:
            delete action.type;
            return {...state, ...action};
        default:
            return state;
    }
};