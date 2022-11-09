import React, { useReducer } from 'react'
import SeasonSummaryContext, { SEASON_SUMMARY_INIT_VALUE } from './SeasonSummaryContext'

const ACTION = {
  SET_YEAR: 'SET_YEAR',
  SET_DATA_MODE: 'SET_DATA_MODE',
  SET_DATA_RESULTS: 'SET_DATA_RESULTS'
}

function reducer (state, { type, payload }) {
  switch (type) {
    case ACTION.SET_YEAR:
      return { ...state, year: payload }
    case ACTION.SET_DATA_MODE:
      return { ...state, dataMode: payload }
    case ACTION.SET_DATA_RESULTS:
      return { ...state, dataResults: payload }
    default:
      return state
  }
}

export default function SeasonSummaryContextProvider ({ initValue, children }) {
  const _initValue = { ...SEASON_SUMMARY_INIT_VALUE, year: initValue?.year ?? SEASON_SUMMARY_INIT_VALUE.year }

  const [state, dispatch] = useReducer(reducer, _initValue)

  const setYear = (data) => {
    dispatch({ type: ACTION.SET_YEAR, payload: data })
  }

  const setDataMode = (data) => {
    dispatch({ type: ACTION.SET_DATA_MODE, payload: data })
  }

  const setDataResults = (data) => {
    dispatch({ type: ACTION.SET_DATA_RESULTS, payload: data })
  }

  return (
        <SeasonSummaryContext.Provider
            value={{
              ...state,
              actions: {
                setYear,
                setDataMode,
                setDataResults
              }
            }}>
            {children}
        </SeasonSummaryContext.Provider>
  )
}
