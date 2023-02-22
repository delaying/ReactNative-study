const defalutNewsReducer = {
  favoriteNews: [],
  newsList: [],
};

export default (state = defalutNewsReducer, action) => {
  return {
    ...state,
  };
};
