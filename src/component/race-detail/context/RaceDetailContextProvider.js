import React, { useReducer } from 'react'
import RaceDetailContext, {initialState} from './RaceDetailContext'

const ACTION = {
    SET_TRACK: 'SET_TRACK',
    SET_YEAR: 'SET_YEAR',
};

function reducer(state, {type, payload}){
    switch (type) {
        case ACTION.SET_YEAR:
            return {...state, year: payload, track: '1' };
        case ACTION.SET_TRACK:
            return {...state, track: payload };
        default:
            return state;
    }
}


export default function RaceDetailContextProvider({children}){
    
    const [state, dispatch] = useReducer(reducer, initialState);

    const setTrack = (data) => {
        dispatch({ type: ACTION.SET_TRACK, payload: data});
    }

    const setYear = (data) => {
        dispatch({ type: ACTION.SET_YEAR, payload: data});
    }
        
    return(
        <RaceDetailContext.Provider 
            value={{
                ...state,
                actions: {
                    setTrack,
                    setYear
                }

            }}>
            {children}
        </RaceDetailContext.Provider>
    )
}
