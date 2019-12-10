import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import sagas from './tours/sagas';
import user from './user';
import isLoading from './isLoading';
import arrOfTour from './tours';
import mainError from './mainError';
import search from './search';


export default combineReducers({
  user, isLoading, arrOfTour, mainError, search,
});

export function* rootSaga() {
  yield fork(sagas);
}
