import { FETCH_TOURS_FAILURE, FETCH_TOURS } from '../tours/actions';
import { RESET_MAIN_MESSAGE, SET_MAIN_MESSAGE } from './actions';


const initialState = {
  msg: null,
  visible: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOURS:
      return initialState;
    case FETCH_TOURS_FAILURE:
      return {
        visible: true,
        msg: action.payload,
      };
    case 'USER/CHANGE_SUCCESS':
      return {
        visible: true,
        msg: action.payload.msg,
      };
    case 'USER/CHANGE_FAILURE':
      return {
        visible: true,
        msg: action.payload,
      };
    case SET_MAIN_MESSAGE:
      return {
        visible: true,
        msg: action.payload,
      };
    case RESET_MAIN_MESSAGE:
      return initialState;
    default:
      return state;
  }
};
