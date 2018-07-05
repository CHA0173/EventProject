import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import  EventReducer  from './reducers/Event';
import { authReducer } from "./reducers/auth";
import { userReducer } from "./reducers/getUser";
import { getEventReducer } from "./reducers/getViewEvent";
// import { InviteReducer } from './reducers/invitation;



export const store = createStore(combineReducers({
    event: EventReducer,
    authReducer: authReducer,
    getUser: userReducer,
    getViewEvent: getEventReducer,
    // invite: InviteReducer,
}),
applyMiddleware(thunk, logger));