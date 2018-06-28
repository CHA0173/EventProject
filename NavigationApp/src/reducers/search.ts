import * as actionTypes from '../actions/types';
import { Ievent } from '../models/events';

export interface IeventState {
  events: Ievent[],
}

const eventState = {
  events: []
}


export const getEventReducer = ( state: IeventState = eventState, action  ) => {
  switch (action.type) {
    case actionTypes.GET_EVENT_START:
      return { ...state}
    case actionTypes.GET_EVENT_SUCCESS:
      return { ...state, events: action.events}
    default:
      return state
  }
}