import { handleActions } from 'redux-actions';
import {
  fetchUserDataSuccess,
  fetchUserDataFailure,
  userAuth,
  changeUserSuccess,
  changeUserFailure,
  addTourToFav,
  removeTourFromFav,
} from './actions';


const user = handleActions({
  [fetchUserDataSuccess]: (_state, action) => action.payload,
  [fetchUserDataFailure]: (_state, action) => action.payload,
  [userAuth]: (_state, action) => action.payload,
  [changeUserSuccess]: (state, action) => ({
    ...state,
    fullName: action.payload.fullName,
    phone: action.payload.phone,
    img: action.payload.img,
  }),
  [changeUserFailure]: state => state,
  [addTourToFav]: (state, action) => {
    state.favProducts.push(action.payload);
    return { ...state };
  },
  [removeTourFromFav]: (state, action) => {
    state.favProducts.forEach((id, index) => {
      if (id === action.payload) {
        state.favProducts.splice(index, 1);
      }
    });
    return { ...state };
  },
}, {});

export default user;
