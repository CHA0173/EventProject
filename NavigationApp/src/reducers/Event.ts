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
    case EDIT_EVENT: {
      const events = state.events.filter(events => events.id !== action.id);
      events.push({
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
      });
      return { ...state, events: events, loding: false }
    }
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
      console.log([action.token, action.eventId, action.toDoItemId, action.userName])

      newStateEvents[eventIndex].todo[0].items[action.toDoItemId].user_name = action.userName
      return { ...state, events: newStateEvents }

    case (actionType.GET_EVENT_SUCCESS):
      return { ...state, events: action.events }

    default:
      return state
  }
}


export default EventReducer

// export function reducer(oldState: ITeamState = initialState, action: ITeamActions) {
//   switch (action.type) {
//     case ADD_TEAM: {
//       const teams = oldState.teams.concat(
//         [
//           {
//             color: action.color,
//             id: Date.now(),
//             name: action.name,
//             players: action.players,
//           }
//         ]
//       );
//       return { ...oldState, teams };
//     };
//     case EDIT_TEAM: {
//       const teams = oldState.teams.filter(t => t.id !== action.id);
//       teams.push(
//         {
//           color: action.color,
//           id: action.id,
//           name: action.name,
//           players: action.players,
//         }
//       );
//       return { ...oldState, teams  };
//     };
//     case DELETE_TEAM: {
//       const teams = oldState.teams.filter(t => t.id !== action.id);
//       return { ...oldState, teams};
//     };
//     case CLEAR_TEAM: {
//       return { ...oldState, teams: []}
//     }
//     default:
//       return oldState;
//   };
// };
