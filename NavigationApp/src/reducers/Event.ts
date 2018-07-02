import { ADD_EVENT, EDIT_EVENT, DELETE_EVENT, IEventAction } from '../actions/Event';
import * as actionType from '../actions/types'
import { Ievent } from '../models/events';


export interface IeventState {
  events: Ievent[]
}

const initialState = {
  events: [],
  loading: false,
}

const EventReducer = (state: IeventState = initialState, action) => {
  switch (action.type) {
    case ADD_EVENT: {
      const events = state.events.concat(
        [
          {
            id: action.id,
            name: action.name,
            description: action.description,
            datetime: action.datetime,
            photo: action.photo,
            address: action.address,
            private_event: action.private_event,
            deposit: action.deposit,
            todo: action.todo,
            attendees: action.attendees,
            discussion: action.discussion,
          }
        ]
      );
      return { ...state, events: events, loading: true }
    }
    // case EDIT_EVENT: {
    //   const events = state.events.filter(events => events.id !== action.id);
    //   events.push({
    //     id: action.id,
    //     name: action.name,
    //     description: action.description,
    //     datetime: action.datetime,
    //     photo: action.photo,
    //     address: action.address,
    //     private_event: action.private_event,
    //     deposit: action.deposit,
    //     todo: action.todo,
    //     attendees: action.attendees,
    //     discussion: action.discussion,
    //   });
    //   return { ...state, events: events, loding: false }
    // }
    case actionType.ASSIGN_TODOITEM:
      let eventIndex = null;
      let newStateEvents = state.events;
      newStateEvents.forEach((ele, idx) => {
        if (ele.id === action.eventId) {
          eventIndex = idx
        }
      })
      console.log(newStateEvents)
      console.log(newStateEvents[eventIndex])
      console.log([action.token, action.eventId, action.toDoItemId, action.userId ,action.userName])

      newStateEvents[eventIndex].todo[0].items[action.toDoItemId].user_id = action.userId,
      newStateEvents[eventIndex].todo[0].items[action.toDoItemId].user_name = action.userName

      return { ...state, events: newStateEvents }

    case (actionType.GET_EVENT_SUCCESS):
      return { ...state, events: action.events }

    default:
      return state
  }
}


export default EventReducer
