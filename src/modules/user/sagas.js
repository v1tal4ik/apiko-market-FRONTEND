// eslint-disable-next-line object-curly-newline
import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { changeUser, changeUserSuccess, changeUserFailure } from './actions';
import { changeUserInfo } from '../../api/index';

export function* fetchUserFlow(action) {
  try {
    // eslint-disable-next-line object-curly-newline
    const { msg, fullName, phone, img } = yield call(changeUserInfo, action.payload);
    // eslint-disable-next-line object-curly-newline
    yield put(changeUserSuccess({ msg, fullName, phone, img }));
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
