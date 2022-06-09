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

export default function SeasonSummaryContextProvider({initValue, children}) {

    const _initValue = {...SEASON_SUMMARY_INIT_VALUE, year: initValue?.year ?? SEASON_SUMMARY_INIT_VALUE.year};

    const [state, dispatch] = useReducer(reducer, _initValue);

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