import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import merch from './merchReducer';
import shows from './showsReducer';
import editMode from './editModeReducer';
import cart from './cartReducer';
import order from './orderReducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  merch, // has all products, editing information the merch item being viewed individually
  shows, 
  editMode, // will have a boolean value to show if the admin is in edit mode or not
  cart, // will have the users cart
  order, // will have the users order
});

export default rootReducer;
