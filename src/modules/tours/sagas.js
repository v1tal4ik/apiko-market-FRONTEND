// eslint-disable-next-line object-curly-newline
import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { FETCH_TOURS, fetchToursSuccess, fetchToursFailure } from './actions';
import { getTours } from '../../api/index';

export function* fetchToursFlow() {
  try {
    const result = yield call(getTours);
    yield put(fetchToursSuccess(result));
  } catch (error) {
    yield put(fetchToursFailure(error.message));
  }
}

function* fetchToursWatcher() {
  yield takeEvery(FETCH_TOURS, fetchToursFlow);
}

export default function* () {
  yield fork(fetchToursWatcher);
}
