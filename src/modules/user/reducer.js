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
  [changeUserSuccess]: (_state, action) => action.payload,
  [changeUserFailure]: (_state, action) => action.payload,
}, {});


export default user;
