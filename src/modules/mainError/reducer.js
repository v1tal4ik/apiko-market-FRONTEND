import { FETCH_TOURS_FAILURE, FETCH_TOURS } from '../tours/actions';


export default (state = null, action) => {
  switch (action.type) {
    case FETCH_TOURS_FAILURE:
      return action.payload;
    case FETCH_TOURS:
      return null;
    default:
      return state;
  }
};
