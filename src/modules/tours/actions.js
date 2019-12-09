export const FETCH_TOURS = 'TOURS/FETCH';
export const FETCH_TOURS_SUCCESS = 'TOURS/FETCH_SUCCESS';
export const FETCH_TOURS_FAILURE = 'TOURS/FETCH_FAILURE';

export const fetchTours = () => ({
  type: FETCH_TOURS,
});

export const fetchToursSuccess = arr => ({
  type: FETCH_TOURS_SUCCESS,
  payload: arr,
});

export const fetchToursFailure = err => ({
  type: FETCH_TOURS_FAILURE,
  payload: err,
});
