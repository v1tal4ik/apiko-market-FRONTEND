import { FETCH_TOURS, FETCH_TOURS_SUCCESS, FETCH_TOURS_FAILURE } from '../tours/actions';


export default (state = false, action) => {
  switch (action.type) {
    case FETCH_TOURS:
      return true;
    case FETCH_TOURS_SUCCESS:
      return false;
    case FETCH_TOURS_FAILURE:
      return false;
    default:
      return state;
  }
};
