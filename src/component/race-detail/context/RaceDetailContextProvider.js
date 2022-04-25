import React, { useReducer } from 'react'
import RaceDetailContext, {CONTEXT_INITIAL_STATE} from './RaceDetailContext'

const ACTION = {
    SET_TRACK: 'SET_TRACK',
    SET_YEAR: 'SET_YEAR',
    SET_SESSION: 'SET_SESSION',
    SET_CHART_TYPE: 'SET_CHART_TYPE',
    SET_LOADING: 'SET_LOADING',
    SET_RESULT_DATA: 'SET_RESULT_DATA',
};

function reducer(state, {type, payload}){
    switch (type) {
        case ACTION.SET_YEAR:
            return {...state, year: payload, track: '1' };
        case ACTION.SET_TRACK:
            return {...state, track: payload };
        case ACTION.SET_SESSION:
            return {...state, session: payload.session, chartType: payload.chartType, resultData: payload.resultData };
        case ACTION.SET_CHART_TYPE:
            return {...state, chartType: payload };
        case ACTION.SET_LOADING:
            return {...state, loading: payload };
        case ACTION.SET_RESULT_DATA:
            return {...state, resultData: payload };
        default:
            return state;
    }
}


export default function RaceDetailContextProvider({children}){
    
    const [state, dispatch] = useReducer(reducer, CONTEXT_INITIAL_STATE);

    const setTrack = (data) => {
        dispatch({ type: ACTION.SET_TRACK, payload: data});
    }

    const setYear = (data) => {
        dispatch({ type: ACTION.SET_YEAR, payload: data});
    }

    const setSession = (data) => {
        const chartType = data === 'Q' ? 'T' : state.chartType;
        dispatch({ type: ACTION.SET_SESSION, payload: {session: data, chartType, resultData: []}});
    }

    const setChartType = (data) => {
        dispatch({ type: ACTION.SET_CHART_TYPE, payload: data});
    }

    const setLoading = (data) => {
        dispatch({ type: ACTION.SET_LOADING, payload: data});
    }

    const setResultData = (data) => {
        dispatch({ type: ACTION.SET_RESULT_DATA, payload: data});
    }
    
    return(
        <RaceDetailContext.Provider 
            value={{
                ...state,
                actions: {
                    setTrack,
                    setYear,
                    setSession,
                    setChartType,
                    setLoading,
                    setResultData
                }

            }}>
            {children}
        </RaceDetailContext.Provider>
    )
}
