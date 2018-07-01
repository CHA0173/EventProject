import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { searchEventsReducers } from "./reducers/searchEventsReducers";
import  EventReducer  from './reducers/Event';
import { authReducer } from "./reducers/auth";
import { GET_EVENT_REDUCER } from './reducers/getEvent';
import { userReducer } from "./reducers/getUser";
import { viewReducer } from "./reducers/getView";
import { getEventReducer } from "./reducers/getViewEvent";



export const store = createStore(combineReducers({
    event: EventReducer,
    authReducer: authReducer,
    getEvent: GET_EVENT_REDUCER,
    getUser: userReducer,
    getView: viewReducer,
    getViewEvent: getEventReducer,
}),
applyMiddleware(thunk));