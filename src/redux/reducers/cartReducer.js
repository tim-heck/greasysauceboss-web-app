const cart = (state = [], action) => {
    switch (action.type) {
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
            // console.log(state.indexOf(action.payload))
            // state = state.slice(state.indexOf(action.payload));
            // console.log(state);
            // return state;
        case 'CLEAR_CART':
            // console.log('clear cart:', action.payload);
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default cart;