import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { searchEventsReducers } from "./reducers/searchEventsReducers";
import  EventReducer  from './reducers/CreateEvent';
import { authReducer } from "./reducers/auth";
import { getEventReducer } from './reducers/search';



export const store = createStore(combineReducers({
    event: EventReducer,
    authReducer: authReducer,
    getEventReducer: getEventReducer
}),
applyMiddleware(thunk));