import { 
    FETCH_EVENTS_FAILURE, 
    FETCH_EVENTS_REQUEST, 
    FETCH_EVENTS_SUCCESS 
} from '../actions/types'

const initialState = {
    isFetching: false,
    errorMessage: '',
    events: []
}

export const searchEventsReducers = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_EVENTS_REQUEST:
            return { ...state, isFetching: true};
        case FETCH_EVENTS_FAILURE:
            return { ...state, isFetching: false, errorMessage: action.payload}
        case FETCH_EVENTS_SUCCESS:
            return { ...state, isFetching: false, events: action.payload}
        default:
            return state
    }
}