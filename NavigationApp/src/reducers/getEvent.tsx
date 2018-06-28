import * as actionTypes from '../actions/types';
import { Ievent } from '../models/events';

export interface IeventState {
  events: Ievent[],
}

const initialState = {
  loading: false,
  events: [],
  error: null
}

export const GET_EVENT_REDUCER = (state: IeventState = initialState, action) => {
  switch (action.type) {
    case (actionTypes.GET_EVENT_START):
      return { ...state, loading: true }
    case (actionTypes.GET_EVENT_SUCCESS):
      return { ...state, loading: false, events: action.events }
    case (actionTypes.GET_EVENT_FAILURE):
      return { ...state, loading: false, error: action.err }
    default:
      return state
  }
}