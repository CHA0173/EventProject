import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { searchEventsReducers } from "./reducers/searchEventsReducers";
import  EventReducer  from './reducers/CreateEvent';



export const store = createStore(combineReducers({
    event: EventReducer
}),
applyMiddleware(thunk));