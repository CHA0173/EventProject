import axios from 'axios';
import { Dispatch } from 'redux';
import * as events from '../models/events'
import * as actionType from '../actions/types'
import { get_view, get_event, get_user } from './auth';

export interface Ievent {
  evnets: events.Ievent[]
}

export const ADD_EVENT = 'ADD_EVENT';
type ADD_EVENT = typeof ADD_EVENT;

export interface IAddEventAction {
  type: ADD_EVENT;
  id: number,
  name: string,
  description: string,
  datetime: string,
  photo: any,
  address: string,
  private_event: boolean,
  deposit: string,
  todo: any,
  attendees: events.Iattendees[],
  discussion: events.Idiscussion[]
}

export const EDIT_EVENT = 'EDIT_EVENT';
type EDIT_EVENT = typeof EDIT_EVENT;

export interface IEditEventAction {
  type: EDIT_EVENT;
  id: number,
  name: string,
  description: string,
  datetime: string,
  photo: any,
  address: string,
  private_event: boolean,
  deposit: string,
  todo: events.Itodo[],
  attendees: events.Iattendees[],
  discussion: events.Idiscussion[],
}

export const DELETE_EVENT = 'DELETE_EVENT';
type DELETE_EVENT = typeof DELETE_EVENT;

export interface IDeleteEventAction {
  type: DELETE_EVENT;
  id: number;
}

export type IEventAction = IAddEventAction | IEditEventAction | IDeleteEventAction;

export function addEvent(
  id: number,
  name: string,
  description: string,
  datetime: string,
  photo: any,
  address: string,
  private_event: boolean,
  deposit: string,
  todo: events.Itodo[],
  attendees: events.Iattendees[],
  discussion: events.Idiscussion[],
) {
  return {
    type: ADD_EVENT,
    id,
    name,
    description,
    datetime,
    photo,
    address,
    private_event,
    deposit,
    todo,
    attendees,
    discussion,
  }
}

export function editEvent(
  id: number,
  name: string,
  description: string,
  datetime: string,
  photo: any,
  address: string,
  private_event: boolean,
  deposit: string,
  todo: events.Itodo[],
  attendees: events.Iattendees[],
  discussion: events.Idiscussion[],
): IEditEventAction {
  return {
    type: EDIT_EVENT,
    id,
    name,
    description,
    datetime,
    photo,
    address,
    private_event,
    deposit,
    todo,
    attendees,
    discussion,
  }
}

export function deleteEvent(id: number): IDeleteEventAction {
  return {
    type: DELETE_EVENT,
    id
  }
}

// ====== add event
export function remoteAddEvent(
  token: any,
  name: string,
  description: string,
  datetime: string,
  photo: any,
  address: string,
  private_event: boolean,
  deposit: string,
  todo: events.Itodo[],
  attendees: events.Iattendees[],
  discussion: events.Idiscussion[],
) {
  return (dispatch: Dispatch<any>) => {
    console.log("todo[0].items", todo[0].items);
    const AuthStr = 'Bearer '.concat(token);
    axios.post('https://hivent.xyz/api/events', {
      event_name: name,
      description: description,
      datetime: datetime,
      photo: photo,
      address: address,
      private_event: private_event,
      deposit: deposit,
      items: todo,
      attendees: attendees,
      discussion: discussion,
    }, { headers: { Authorization: AuthStr } }).then(res => {
      dispatch(
        addEvent(
          res.data,
          name,
          description,
          datetime,
          photo,
          address,
          private_event,
          deposit,
          todo,
          attendees,
          discussion));

      dispatch(get_view(token))
      dispatch(get_user(token))
      dispatch(get_event(token))
    }).catch((err) => {
      console.log("add event error", err)
    }
    )
  }
}


// ===== edit event

// export function remoteEditEvent(
//   token: any,
//   id: number,
//   name: string,
//   description: string,
//   datetime: string,
//   photo: any,
//   address: string,
//   private_event: boolean,
//   deposit: string,
//   todo: events.Itodo[],
//   attendees: events.Iattendees[],
//   discussion: events.Idiscussion[],
// ) {
//   return (dispatch: Dispatch<any>) => {

//     const AuthStr = 'Bearer '.concat(token);
//     axios.put(`https://hivent.xyz/api/events/${id}`, {
//       token,
//       name,
//       description,
//       datetime,
//       photo,
//       address,
//       private_event,
//       deposit,
//       todo,
//       attendees,
//       discussion,
//     }, { headers: { Authorization: AuthStr } }).then(res => {
//       dispatch(
//         editEvent(
//           res.data.id,
//           name,
//           description,
//           datetime,
//           photo,
//           address,
//           private_event,
//           deposit,
//           todo,
//           attendees,
//           discussion,
//         ))
//       dispatch(get_view(token))
//       dispatch(get_user(token))
//       dispatch(get_event(token))
//     }).catch(err => {
//       console.log('edit event', err)
//     })
//   }
// }

export const assign_item = (token, eventId, toDoItemId, userId, userName) => {
  return {
    type: actionType.ASSIGN_TODOITEM,
    token: token,
    eventId: eventId,
    toDoItemId: toDoItemId,
    userId: userId,
    userName: userName,
  }
}

export const assign_todoitem = (token, eventId, toDoItemId, userId, userName) => {
  return (dispatch: Dispatch) => {
    dispatch(assign_item(token, eventId, toDoItemId, userId, userName))
    const AuthStr = 'Bearer '.concat(token);
    axios.put(`https://hivent.xyz/api/events/${eventId}`, {
      event: {
        id: eventId,
        private: false,
      },
      todo: [{
        id: toDoItemId,
        user_id: userId,
      }]
    }, { headers: { Authorization: AuthStr } })

  }
}
