import { combineReducers } from 'redux';

const order = (state = [], action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return action.payload;
        default:
            return state;
    }
}

const specificOrder = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER_ORDERs':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    order,
});