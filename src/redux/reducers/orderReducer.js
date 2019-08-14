import { combineReducers } from 'redux';

/**
 * Order Reducer
 * Contains the current users order
 * @param {array} state has the full orders information
 * @param {object} action full order information
 */
const order = (state = [], action) => {
    switch (action.type) {
        case 'SET_ORDERS':
            return action.payload;
        default:
            return state;
    }
}

/**
 * User Orders Reducer
 * Contains all of the users past orders placed
 * @param {array} state all order specific to the user
 * @param {object} action contains the users id
 */
const userOrders = (state = [], action) => {
    switch (action.type) {
        case 'SET_USERS_ORDERS':
            return action.payload;
        default:
            return state;
    }
}

/**
 * One object that has the users current order and all past orders
 * these will be on the redux state at:
 * state.order.order, state.order.userOrders
 */
export default combineReducers({
    order,
    userOrders,
});