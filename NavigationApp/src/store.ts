import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { searchEventsReducers } from "./reducers/searchEventsReducers";
import { IeventState, EventReducer } from './reducers/CreateEvent';


export const store = createStore(combineReducers({
    searchEvent: searchEventsReducers,
    Event: EventReducer
}),
applyMiddleware(thunk));