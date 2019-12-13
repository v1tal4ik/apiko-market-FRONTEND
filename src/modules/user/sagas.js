// eslint-disable-next-line object-curly-newline
import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { changeUser, changeUserSuccess, changeUserFailure } from './actions';
import { changeUserInfo } from '../../api/index';

export function* fetchUserFlow(action) {
  try {
    const { msg, fullName, phone } = yield call(changeUserInfo, action.payload);
    yield put(changeUserSuccess({ msg, fullName, phone }));
  } catch (error) {
    yield put(changeUserFailure(error.message));
  }
}

function* fetchUserWatcher() {
  yield takeEvery(changeUser, fetchUserFlow);
}

export default function* () {
  yield fork(fetchUserWatcher);
}
