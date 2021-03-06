import { createAction } from 'redux-actions';

export const fetchUserDataSuccess = createAction('USER/FETCH_SUCCESS');
export const fetchUserDataFailure = createAction('USER/FETCH_FAILURE');
export const userAuth = createAction('USER/AUTH');
export const userLogOut = createAction('USER/LOG_OUT');

export const changeUser = createAction('USER/CHANGE');
export const changeUserSuccess = createAction('USER/CHANGE_SUCCESS');
export const changeUserFailure = createAction('USER/CHANGE_FAILURE');

export const addTourToFav = createAction('USER/ADD_TOUR_TO_FAV');
export const removeTourFromFav = createAction('USER/REMOVE_TOUR_FROM_FAV');
