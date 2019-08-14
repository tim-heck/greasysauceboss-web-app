import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import { notify } from 'react-notify-toast';

export default function* showsSaga() {
    // Gets a list of all shows
    yield takeEvery('FETCH_SHOWS', fetchShows);
    // Adds a new show
    yield takeEvery('ADD_SHOW', addShow);
    // Updates a specific show
    yield takeEvery('UPDATE_SHOW', updateShow);
    // Deletes a specific show
    yield takeEvery('DELETE_SHOW', deleteShow);
}

/**
 * Sends a get request to /api/shows to get all shows
 */
function* fetchShows() {
    try {
        const response = yield axios.get('/api/shows');
        // 
        yield put({ type: 'SET_SHOWS', payload: response.data });
    } catch (err) {
        // Displays a notification if there is an error
        notify.show(`There was an error with getting the shows: ${err}`, 'error', 15000);
        console.log('error with getting shows', err);
    }
}

/**
 * Sends a post request to /api/shows to add new show
 * @param {object} action the show to add
 */
function* addShow(action) {
    try {
        yield axios.post('/api/shows', action.payload);
        // Displays a notification if the POST was successful
        notify.show('The show was successfully added!', 'success');
        // Gets updated list of shows
        yield put({ type: 'FETCH_SHOWS' });
    } catch (err) {
        // Displays a notification if there is an error
        notify.show(`There was an error with adding a show: ${err}`, 'error', 15000);
        console.log('error with adding shows', err);
    }
}

/**
 * Sends a put request to /api/shows/:id to update a specific show
 * based on the id sent
 * @param {object} action show to update
 */
function* updateShow(action) {
    try {
        yield axios.put(`/api/shows/${action.payload.id}`, action.payload);
        // Displays a notification if the UPDATE was successful
        notify.show('The product was successfully updated!', 'success');
        // Gets updated list of shows
        yield put({ type: 'FETCH_SHOWS' });
    } catch (err) {
        // Displays a notification if there is an error
        notify.show(`There was an error with updating a show: ${err}`, 'error', 15000);
        console.log('error with updating shows', err);
    }
}

/**
 * Sends a delete request to /api/shows/:id to delete a specific show
 * @param {object} action the show to delete
 */
function* deleteShow(action) {
    try {
        yield axios.delete(`/api/shows/${action.payload.id}`);
        // Displays a notification if the DELETE was successful
        notify.show('The product was successfully deleted!', 'success');
        // Gets updated list of shows
        yield put({ type: 'FETCH_SHOWS' });
    } catch (err) {
        // Displays a notification if there is an error
        notify.show(`There was an error with deleting the show: ${err}`, 'error', 15000);
        console.log('error with deleting shows', err);
    }
}