import { FETCH_EVENTS_FAILURE, FETCH_EVENTS_REQUEST, FETCH_EVENTS_SUCCESS } from './types'

export const fetchingEventsRequest = () => ({type: FETCH_EVENTS_REQUEST})
export const fetchingEventsSuccess = (json) => ({
    type: FETCH_EVENTS_SUCCESS,
    payload: json
})
export const fetchingEventsFailure = (error) => ({
    type: FETCH_EVENTS_FAILURE,
    payload: error
})

export const fetchingEvents = () => {
    return async dispatch => {
        dispatch(fetchingEventsRequest())
        try {
            let response = await fetch('localhost:8080/api/search/?name=')
            let json = await response.json();
            dispatch(fetchingEventsSuccess(json.results))
        } catch(error){
            dispatch(fetchingEventsFailure(error))
        }
    }
}