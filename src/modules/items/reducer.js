import { FETCH_ITEM_LIST, FETCH_ITEM_LIST_SUCCESS, FETCH_ITEM_LIST_FAILURE } from './actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ITEM_LIST:
      return [];
    case FETCH_ITEM_LIST_SUCCESS:
      return action.payload;
    case FETCH_ITEM_LIST_FAILURE:
      return [];
    default:
      return state;
  }
};
