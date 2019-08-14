import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { notify } from 'react-notify-toast';

export default function* merchSaga() {
    // yield takeEvery('CREATE_SESSION', createSession);
    yield takeEvery('FETCH_PRODUCTS', fetchProducts);
    yield takeEvery('ADD_PRODUCT', addProduct);
    yield takeEvery('UPDATE_PRODUCT', updateProduct);
    yield takeEvery('DELETE_PRODUCT', deleteProduct);
    yield takeEvery('VIEW_PRODUCT', viewProduct);
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

function* fetchProducts() {
    try {
        const response = yield axios.get('/api/merch');
        yield put({ type: 'SET_PRODUCTS', payload: response.data });
    } catch (err) {
        notify.show(`There was an error with getting the products: ${err}`, 'error', 15000);
        console.log('error with getting products', err);
    }
}

function* addProduct(action) {
    try {
        yield axios.post('/api/merch', action.payload);
        notify.show('The product was successfully added!', 'success');
        yield put({ type: 'FETCH_PRODUCTS'});
    } catch (err) {
        notify.show(`There was an error with adding the product: ${err}`, 'error', 15000);
        console.log('error with adding products', err);
    }
}

function* updateProduct(action) {
    try {
        yield axios.put(`/api/merch/${action.payload.id}`, action.payload);
        notify.show('The product was successfully updated!', 'success');
        yield put({ type: 'FETCH_PRODUCTS' });
    } catch (err) {
        notify.show(`There was an error with updating the product: ${err}`, 'error', 15000);
        console.log('error with updating products', err);
    }
}

function* deleteProduct(action) {
    try {
        yield axios.delete(`/api/merch/${action.payload.id}`);
        notify.show('The product was successfully deleted!', 'success');
        yield put({ type: 'FETCH_PRODUCTS' });
    } catch (err) {
        notify.show(`There was an error with deleting the product: ${err}`, 'error', 15000);
        console.log('error with deleting products', err);
    }
}

function* viewProduct(action) {
    try {
        const response = yield axios.get(`/api/merch/${action.payload}`);
        yield put({ type: 'SET_VIEW_PRODUCT', payload: response.data[0] });
    } catch (err) {
        notify.show(`The route to this product does not exist: ${err}. Try again later!`, 'error', 15000);
        console.log('error with viewing product', err);
    }
}

function* hideProduct(action) {
    try {
        yield axios.put(`/api/merch/hide/${action.payload.id}`, action.payload);
        notify.show('The product was successfully updated!', 'success');
        yield put({ type: 'FETCH_PRODUCTS' });
    } catch (err) {
        notify.show(`There was an error with hiding/unhiding the product: ${err}`, 'error', 15000);
        console.log('error with hiding product', err);
    }
}