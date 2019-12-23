export const RESET_MAIN_MESSAGE = 'MAIN_MESSAGE/RESET';
export const SET_MAIN_MESSAGE = 'MAIN_MESSAGE/SET';

export const resetMainMessage = () => ({
  type: RESET_MAIN_MESSAGE,
});

export const setMainMessage = msg => ({
  type: SET_MAIN_MESSAGE,
  payload: msg,
});
