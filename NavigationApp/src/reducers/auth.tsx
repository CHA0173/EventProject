import * as actionTypes from '../actions/types';

const initialState = {
  loading: false,
  id: null,
  error: null
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, loading: true }
    case actionTypes.AUTH_SUCCESS:
      return { ...state, id: action.id, loading: false }
    case actionTypes.AUTH_FAILURE:
      return { ...state, error: action.err, loading: false }
    default:
      return state
  }
}