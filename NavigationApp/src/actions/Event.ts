import axios from 'axios';
import { Dispatch } from 'redux';
import * as events from '../models/events'
import * as actionType from '../actions/types'
import {  get_event, get_user } from './auth';

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

      dispatch(get_user(token))
      dispatch(get_event(token))
    }).catch((err) => {
      console.log("add event error", err)
    }
    )
  }
}




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


export const complete_item = (token, eventId, toDoItemId, userId, itemCompleted) => {
  return {
    type: actionType.COMPLETE_TODOITEM,
    token: token,
    eventId: eventId,
    toDoItemId: toDoItemId,
    userId: userId,
    itemCompleted: itemCompleted,
  }
}

export const complete_todoitem = (token, eventId, toDoItemId, userId, itemComplete) => {
  return (dispatch: Dispatch) => {
    let condition = itemComplete ? false : true
    dispatch(complete_item(token, eventId, toDoItemId, userId, itemComplete))
    const AuthStr = 'Bearer '.concat(token);
    axios.put(`https://hivent.xyz/api/events/${eventId}`, {
      event: {
        id: eventId.id,
        private: false,
      },
      todo: [{
        id: toDoItemId.id,
        completed: condition,
      }]
    }, { headers: { Authorization: AuthStr } })
  }
}

// ========= JOIN EVENT
export const user_join_event = (user, eventId) => {
  return {
    type: actionType.JOIN_EVENT,
    user,
    eventId,
  }
}

export const join_event = (token, user, eventId) => {
  return (dispatch) => {
    dispatch(user_join_event(user, eventId))
    const AuthStr = 'Bearer '.concat(token);
    axios.put('https://hivent.xyz/api/events/join', {
      token,
      event_Id: eventId,
    }, { headers: { Authorization: AuthStr } })
  }
}

// ========== LEFT EVENT
export const user_left_event = (userId, eventId) => {
  return {
    type: actionType.LEFT_EVENT,
    userId: userId,
    eventId: eventId,
  }
}

export const left_event = (token, userId, eventId) => {
  return (dispatch) => {
    dispatch(user_left_event( userId, eventId ))
    const AuthStr = 'Bearer '.concat(token);
    axios.delete(
      `https://hivent.xyz/api/events/${eventId}`,
     {headers: { Authorization: AuthStr }}
    ).catch(function (error) {
      console.log(error);
    })
  }
}
