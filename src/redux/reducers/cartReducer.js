const cart = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            state = [
                ...state,
                action.payload
            ];
            return state;
        case 'REMOVE_ITEM':
            console.log(state.indexOf(action.payload))
            state = state.slice(state.indexOf(action.payload));
            console.log(state);
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