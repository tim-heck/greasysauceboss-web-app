import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { notify } from 'react-notify-toast';

export default function* merchSaga() {
    // yield takeEvery('CREATE_SESSION', createSession);
    // Gets a list of all products
    yield takeEvery('FETCH_PRODUCTS', fetchProducts);
    // Adds new product
    yield takeEvery('ADD_PRODUCT', addProduct);
    // Updates a specific product
    yield takeEvery('UPDATE_PRODUCT', updateProduct);
    // Deletes a specific product
    yield takeEvery('DELETE_PRODUCT', deleteProduct);
    // Views individual product
    yield takeEvery('VIEW_PRODUCT', viewProduct);
    // Hides product from users view
    yield takeEvery('HIDE_PRODUCT', hideProduct);
}

// FOR STRIPE -> STRETCH GOAL
// function* createSession(action) {
//     console.log('in createSession');
//     console.log('create session payload:', action.payload);
//     try {
//         const response = yield axios.post('/api/checkout', action.payload);
//         // console.log(response.data);
//         yield put({ type: 'SET_SESSION', payload: response.data });
//     } catch (err) {
//         console.log('error with creating session', err);
//     }
// }

/**
 * Sends a GET request to /api/merch to get all products
 */
function* fetchProducts() {
    try {
        const response = yield axios.get('/api/merch');
        // Stores all data received in the merch reducer
        yield put({ type: 'SET_PRODUCTS', payload: response.data });
    } catch (err) {
        // Displays a notification if there is an error
        notify.show(`There was an error with getting the products: ${err}`, 'error', 15000);
        console.log('error with getting products', err);
    }
}

/**
 * Sends a POST request to /api/merch to add a new product
 * @param {object} action product to add
 */
function* addProduct(action) {
    try {
        yield axios.post('/api/merch', action.payload);
        // Displays a notification if the POST was successful
        notify.show('The product was successfully added!', 'success');
        // Gets updated list of products
        yield put({ type: 'FETCH_PRODUCTS'});
    } catch (err) {
        // Displays a notification if there is an error
        notify.show(`There was an error with adding the product: ${err}`, 'error', 15000);
        console.log('error with adding products', err);
    }
}

/**
 * Sends a PUT request to /api/merch/:id to update a product
 * with the provided id
 * @param {object} action product to update
 */
function* updateProduct(action) {
    try {
        yield axios.put(`/api/merch/${action.payload.id}`, action.payload);
        // Displays a notification if the PUT was successful
        notify.show('The product was successfully updated!', 'success');
        // Gets updated list of products
        yield put({ type: 'FETCH_PRODUCTS' });
    } catch (err) {
        // Displays a notification if there is an error
        notify.show(`There was an error with updating the product: ${err}`, 'error', 15000);
        console.log('error with updating products', err);
    }
}

/**
 * Sends a DELETE request to /api/merch/:id to delete a product
 * @param {object} action product to be deleted
 */
function* deleteProduct(action) {
    try {
        yield axios.delete(`/api/merch/${action.payload.id}`);
        // Displays a notification if the DELETE was successful
        notify.show('The product was successfully deleted!', 'success');
        // Gets updated list of products
        yield put({ type: 'FETCH_PRODUCTS' });
    } catch (err) {
        // Displays a notification if there is an error
        notify.show(`There was an error with deleting the product: ${err}`, 'error', 15000);
        console.log('error with deleting products', err);
    }
}

/**
 * Sends a GET request to /api/merch/:id
 * @param {object} action products id to be viewed
 */
function* viewProduct(action) {
    try {
        const response = yield axios.get(`/api/merch/${action.payload}`);
        // The payload is response.data[0] since response.data is an array with one
        // object, and that object is the only thing that needs to be sent to the
        // view merch reducer.
        yield put({ type: 'SET_VIEW_PRODUCT', payload: response.data[0] });
    } catch (err) {
        // Displays a notification if there is an error
        notify.show(`This product does not exist: ${err}. Try again later!`, 'error', 15000);
        console.log('error with viewing product', err);
    }
}

/**
 * Sends a PUT request to update the hide propery of the specific product
 * based on the id
 * @param {object} action product to be hidden/displayed
 */
function* hideProduct(action) {
    try {
        yield axios.put(`/api/merch/hide/${action.payload.id}`, action.payload);
        notify.show('The product was successfully updated!', 'success');
        // Gets updated list of products
        yield put({ type: 'FETCH_PRODUCTS' });
    } catch (err) {
        // Displays a notification if there is an error
        notify.show(`There was an error with hiding/unhiding the product: ${err}`, 'error', 15000);
        console.log('error with hiding product', err);
    }
}