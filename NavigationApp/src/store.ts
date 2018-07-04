import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import  EventReducer  from './reducers/Event';
import { authReducer } from "./reducers/auth";
import { GET_EVENT_REDUCER } from './reducers/getEvent';
import { userReducer } from "./reducers/getUser";
import { getEventReducer } from "./reducers/getViewEvent";



export const store = createStore(combineReducers({
    event: EventReducer,
    authReducer: authReducer,
    getEvent: GET_EVENT_REDUCER,
    getUser: userReducer,
    getViewEvent: getEventReducer,
}),
applyMiddleware(thunk, logger));