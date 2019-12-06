// eslint-disable-next-line object-curly-newline
import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { FETCH_ITEM_LIST, fetchItemListSuccess, fetchItemListFailure } from './actions';
import { getItemList } from '../../api/index';

export function* fetchItemListFlow() {
  try {
    const result = yield call(getItemList);
    yield put(fetchItemListSuccess(result));
  } catch (error) {
    yield put(fetchItemListFailure(error.message));
  }
}

function* fetchItemListWatcher() {
  yield takeEvery(FETCH_ITEM_LIST, fetchItemListFlow);
}

export default function* () {
  yield fork(fetchItemListWatcher);
}
