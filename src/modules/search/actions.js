export const CHANGE_SEARCH = 'SEARCH/CHANGE';
export const RESET_SEARCH = 'SEARCH/RESET';


export const changeSearch = str => ({
  type: CHANGE_SEARCH,
  payload: str,
});

export const resetSearch = () => ({
  type: RESET_SEARCH,
});
