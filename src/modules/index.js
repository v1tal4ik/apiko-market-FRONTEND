import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import sagas from './items/sagas';
import user from './user';
import isLoading from './isLoading';
import arrOfItem from './items';
import mainError from './mainError';


export default combineReducers({
  user, isLoading, arrOfItem, mainError,
});

export function* rootSaga() {
  yield fork(sagas);
}
