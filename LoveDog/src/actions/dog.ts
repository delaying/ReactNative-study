import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypeDog} from '../data/TypeDog';
import {TypeRootReducer} from '../store';

export const GET_DOG_REQUEST = 'GET_DOG_REQUEST';
export const GET_DOG_SUCCESS = 'GET_DOG_SUCCESS';
export const GET_DOG_FAILURE = 'GET_DOG_FAILURE';

export const getDogRequest = () => {
  return {
    type: GET_DOG_REQUEST,
  };
};
export const getDogSuccess = (dog: TypeDog) => {
  return {
    type: GET_DOG_SUCCESS,
    data: dog,
  };
};
export const getDogFailure = () => {
  return {
    type: GET_DOG_FAILURE,
  };
};

export const getDog = () => {};

export type TypeDogThunkAction = ThunkAction<
  void,
  TypeRootReducer,
  undefined,
  DogActions
>;

export type TypeDogDispatch = ThunkDispatch<
  TypeRootReducer,
  undefined,
  DogActions
>;

export type DogActions =
  | ReturnType<typeof getDogRequest>
  | ReturnType<typeof getDogSuccess>
  | ReturnType<typeof getDogFailure>;
