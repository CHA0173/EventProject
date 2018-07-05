import * as actionTypes from '../actions/types';
import { Iuser } from '../models/users';

export interface IuserState {
  user: Iuser,
}

const initialState = {
  loading: false,
  user: {
    id: -1,
    name: '',
    photo: '',
    events: [],
    items: [],
    notes: []
  },
  error: null,
}

export const userReducer = ( state: IuserState = initialState, action ) => {
  switch (action.type) {
    case (actionTypes.GET_USER_START):
      return { ...state, loading: true }
    case (actionTypes.GET_USER_SUCCESS):
      return { ...state, loading: false, user: action.user }
    case (actionTypes.GET_USER_FAILURE):
      return { ...state, loading: false, error: action.err }
    case actionTypes.COMPLETE_TODOITEM:
      let newEvents = state.user;
      newEvents.items.find((ele) => ele.id === action.toDoItemId.id).completed = !action.itemCompleted
      return {...state, user: newEvents}
    default: 
      return state  
  }
}
