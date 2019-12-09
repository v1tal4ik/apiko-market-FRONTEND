import { createAction } from 'redux-actions';

export const fetchUserDataSuccess = createAction('USER/FETCH_SUCCESS');
export const fetchUserDataFailure = createAction('USER/FETCH_FAILURE');
export const userAuth = createAction('USER/AUTH');
