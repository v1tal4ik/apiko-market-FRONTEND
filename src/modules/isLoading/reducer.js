import { FETCH_ITEM_LIST, FETCH_ITEM_LIST_SUCCESS, FETCH_ITEM_LIST_FAILURE } from '../items/actions';


export default (state = false, action) => {
  switch (action.type) {
    case FETCH_ITEM_LIST:
      return true;
    case FETCH_ITEM_LIST_SUCCESS:
      return false;
    case FETCH_ITEM_LIST_FAILURE:
      return false;
    default:
      return state;
  }
};
