import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* ordersSaga() {
    yield takeEvery('FETCH_ORDERS', fetchOrders);
    yield takeEvery('ADD_ORDER', addOrders);
}

function* fetchOrders() {
    console.log('in fetchOrders');
    try {
        const response = yield axios.get('/api/orders');
        yield put({ type: 'SET_SHOWS', payload: response.data });
    } catch (err) {
        console.log('error with getting shows', err);
    }
}

function* addOrders(action) {
    console.log('in addOrders');
    try {
        yield axios.post('/api/orders', action.payload);
        yield put({ type: 'FETCH_SHOWS' });
    } catch (err) {
        console.log('error with getting shows', err);
    }
}