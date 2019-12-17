import { handleActions } from 'redux-actions';
import {
  fetchUserDataSuccess,
  fetchUserDataFailure,
  userAuth,
  changeUserSuccess,
  changeUserFailure,
} from './actions';


const user = handleActions({
  [fetchUserDataSuccess]: (_state, action) => action.payload,
  [fetchUserDataFailure]: (_state, action) => action.payload,
  [userAuth]: (_state, action) => action.payload,
  [changeUserSuccess]: (state, action) => ({
    ...state,
    fullName: action.payload.fullName,
    phone: action.payload.phone,
  }),
  [changeUserFailure]: state => state,
}, {});


export default user;
