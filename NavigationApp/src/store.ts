import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import  EventReducer  from './reducers/Event';
import { authReducer } from "./reducers/auth";
import { userReducer } from "./reducers/getUser";
import { getEventReducer } from "./reducers/getViewEvent";



export const store = createStore(combineReducers({
    event: EventReducer,
    authReducer: authReducer,
    getUser: userReducer,
    getViewEvent: getEventReducer,
}),
applyMiddleware(thunk, logger));