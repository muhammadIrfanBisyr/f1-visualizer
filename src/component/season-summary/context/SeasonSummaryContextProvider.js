import React, { useReducer } from 'react'
import SeasonSummaryContext, {SEASON_SUMMARY_INIT_VALUE} from './SeasonSummaryContext'

const ACTION = {
    SET_YEAR: 'SET_YEAR',
};

function reducer(state, {type, payload}){
    switch (type) {
        case ACTION.SET_YEAR:
            return {...state, year: payload};
        default:
            return state;
    }
}

export default function SeasonSummaryContextProvider({children}) {
    const [state, dispatch] = useReducer(reducer, SEASON_SUMMARY_INIT_VALUE);

    const setYear = (data) => {
        dispatch({ type: ACTION.SET_YEAR, payload: data});
    }

    return (
        <SeasonSummaryContext.Provider
            value={{
                ...state,
                actions: {
                    setYear,
                }
            }}>
            {children}
        </SeasonSummaryContext.Provider>
    )
}