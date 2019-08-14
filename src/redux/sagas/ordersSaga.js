import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { notify } from 'react-notify-toast';

export default function* ordersSaga() {
    // Gets a list of all orders
    yield takeEvery('FETCH_ORDERS', fetchOrders);
    // Gets a list of all orders made by the user
    yield takeEvery('FETCH_USERS_ORDERS', fetchUsersOrder);
    // Adds a new order
    yield takeEvery('ADD_ORDER', addOrder);
}

/**
 * Sends get request to /api/orders to get all orders
 */
function* fetchOrders() {
    try {
        const response = yield axios.get(`/api/orders`);
        // Stores all data received in the order reducer
        yield put({ type: 'SET_ORDERS', payload: response.data });
    } catch (err) {
        // Displays a notification if there is an error
        notify.show(`There was an error with getting the orders: ${err}`, 'error', 15000);
        console.log('error with getting orders', err);
    }
}

/**
 * Sends get request to /api/orders/:id to get all the users orders
 * based on the id sent
 */
function* fetchUsersOrder(action) {
    try {
        const response = yield axios.get(`/api/orders/${action.payload.id}`);
        // Stores all data received in the user order reducer
        yield put({ type: 'SET_USERS_ORDERS', payload: response.data });
    } catch (err) {
        // Displays a notification if there is an error
        notify.show(`There was an error with getting your orders: ${err}`, 'error', 15000);
        console.log('error with getting specific order', err);
    }
}

/**
 * Sends post request to /api/orders to add a new order
 */
function* addOrder(action) {
    try {
        yield axios.post('/api/orders', action.payload);
        // Displays a notification if the POST was successful
        notify.show('The order was successfully added!', 'success');
        // Gets updated list of orders
        yield put({ type: 'FETCH_ORDERS'});
    } catch (err) {
        // Displays a notification if there is an error
        notify.show(`There was an error with adding the order: ${err}`, 'error', 15000);
        console.log('error with adding orders', err);
    }
}