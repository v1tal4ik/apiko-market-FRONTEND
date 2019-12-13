import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import sagaTours from './tours/sagas';
import sagaUser from './user/sagas';
import user from './user';
import isLoading from './isLoading';
import arrOfTour from './tours';
import mainMessage from './mainMessage';
import search from './search';


export default combineReducers({
  user, isLoading, arrOfTour, mainMessage, search,
});

export function* rootSaga() {
  yield fork(sagaTours);
  yield fork(sagaUser);
}
