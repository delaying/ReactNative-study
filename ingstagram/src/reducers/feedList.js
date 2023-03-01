import { GET_FEED_LIST_SUCCESS } from "../actions/feed";

const defaultFeedListState = {
  list: [],
};

// export const FeedInfo = {
//   id,
//   content,
//   writer,
//   imageUrl,
//   likeCount,
// };

// export const UserInfo = {
//   name,
//   profileImage,
//   uid,
// };

export const feedListReducer = (state = defaultFeedListState, action) => {
  switch (action.type) {
    case GET_FEED_LIST_SUCCESS:
      return {
        ...state,
      };
  }

  return {
    ...state,
  };
};
