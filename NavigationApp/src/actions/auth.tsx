import * as actionTypes from './types';
import axios from 'axios';

// ============================ AUTH

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

// ==============================  GET EVENT (search)
export const get_event_start = () => {
  return {
    type: actionTypes.GET_EVENT_START
  }
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

// ==============================  GET VIEWEVENT (View)
export const get_viewevent_start = () => {
  return {
    type: actionTypes.GET_VIEWEVENT_START
  }
}


export const auth_get_viewevent_success = (data) => {
  return {
    type: actionTypes.GET_VIEWEVENT_SUCCESS,
    events: data.data
  }
}

export const auth_get_viewevent_fail = (err) => {
  return {
    type: actionTypes.GET_VIEWEVENT_FAILURE,
    err: err
  }
}

export const get_viewevent = (token, id) => {
  return (dispatch: any) => {
    const AuthStr = 'Bearer '.concat(token);
    dispatch(get_viewevent_start())
    axios.get(`https://hivent.xyz/api/events/${id}`, { headers: { Authorization: AuthStr } }).then((event) => {
      console.log(event)
      dispatch(auth_get_viewevent_success(event))
    }).catch((err) => {
      console.log(err)
      dispatch(auth_get_viewevent_fail(err))
    })
  }
}

// ==============================  GET EVENT (view)
export const get_view_start = () => {
  return {
    type: actionTypes.GET_VIEW_START
  }
}


export const auth_get_view_success = (data) => {
  return {
    type: actionTypes.GET_VIEW_SUCCESS,
    events: data.data
  }
}

export const auth_get_view_fail = (err) => {
  return {
    type: actionTypes.GET_VIEW_FAILURE,
    err: err
  }
}

export const get_view = (token) => {
  return (dispatch: any) => {
    const AuthStr = 'Bearer '.concat(token);
    // dispatch(get_view_start())
    axios.get(`https://hivent.xyz/api/users`, { headers: { Authorization: AuthStr } }).then((event) => {
      console.log("users", event.data);
      dispatch(auth_get_view_success(event))
    }).catch((err) => {
      console.log(err)
      dispatch(auth_get_view_fail(err))
    })
  }
}

// ========================================= GET USER
export const auth_get_user_start = () => {
  type: actionTypes.GET_USER_START
}

export const auth_get_user_success = (data) => {
  return {
    type: actionTypes.GET_USER_SUCCESS,
    user: data.data
  }
}

export const auth_get_user_fail = (err) => {
  return {
    type: actionTypes.GET_USER_FAILURE,
    err: err
  }
}

export const get_user = (token) => {
  return (dispatch: any) => {
    const AuthStr = 'Bearer '.concat(token);

    // dispatch(auth_get_user_start())
    console.log('ABC', AuthStr)
    axios.get(`https://hivent.xyz/api/users`, { headers: { Authorization: AuthStr } }).then((user) => {
      console.log("auth user", user)
      dispatch(auth_get_user_success(user))
    }).catch((err) => {
      dispatch(auth_get_user_fail(err))
    })
  }
}

// ================================== GET AUTH
export const auth = (email, password) => {
  return (dispatch: any) => {
    dispatch(auth_start())
    axios.post('https://hivent.xyz/api/auth/local', { email: email, password: password }).then((data) => {
      dispatch(get_event(data.data.token))
      dispatch(get_view(data.data.token))
      dispatch(get_user(data.data.token))
      dispatch(auth_success(data))
    }).catch((err) => {
      dispatch(auth_fail(err))
    })
  }
}