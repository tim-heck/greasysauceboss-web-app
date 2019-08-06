import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* showsSaga() {
    yield takeEvery('FETCH_SHOWS', fetchShows);
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