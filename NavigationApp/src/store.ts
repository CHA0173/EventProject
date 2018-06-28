import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { searchEventsReducers } from "./reducers/searchEventsReducers";
import  EventReducer  from './reducers/CreateEvent';
import { authReducer } from "./reducers/auth";



export const store = createStore(combineReducers({
    event: EventReducer,
    authReducer: authReducer
}),
applyMiddleware(thunk));