// import * as actionType from './types';
// import { Dispatch } from 'redux';
// import axios from 'axios';

// export interface Invite {
//   invite: {
//     events_id: number,
//     note: string,
//     timetamp: string,
//   }
// }

// export const send_invitation_start = () => {
//   return {
//     type: actionType.SEND_INVITATION_START
//   }
// }

// export const send_invitation_success = (data) => {
//   return {
//     type: actionType.SEND_INVITATION_SUCCESS,
//     invite: data
//   }
// }

// export const send_invitation_fail = (err) => {
//   return {
//     type: actionType.SEND_INVITATION_FAILURE,
//     err: err
//   }
// }

// export const send_invitation = (token, eventId, userId) => {
//   return (dispatch: Dispatch) => {
//     const AuthStr = 'Bearer '.concat(token);
//     dispatch(send_invitation_start())
    
//     axios.post(`https://hivent.xyz/api/events/${eventId}/invite`, {
//       event_Id: eventId,
//       invite_id: userId,
//     }, { headers: { Authorization: AuthStr } }).then((invite) => {
//       console.log('invite',invite)
//       dispatch(send_invitation_success(invite))
//     }).catch((err) => {
//       dispatch(send_invitation_fail(err))
//     })
//   }
// }

// ================== GET INVITE 
// export const get_invitation_start = () => {
//   return {
//     type: actionType.GET_INVITATION_START,
//   }
// }

// export const get_invitation_success = (data) => {
//   return {
//     type: actionType.GET_INVITATION_SUCCESS,
//     invite: data
//   }
// }

// export const get_invitation_fail = (err) => {
//   return {
//     type: actionType.GET_INVITATION_FAILURE,
//     err: err
//   }
// }

// export const get_invitation = () => {
//   return (dispatch: Dispatch) => {
//     axios.get('https://hivent.xyz/api/users)
//   }
// }