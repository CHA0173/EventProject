import axios from 'axios';
import { Dispatch } from 'redux';
import * as events from '../models/events'

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
  todo: events.Itodo[],
  attendees: events.Iattendees[],
  discussion: events.Idiscussion[],
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

export function remoteAddEvent(
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
  return (dispatch: Dispatch<any>) => {
    axios.post('https://hivent.xyz/api/users', {
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
    }).then(res => {
      dispatch(
        addEvent(
        res.data.id,
        name,
        description,
        datetime,
        photo,
        address,
        private_event,
        deposit,
        todo,
        attendees,
        discussion ));
    })
  }
}