import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { notify } from 'react-notify-toast';

export default function* showsSaga() {
    yield takeEvery('FETCH_SHOWS', fetchShows);
    yield takeEvery('ADD_SHOW', addShow);
    yield takeEvery('UPDATE_SHOW', updateShow);
    yield takeEvery('DELETE_SHOW', deleteShow);
}

function* fetchShows() {
    try {
        const response = yield axios.get('/api/shows');
        yield put({ type: 'SET_SHOWS', payload: response.data });
    } catch (err) {
        notify.show(`There was an error with getting the shows: ${err}`, 'error', 15000);
        console.log('error with getting shows', err);
    }
}

function* addShow(action) {
    try {
        yield axios.post('/api/shows', action.payload);
        notify.show('The show was successfully added!', 'success');
        yield put({ type: 'FETCH_SHOWS' });
    } catch (err) {
        notify.show(`There was an error with adding a show: ${err}`, 'error', 15000);
        console.log('error with adding shows', err);
    }
}

function* updateShow(action) {
    try {
        yield axios.put(`/api/shows/${action.payload.id}`, action.payload);

        notify.show('The product was successfully updated!', 'success');
        yield put({ type: 'FETCH_SHOWS' });
    } catch (err) {
        notify.show(`There was an error with updating a show: ${err}`, 'error', 15000);
        console.log('error with updating shows', err);
    }
}

function* deleteShow(action) {
    try {
        yield axios.delete(`/api/shows/${action.payload.id}`);
        notify.show('The product was successfully deleted!', 'success');
        yield put({ type: 'FETCH_SHOWS' });
    } catch (err) {
        notify.show(`There was an error with deleting the show: ${err}`, 'error', 15000);
        console.log('error with deleting shows', err);
    }
}