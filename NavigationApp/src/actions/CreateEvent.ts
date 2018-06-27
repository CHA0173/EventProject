import axios  from 'axios';
import { Dispatch } from 'redux';

interface IEvent {
  private: boolean,
  name: string,
  description: string,
  address: string,
  deposit: string,
  ImgSource: any,
  uri: string
}

export const ADD_EVENT = 'ADD_EVENT';
type ADD_EVENT = typeof ADD_EVENT;

export interface IAddEventAction {
  type: ADD_EVENT;
  id: number;
  event: IEvent;
  Templatetype: string[];
  todolist: object[];
}

export const EDIT_EVENT = 'EDIT_EVENT';
type EDIT_EVENT = typeof EDIT_EVENT;

export interface IEditEventAction {
  type: EDIT_EVENT;
  id: number;
  event: IEvent;
  Templatetype: string[];
  todolist: object[];
}

export const DELETE_EVENT = 'DELETE_EVENT';
type DELETE_EVENT = typeof DELETE_EVENT;

export interface IDeleteEventAction {
  type: DELETE_EVENT;
  id: number;
}

export type IEventAction = IAddEventAction | IEditEventAction | IDeleteEventAction;

export function addEvent(id: number, event: IEvent, Templatetype: string[], todolist: object[]): IAddEventAction {
  return {
    type: ADD_EVENT,
    id,
    event,
    Templatetype,
    todolist
  }
}

export function editEvent(id: number, event: IEvent, Templatetype: string[], todolist: object[]): IEditEventAction {
  return {
    type: EDIT_EVENT,
    id,
    event,
    Templatetype,
    todolist
  }
}

export function deleteEvent(id: number): IDeleteEventAction {
  return {
    type: DELETE_EVENT,
    id 
  }
}

export function remoteAddEvent(id: number, event: IEvent, Templatetype: string[], todolist: object[]) {
  return (dispatch: Dispatch<IEventAction>) => {
    axios.post('url', {id, event, Templatetype, todolist}).then( res => {
      dispatch(addEvent(res.data.id, event, Templatetype, todolist));
    })
  }
}