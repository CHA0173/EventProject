import * as actionTypes from '../actions/types';


const initialState = {
  loading: false,
  token: null,
  error: null
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, loading: true }
    case actionTypes.AUTH_SUCCESS:
      return { ...state, token: action.token, loading: false }
    case actionTypes.AUTH_FAILURE:
      return { ...state, error: action.err, loading: false }
    default:
      return state
  }
}

