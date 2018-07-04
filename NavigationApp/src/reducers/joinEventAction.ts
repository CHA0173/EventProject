import * as actionType from '../actions/types';

const initialState = {
  event: {
    id:
    name: 
    description: 
    datetime: 
    photo: 
    address:
    private_event: 
    deposit: 
    todo: 
    attendees: 
    discussion: 

  }
}

export const joinEventAction = (state = initialState, action) => {
  switch (action.type){
    case actionType.JOIN_EVENT:
      return { ...state, event: event}
  }

}