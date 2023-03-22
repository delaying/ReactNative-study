import {TypeDog} from '../data/TypeDog';

export type TypeDogReducer = {
  currentDog: TypeDog | null;
};

const initialState: TypeDogReducer = {
  currentDog: null,
};

export const dogReducer = (state = initialState, action) => {
  return {
    ...state,
  };
};
