import * as actionType from '../actions/types';

const initialState = {
  data: {},
  Fetching: false,
  error: false,
}

export const assignToDoItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ASSIGN_TODOITEM_START:
      return { ...state, data: [], Fetching: true }
    case actionType.ASSIGN_TODOITEM_SUCCESS:
      return { ...state, data: action.data, Fetching: false}
    case actionType.ASSIGN_TODOITEM_FAILURE:
      return { ...state, Fetching: false , err: action.err }

    case actionType.ASSIGN_TODOITEM:
    let newStateEvents = state.data;
    console.log(newStateEvents)
      console.log(newStateEvents[action.eventId])
      console.log([action.eventId, action.toDoItemId, action.user_name])
      newStateEvents[action.eventId].todo[0].items[action.toDoItemId].user_name = action.userName
      return { ...state,  data: newStateEvents }
    default:
      return state
  }
}
