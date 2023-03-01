import sleep from "../utils/sleep";

export const SET_USER_INFO = "SET_USER_INFO";

export const GET_MY_FEED_REQUEST = "GET_MY_FEED_REQUEST";
export const GET_MY_FEED_SUCCESS = "GET_MY_FEED_SUCCESS";
export const GET_MY_FEED_FAILURE = "GET_MY_FEED_FAILURE";

export const setUserInfo = () => {
  return {
    type: SET_USER_INFO,
    userId,
  };
};

export const getMyFeedRequest = () => {
  return {
    type: GET_MY_FEED_REQUEST,
  };
};
export const getMyFeedSuccess = () => {
  return {
    type: GET_MY_FEED_SUCCESS,
    list,
  };
};
export const getMyFeedFailure = () => {
  return {
    type: GET_MY_FEED_FAILURE,
  };
};

export const signIn = () => async (dispatch) => {
  await sleep(1000);
  dispatch(setUserInfo("test"));
};
