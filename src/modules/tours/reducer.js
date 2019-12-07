import { FETCH_TOURS, FETCH_TOURS_SUCCESS, FETCH_TOURS_FAILURE } from './actions';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_TOURS:
      return [];
    case FETCH_TOURS_SUCCESS:
      return action.payload;
    case FETCH_TOURS_FAILURE:
      return [];
    default:
      return state;
  }
};
