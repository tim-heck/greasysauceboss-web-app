import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* merchSaga() {
    // yield takeEvery('CREATE_SESSION', createSession);
    yield takeEvery('FETCH_PRODUCTS', fetchProducts);
    yield takeEvery('ADD_PRODUCT', addProduct);
    yield takeEvery('UPDATE_PRODUCT', updateProduct);
    yield takeEvery('DELETE_PRODUCT', deleteProduct);
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

function* fetchProducts(action) {
    console.log('in fetchProducts');
    try {
        const response = yield axios.get('/api/merch');
        yield put({ type: 'SET_PRODUCTS', payload: response.data });
    } catch (err) {
        console.log('error with getting products', err);
    }
}

function* addProduct(action) {
    console.log('in addProduct');
    try {
        yield axios.post('/api/merch', action.payload);
        yield put({ type: 'FETCH_PRODUCTS'});
    } catch (err) {
        console.log('error with getting products', err);
    }
}

function* updateProduct(action) {
    console.log('in updateProduct');
    try {
        yield axios.put(`/api/merch/${action.payload.id}`);
        yield put({ type: 'FETCH_PRODUCTS' });
    } catch (err) {
        console.log('error with getting products', err);
    }
}

function* deleteProduct(action) {
    console.log('in deleteProduct');
    try {
        yield axios.delete(`/api/merch/${action.payload.id}`);
        yield put({ type: 'FETCH_PRODUCTS' });
    } catch (err) {
        console.log('error with getting products', err);
    }
}