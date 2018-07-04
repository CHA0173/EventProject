import { ADD_EVENT, EDIT_EVENT, DELETE_EVENT, IEventAction } from '../actions/Event';
import * as actionType from '../actions/types'
import { Ievent } from '../models/events';


export interface IeventState {
  events: Ievent[]
}

const initialState = {
  events: [],
  loading: false,
  error: null
}

const EventReducer = (state: IeventState = initialState, action) => {
  switch (action.type) {
    case (actionType.GET_EVENT_START):
      return { ...state, loading: true }
    case (actionType.GET_EVENT_SUCCESS):
      return { ...state, loading: false, events: action.events }
    case (actionType.GET_EVENT_FAILURE):
      return { ...state, loading: false, error: action.err }

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


    case actionType.ASSIGN_TODOITEM: {
      let eventIndex = null;
      let newStateEvents = state.events;
      newStateEvents.forEach((ele, idx) => {
        if (ele.id === action.eventId) {
          eventIndex = idx
        }
      })
      console.log(newStateEvents)
      console.log(newStateEvents[eventIndex])
      console.log([action.token, action.eventId, action.toDoItemId, action.userId, action.userName])

      newStateEvents[eventIndex].todo[0].items.find(item => item.id == action.toDoItemId).user_id = action.userId,
        newStateEvents[eventIndex].todo[0].items.find(item => item.id == action.toDoItemId).user_name = action.userName

      return { ...state, events: newStateEvents }
    }

    case actionType.COMPLETE_TODOITEM: {
      let newEvents = state.events;
      console.log('DDDD', newEvents.find(event => event.id === action.eventId.id))
      newEvents.find(event => event.id === action.eventId.id).todo[0].items.find(item => item.id == action.toDoItemId.id).completed = !action.itemCompleted
      return { ...state, events: newEvents }
    }

    case actionType.JOIN_EVENT:{
      let newEvent = state.events.find(event => event.id === action.eventId).attendees.concat(action.user)

      return { ...state, events: newEvent }
    }

    case actionType.LEFT_EVENT: {
      let newEvent = state.events
      let attendeeList = newEvent.find(event => event.id == action.eventId).attendees
      console.log(attendeeList);
      let attendeeIndex = attendeeList.indexOf(attendeeList.find(att => att.id == action.userId))
      newEvent.find(event => event.id == action.eventId).attendees.splice(attendeeIndex, 1)
      return { ...state, events: newEvent }

    }

    default:
      return state
  }
}


export default EventReducer
