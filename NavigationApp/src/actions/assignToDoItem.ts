import * as actionType from './types';
import { Dispatch } from 'redux';
import axios from 'axios';

export const assign_todoitem_start = () => {
  return {
    type: actionType.ASSIGN_TODOITEM_START,
  }
}

export const assign_todoitem_success = (data) => {
  return {
    type: actionType.ASSIGN_TODOITEM_SUCCESS,
    data: data
  }
}

export const assign_todoitem_fail = (err) => {
  return {
    type: actionType.ASSIGN_TODOITEM_FAILURE,
    err: err
  }
}

export const assign_toDoItem = (eventId, toDoItemId, userName) => {
  return {
    type: actionType.ASSIGN_TODOITEM,
    eventId: eventId,
    toDoItemId: toDoItemId,
    userName: userName
  }
}

export const assign_todoitem = (eventId, toDoItemId, userName) => {
  return (dispatch: Dispatch) => {
    dispatch(assign_toDoItem(eventId, toDoItemId, userName))
    axios.put(`https://hivent.xyz/api/events/${eventId}`)
    
  }
}

