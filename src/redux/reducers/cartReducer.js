/**
 * Cart Reducer
 * Handles adding and removing items from the cart, clearing the
 * entire cart, and increasing or descreasing the quantity of items
 * in the cart.
 * 
 * @param {array} state keeps track of the current cart state
 * @param {object} action conatins the payload from the client
 */
const cart = (state = [], action) => {
    switch (action.type) {
        /**
         * ADDING TO THE CART
         * First checks if the item aleady exists in the cart, if it does
         * the quantity is incremented by 1, otherwise the item is added to
         * the cart with a quantity of 1.
         */
        case 'ADD_TO_CART':
            let product = action.payload;
            let productIndex = null;
            for (let i = 0; i < state.length; i++) {
                if (state[i].id === action.payload.id) {
                    productIndex = i;
                    break;
                }
            }
            if (productIndex === null) {
                product.quantity = 1;
                state = [
                    ...state,
                    product
                ];
            } else {
                product = state[productIndex];
                let oldQuantity = product.quantity;
                product.quantity = ++oldQuantity;
            }
            return state;
        case 'REMOVE_ITEM':
            let itemIndex = state.indexOf(action.payload);
            let objectToRemove = state.splice(itemIndex, 1);
            let newCart = [];
            for (let i = 0; i < state.length; i++){
                if (state[i] !== objectToRemove) {
                    newCart.push(state[i]);
                }
            }
            return newCart; 
        case 'CLEAR_CART':
            // console.log('clear cart:', action.payload);
            state = action.payload;
            return state;
        case 'DECREMENT_QUANTITY':
            let minusQuantity = [];
            for (let i = 0; i < state.length; i++) {
                minusQuantity.push(state[i]);
                if (state[i].id === action.payload.id) {
                    if (minusQuantity[i].quantity < 2) {
                        minusQuantity[i].quantity = 1;
                    } else {
                        minusQuantity[i].quantity -= 1;
                    }
                }
            }
            return minusQuantity;
        case 'INCREMENT_QUANTITY':
            let plusQuantity = [];
            for (let i = 0; i < state.length; i++) {
                plusQuantity.push(state[i]);
                if (state[i].id === action.payload.id) {
                    plusQuantity[i].quantity += 1;
                }
            }
            return plusQuantity;
        default:
            return state;
    }
}

/**
 * this will be on the redux state at:
 * state.cart
 */
export default cart;