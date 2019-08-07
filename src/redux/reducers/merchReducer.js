import { combineReducers } from 'redux';

// FOR STRIPE -> STRETCH GOAL
// const checkoutSession = (state = [], action) => {
//     switch (action.type) {
//         case 'SET_SESSION':
//             return action.payload;
//         default:
//             return state;
//     }
// }

const merchReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return action.payload;
        default:
            return state;
    }
}

/**
 * Reducer that keeps track of the currect product that is being updated
 * Information is stored when the user clicks the edit button
 * @param {object} state where that product's information will be stored and accessible
 * @param {object} action specific products information that is being updated
 */
const editMerchReducer = (state = {}, action) => {
    switch (action.type) {
        case 'EDIT_PRODUCT':
            return action.payload;
        default:
            return state;
    }
}

const viewMerchReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_VIEW_PRODUCT':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    merchReducer,
    editMerchReducer,
    viewMerchReducer,
});