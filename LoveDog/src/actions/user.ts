import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import database from '@react-native-firebase/database';

import {TypeDog} from '../data/TypeDog';
import {TypeUser} from '../data/TypeUser';
import {TypeRootReducer} from '../store';

export const SET_USER_INFO = 'SET_USER_INFO' as const;

export const GET_USER_LIKED_HISTORY_REQUEST =
  'GET_USER_LIKED_HISTORY_REQUEST' as const;
export const GET_USER_LIKED_HISTORY_SUCCESS =
  'GET_USER_LIKED_HISTORY_SUCCESS' as const;
export const GET_USER_LIKED_HISTORY_FAILURE =
  'GET_USER_LIKED_HISTORY_FAILURE' as const;

export const PURCHASE_ITEM_SUCCESS = 'PURCHASE_ITEM_SUCCESS' as const;
export const PURCHASE_ITEM_FAILURE = 'PURCHASE_ITEM_FAILURE' as const;

export const setUser = (user: TypeUser) => {
  return {
    type: SET_USER_INFO,
    user: user,
  };
};

export const getUserLikedHistoryRequest = () => {
  return {
    type: GET_USER_LIKED_HISTORY_REQUEST,
  };
};
export const getUserLikedHistorySuccess = (history: TypeDog[]) => {
  return {
    type: GET_USER_LIKED_HISTORY_SUCCESS,
    history,
  };
};
export const getUserLikedHistoryFailure = () => {
  return {
    type: GET_USER_LIKED_HISTORY_FAILURE,
  };
};

export const purchaseItemSuccess = () => {
  return {
    type: PURCHASE_ITEM_SUCCESS,
  };
};

export const purchaseItemFailure = () => {
  return {
    type: PURCHASE_ITEM_FAILURE,
  };
};

export const getUserLikedHistory =
  (): TypeUserThunkAction => async (dispatch, getState) => {
    dispatch(getUserLikedHistoryRequest());
    const user = getState().user.user;

    if (user === null) {
      dispatch(getUserLikedHistoryFailure());
      return;
    }

    const ref = `history/${user.uid}`;

    const currentHistory = await database()
      .ref(ref)
      .once('value')
      .then(snapshot => snapshot.val());

    const dogList = Object.keys(currentHistory).map(key => {
      const item = currentHistory[key];

      return {
        photoUrl: item.url,
      } as TypeDog;
    });

    dispatch(getUserLikedHistorySuccess(dogList));
  };

export const userPurchaseItem =
  (): TypeUserThunkAction => async (dispatch, getState) => {
    const user = getState().user.user;
    if (user === null) {
      //구매실패
      dispatch(purchaseItemFailure());

      return;
    }

    const memberRef = `member/${user.uid}`;
    const reference = await database().ref(memberRef);
    await reference.update({
      availableLikeCount: user.availableLikeCount + 5,
    });

    dispatch(purchaseItemSuccess());
  };

export type TypeUserThunkAction = ThunkAction<
  void,
  TypeRootReducer,
  undefined,
  UserActions
>;

export type TypeUserDispatch = ThunkDispatch<
  TypeRootReducer,
  undefined,
  UserActions
>;

export type UserActions =
  | ReturnType<typeof setUser>
  | ReturnType<typeof getUserLikedHistoryRequest>
  | ReturnType<typeof getUserLikedHistorySuccess>
  | ReturnType<typeof getUserLikedHistoryFailure>
  | ReturnType<typeof purchaseItemFailure>
  | ReturnType<typeof purchaseItemSuccess>;
