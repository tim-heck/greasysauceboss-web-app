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

export default merchReducer;