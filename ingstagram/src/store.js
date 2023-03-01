import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { feedListReducer } from "./reducers/feedList";
import { userInfoReducer } from "./reducers/userInfo";

const rootReducer = combineReducers({
  userInfo: userInfoReducer,
  feedList: feedListReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
