// import * as actionType from '../actions/types';

// export interface InvitationState {
//   invite: {
//     invite: number
//   }
//   invite: object[]
// }

// const initialState = {
//   loading: false,
//   invite: [],
//   error: null,
// }

// const InviteReducer = (state: InvitationState = initialState, action) => {
//   switch (action.type) {
//     case (actionType.SEND_INVITATION_START): {
//       return { ...state, loading: true }
//     }
//     case (actionType.SEND_INVITATION_SUCCESS): {
//       return { ...state, invite: action.invite, loading: false }
//     }
//     case (actionType.SEND_INVITATION_FAILURE): {
//       return { ...state, loading: false, error: action.err }
//     }

//     case (actionType.GET_INVITATION_START): {
//       return { ...state, loading: true }
//     }
//     case (actionType.GET_INVITATION_SUCCESS): {
//       return { ...state, invite: action.invite, loading: false }
//     }
//     case (actionType.GET_INVITATION_FAILURE): {
//       return { ...state, loading: false, error: action.err }
//     }

//     default:
//       return state
//   }
// }

// export default InviteReducer;