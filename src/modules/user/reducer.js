import { handleActions } from 'redux-actions';
import {
  fetchUserDataSuccess,
  fetchUserDataFailure,
  userAuth,
} from './actions';


const user = handleActions({
  [fetchUserDataSuccess]: (_state, action) => action.payload,
  [fetchUserDataFailure]: (_state, action) => action.payload,
  [userAuth]: (_state, action) => action.payload,
}, {});


export default user;
