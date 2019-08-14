import { combineReducers } from 'redux';

/**
 * Shows Reducer
 * Keeps track of all future shows
 * @param {array} state contains all future shows
 * @param {object} action future shows
 */
const showsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SHOWS':
            return action.payload;
        default:
            return state;
    }
}

/**
 * Reducer that keeps track of the currect show that is being updated
 * Information is stored when the user clicks the edit button
 * @param {object} state where that show's information will be stored and accessible
 * @param {object} action specific shows information that is being updated
 */
const editShowReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_SHOW':
            return action.payload;
        default:
            return state;
    }
}

/**
 * One object that has all future shows for the band
 * these will be on the redux state at:
 * state.shows.showsReducer, state.shows.editShowReducer
 */
export default combineReducers({
    showsReducer,
    editShowReducer,
});