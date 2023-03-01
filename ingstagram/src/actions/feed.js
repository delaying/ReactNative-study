import sleep from "../utils/sleep";

export const GET_FEED_LIST_REQUEST = "GET_FEED_LIST_REQUEST";
export const GET_FEED_LIST_SUCCESS = "GET_FEED_LIST_SUCCESS";
export const GET_FEED_LIST_FAILURE = "GET_FEED_LIST_FAILURE";

export const getFeedListRequest = () => {
  return {
    type: GET_FEED_LIST_REQUEST,
  };
};

export const getFeedListSuccess = (FeedInfo) => {
  return {
    type: GET_FEED_LIST_SUCCESS,
    FeedInfo,
  };
};

export const getFeedListFailure = () => {
  return {
    type: GET_FEED_LIST_FAILURE,
  };
};

export const getFeedList = () => async (dispatch) => {
  dispatch(getFeedListRequest());

  await sleep(500);

  dispatch(
    getFeedListSuccess([
      {
        id: "ID_01",
        content: "content_01",
        writer: "jiyeon",
        imageUrl: "ImageURL_01",
        likeCount: 4,
      },
    ])
  );
};
