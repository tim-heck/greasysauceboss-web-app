/**
 * Edit Mode Reducer
 * Keeps track if the user is in edit mode or not
 * @param {object} state contains one boolean property, edit
 * @param {object} action conatins the payload from the client
 */
const editModeCheck = (state = {edit: false}, action) => {
    switch (action.type) {
        case 'EDIT_MODE':
            return action.payload;
        default:
            return state;
    }
}

/**
 * this will be on the redux state at:
 * state.editMode
 */
export default editModeCheck;