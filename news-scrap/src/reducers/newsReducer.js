import {
  CLIP_NEWS_ITEM,
  GET_NEWS_LIST_FAILURE,
  GET_NEWS_LIST_REQUEST,
  GET_NEWS_LIST_SUCCESS,
} from "../actions/news";

const defalutNewsReducer = {
  favoriteNews: [],
  newsList: [],
  loading: false,
};

export default (state = defalutNewsReducer, action) => {
  switch (action.type) {
    case GET_NEWS_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_NEWS_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        newsList: action.result.items,
      };
    }
    case GET_NEWS_LIST_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }
    case CLIP_NEWS_ITEM: {
      const hasFavoriteList =
        state.favoriteNews.filter((item) => item.link === action.newsItem.link)
          .length > 0;
      if (hasFavoriteList) {
        return {
          ...state,
          favoriteNews: state.favoriteNews.filter(
            (item) => item.link !== action.newsItem.link
          ),
        };
      }
      return {
        ...state,
        favoriteNews: [...state.favoriteNews, action.newsItem],
      };
    }
  }
  return {
    ...state,
  };
};
