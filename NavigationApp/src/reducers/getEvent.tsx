import * as actionTypes from '../actions/types';

const initialState = {
  loading: false,
  event: null,
  error: null
}

export const GET_EVENT_REDUCER = (state = initialState, action) => {
  switch(action.type) {
    case(actionTypes.GET_EVENT_START):
      return {...state, loading: true}
    case(actionTypes.GET_EVENT_START):
      return {...state, loading: false, event: action.events}
    case(actionTypes.GET_EVENT_FAILURE):
      return {...state, loading: false, error: action.err}
  }
}