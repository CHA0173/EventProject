import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { searchEventsReducers } from "./reducers/searchEventsReducers";
export const store = createStore(combineReducers({
    searchEvent: searchEventsReducers
}),
applyMiddleware(thunk));