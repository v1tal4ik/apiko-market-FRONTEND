import { CHANGE_SEARCH, RESET_SEARCH } from './actions';

const initialState = {
  searchQuery: null,
  searchLocation: null,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SEARCH:
      return action.payload;
    case RESET_SEARCH:
      return initialState;
    default:
      return state;
  }
};
