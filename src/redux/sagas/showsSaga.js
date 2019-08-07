import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* showsSaga() {
    yield takeEvery('FETCH_SHOWS', fetchShows);
    yield takeEvery('ADD_SHOW', addShow);
    yield takeEvery('UPDATE_SHOW', updateShow);
    yield takeEvery('DELETE_SHOW', deleteShow);
}

function* fetchShows(action) {
    console.log('in fetchShows');
    try {
        const response = yield axios.get('/api/shows');
        yield put({ type: 'SET_SHOWS', payload: response.data });
    } catch (err) {
        console.log('error with getting shows', err);
    }
}

function* addShow(action) {
    console.log('in addShows');
    try {
        yield axios.post('/api/shows', action.payload);
        yield put({ type: 'FETCH_SHOWS' });
    } catch (err) {
        console.log('error with getting shows', err);
    }
}

function* updateShow(action) {
    console.log('in updateShows');
    console.log('action.payload in PUT', action.payload)
    try {
        yield axios.put(`/api/shows/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_SHOWS' });
    } catch (err) {
        console.log('error with getting shows', err);
    }
}

function* deleteShow(action) {
    console.log('in deleteShows');
    try {
        yield axios.delete(`/api/shows/${action.payload.id}`);
        yield put({ type: 'FETCH_SHOWS' });
    } catch (err) {
        console.log('error with getting shows', err);
    }
}