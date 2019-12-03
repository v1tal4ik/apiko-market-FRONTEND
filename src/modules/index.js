import { combineReducers } from 'redux';
// import { fork } from 'redux-saga/effects';
// import user, { sagas as userSagas } from './user';
import user from './user';


export default combineReducers({ user });

// export function* rootSaga() {
//     yield fork(userSagas);
// }
