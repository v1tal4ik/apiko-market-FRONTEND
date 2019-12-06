import { FETCH_ITEM_LIST_FAILURE, FETCH_ITEM_LIST } from '../items/actions';


export default (state = null, action) => {
  switch (action.type) {
    case FETCH_ITEM_LIST_FAILURE:
      return action.payload;
    case FETCH_ITEM_LIST:
      return null;
    default:
      return state;
  }
};
