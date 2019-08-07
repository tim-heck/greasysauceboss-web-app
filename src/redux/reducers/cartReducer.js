const cart = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return action.payload;
        case 'CLEAR_CART':
            // console.log('clear cart:', action.payload);
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default cart;