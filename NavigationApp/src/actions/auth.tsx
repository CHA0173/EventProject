import * as actionTypes from './types';
import axios from 'axios';

export const auth_start = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const auth_success = (data) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: data.data.token
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

// export const store_event_basic_info = (data) => {
//   return {
//     type: actionTypes.
//   }
// } 

export const store_event_todo_list = (data) => {

}

export const store_event_attendee = (data) => {

}

export const store_event_discussion = (data) => {

}

export const auth_get_event_success = (data) => {
  return {
    type: actionTypes.GET_EVENT_SUCCESS,
    events: data.data
  }
}

export const auth_get_event_fail = (err) => {
  return {
    type: actionTypes.GET_EVENT_FAILURE,
    err: err
  }
}

export const get_event = (token) => {
  return (dispatch: any) => {
    const AuthStr = 'Bearer '.concat(token);
    alert('A')
    dispatch(get_event_start())
    axios.get('https://hivent.xyz/api/events', { headers: { Authorization: AuthStr } }).then((event) => {
      console.log(event)
      dispatch(auth_get_event_success(event))
    }).catch((err) => {
      console.log(err)
      dispatch(auth_get_event_fail(err))
    })
  }
}

// export const get_todoitem = (token) => {    //FIXME: profile get events and todo item list
//   return (dispatch: any) => {
//     dispatch(get_event_start())
//     axios.get('https"//hivent.xyz/api/events/:id', { headers: { Authorization: AuthStr } }).then((event) => {
//       dispatch(auth_get_event_success(event))
//     }}.catch((err) => {
//       dispatch(auth_get_event_fail(err))
//     })
//   }
// }

export const auth = (email, password) => {
  return (dispatch: any) => {
    dispatch(auth_start())
    axios.post('https://hivent.xyz/api/auth/local', { email: email, password: password }).then((data) => {
      console.log(data)
      dispatch(get_event(data.data.token))
      dispatch(auth_success(data))
    }).catch((err) => {
      dispatch(auth_fail(err))
    })
  }
}