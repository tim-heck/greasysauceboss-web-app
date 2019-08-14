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

/**
 * Merch Reducer
 * Keeps track of the current products available to the user
 * @param {array} state stores all products
 * @param {object} action products available
 */
const merchReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return action.payload;
        default:
            return state;
    }
}

/**
 * Edit Merch Reducer
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

/**
 * View Merch Reducer
 * Contains the information of a specific product that the user clicked
 * on the generic Merch Page
 * @param {object} state stores the specific products information
 * @param {object} action product to view's id
 */
const viewMerchReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_VIEW_PRODUCT':
            return action.payload;
        default:
            return state;
    }
}

/**
 * One object that has all products, editing information
 * the merch item being viewed individually
 * these will be on the redux state at:
 * state.merch.merchReducer, state.merch.editMerchReducer, state.merch.viewMerchReducer
 */
export default combineReducers({
    merchReducer,
    editMerchReducer,
    viewMerchReducer,
});