import * as actionTypes from './types';

export const auth_start = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const auth_success = (id) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    id: id
  }
}

export const auth_fail = (err) => {
  return {
    type: actionTypes.AUTH_FAILURE,
    err: err
  }
}

export const get_event_start = () => {
  return {
    type: actionTypes.GET_EVENT_START
  }
}

export const store_event_basic_info = (data) => {

} 

export const store_event_todo_list = (data) => {
  
}

export const store_event_attendee = (data) => {
  
}

export const store_event_discussion = (data) => {
  
} 

export const auth_get_event_success = (event) => {
  return dispatch => { 
    
  }
}

export const auth_get_event_fail = (err) => {
  return {
    type: actionTypes.GET_EVENT_FAILURE,
    err: err
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(auth_start())
    axios.post('url', {email: email, password: password}).then((data) => {
      dispatch(auth_success(data.id))
      dispatch(get_event_start())
      axios.get('url').then((event) => {
        dispatch(auth_get_event_success(event))
      }).catch((err) => {
        dispatch(auth_get_event_fail(err))
      })
    }).catch((err) => {
      dispatch(auth_fail(err))
    })
  }
}