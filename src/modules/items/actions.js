export const FETCH_ITEM_LIST = 'ITEMS/FETCH';
export const FETCH_ITEM_LIST_SUCCESS = 'ITEMS/FETCH_SUCCESS';
export const FETCH_ITEM_LIST_FAILURE = 'ITEMS/FETCH_FAILURE';

export const fetchItemList = () => ({
  type: FETCH_ITEM_LIST,
});

export const fetchItemListSuccess = arr => ({
  type: FETCH_ITEM_LIST_SUCCESS,
  payload: arr,
});

export const fetchItemListFailure = err => ({
  type: FETCH_ITEM_LIST_FAILURE,
  payload: err,
});
