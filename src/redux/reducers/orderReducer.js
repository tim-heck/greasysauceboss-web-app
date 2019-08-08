const order = (state = {total_price_pennies: 0}, action) => {
    switch (action.type) {
        case 'COMPLETE_ORDER':
            state.total_price_pennies = action.payload;
            console.log(action.payload)
            console.log(state.total_price_pennies)
            return state;
        default:
            return state;
    }
}

export default order;