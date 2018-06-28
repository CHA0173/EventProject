import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { searchEventsReducers } from "./reducers/searchEventsReducers";
import  EventReducer  from './reducers/CreateEvent';
import { authReducer } from "./reducers/auth";
import { GET_EVENT_REDUCER } from './reducers/getEvent';



export const store = createStore(combineReducers({
    event: EventReducer,
    authReducer: authReducer,
    GET_EVENT_REDUCER: GET_EVENT_REDUCER
}),
applyMiddleware(thunk));