const editModeCheck = (state = {edit: false}, action) => {
    switch (action.type) {
        case 'EDIT_MODE':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default editModeCheck;