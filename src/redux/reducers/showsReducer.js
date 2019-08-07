import { combineReducers } from 'redux';

const showsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_SHOWS':
            return action.payload;
        default:
            return state;
    }
}

const editShowReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_SHOW':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    showsReducer,
    editShowReducer,
});