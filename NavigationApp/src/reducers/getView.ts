import * as actionTypes from '../actions/types';
import { Iuser } from '../models/users';

export interface IviewState {
  events: Iuser,
}

const initialState = {
  loading: false,
  events: {   
    id: -1,
    name: '',
    photo: '',
    events: [],
    items: [],
  },
  error: null
}

export const viewReducer = (state: IviewState = initialState, action) => {
  switch (action.type) {
    case (actionTypes.GET_VIEW_START):
      return { ...state, loading: true }
    case (actionTypes.GET_VIEW_SUCCESS):
      return { ...state, loading: false, events: action.events }
    case (actionTypes.GET_VIEW_FAILURE):
      return { ...state, loading: false, error: action.err }
    default:
      return state
  }
}