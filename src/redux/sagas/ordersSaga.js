import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* ordersSaga() {
    yield takeEvery('FETCH_ORDERS', fetchOrders);
    yield takeEvery('FETCH_USERS_ORDERS', fetchUsersOrder);
    yield takeEvery('ADD_ORDER', addOrder);
    // yield takeEvery('ADD_CART', addCart);
}

function* fetchOrders() {
    console.log('in fetchOrders');
    try {
        const response = yield axios.get(`/api/orders`);
        yield put({ type: 'SET_ORDERS', payload: response.data });
    } catch (err) {
        console.log('error with getting orders', err);
    }
}

function* fetchUsersOrder(action) {
    console.log('in fetchUsersOrders');
    try {
        const response = yield axios.get(`/api/orders/${action.payload.id}`);
        yield put({ type: 'SET_USERS_ORDERS', payload: response.data });
    } catch (err) {
        console.log('error with getting specific order', err);
    }
}

function* addOrder(action) {
    console.log('in addOrder', action.payload);
    try {
        yield axios.post('/api/orders', action.payload);
        yield put({ type: 'FETCH_ORDERS'});
    } catch (err) {
        console.log('error with adding orders', err);
    }
}

// function* addCart(action) {
//     console.log('in addCart');
//     try {
//         yield axios.post('/api/orders/cart', action.payload);
//     } catch (err) {
//         console.log('error with getting shows', err);
//     }
// }