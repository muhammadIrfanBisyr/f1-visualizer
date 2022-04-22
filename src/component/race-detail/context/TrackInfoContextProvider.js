import React, { useReducer } from 'react'
import TrackInfoContext, {TRACK_INFO_INITIAL_STATE} from './TrackInfoContext'

const ACTION = {
    SET_ALL_TRACK_INFO: 'SET_ALL_TRACK_INFO',
    SET_LOADING: 'SET_LOADING'

};

function reducer(state, {type, payload}){
    switch (type) {
        case ACTION.SET_ALL_TRACK_INFO:
            return {...state, ...payload };
        case ACTION.SET_LOADING:
            return {...state, isLoading: payload };
        default:
            return state;
    }
}

export default function TrackInfoContextProvider({children}){
    
    const [state, dispatch] = useReducer(reducer, TRACK_INFO_INITIAL_STATE);   

    const setTrackInfo = (data) => {
        dispatch({ type: ACTION.SET_ALL_TRACK_INFO, payload: data});
    } 

    const setLoading = (data) => {
        dispatch({ type: ACTION.SET_LOADING, payload: data});
    } 
        
    return(
        <TrackInfoContext.Provider 
            value={{
                ...state,
                actions: {                 
                    setTrackInfo,
                    setLoading
                }

            }}>
            {children}
        </TrackInfoContext.Provider>
    )
}
