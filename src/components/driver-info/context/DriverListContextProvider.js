import React, { useReducer } from 'react'
import DriverListContext, { DRIVER_INFO_INIT_VALUE } from './DriverListContext'

const ACTION = {
  SET_YEAR: 'SET_YEAR',
  SET_DATA_RESULTS: 'SET_DATA_RESULTS',
  SET_LOADING: 'SET_LOADING'
}

function reducer (state, { type, payload }) {
  switch (type) {
    case ACTION.SET_YEAR:
      return { ...state, year: payload }
    case ACTION.SET_DATA_RESULTS:
      return { ...state, dataResults: payload }
    case ACTION.SET_LOADING:
      return { ...state, loading: payload }
    default:
      return state
  }
}

export default function DriverListContextProvider ({ initValue, children }) {
  const _initValue = { ...DRIVER_INFO_INIT_VALUE, year: initValue?.year ?? DRIVER_INFO_INIT_VALUE.year }

  const [state, dispatch] = useReducer(reducer, _initValue)

  const setYear = (data) => {
    dispatch({ type: ACTION.SET_YEAR, payload: data })
  }

  const setDataResults = (data) => {
    dispatch({ type: ACTION.SET_DATA_RESULTS, payload: data })
  }

  const setLoading = (data) => {
    dispatch({ type: ACTION.SET_LOADING, payload: data })
  }

  return (
        <DriverListContext.Provider
            value={{
              ...state,
              actions: {
                setYear,
                setLoading,
                setDataResults
              }
            }}>
            {children}
        </DriverListContext.Provider>
  )
}
