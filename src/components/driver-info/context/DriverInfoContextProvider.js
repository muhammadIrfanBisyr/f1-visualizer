import React, { useReducer } from 'react'
import DriverInfoContext, { DRIVER_INFO_INIT_VALUE } from './DriverInfoContext'

const ACTION = {
  SET_YEAR: 'SET_YEAR',
  SET_DATA_RESULTS: 'SET_DATA_RESULTS'
}

function reducer (state, { type, payload }) {
  switch (type) {
    case ACTION.SET_YEAR:
      return { ...state, year: payload }
    case ACTION.SET_DATA_RESULTS:
      return { ...state, dataResults: payload }
    default:
      return state
  }
}

export default function DriverInfoContextProvider ({ initValue, children }) {
  const _initValue = { ...DRIVER_INFO_INIT_VALUE, year: initValue?.year ?? DRIVER_INFO_INIT_VALUE.year }

  const [state, dispatch] = useReducer(reducer, _initValue)

  const setYear = (data) => {
    dispatch({ type: ACTION.SET_YEAR, payload: data })
  }

  const setDataResults = (data) => {
    dispatch({ type: ACTION.SET_DATA_RESULTS, payload: data })
  }

  return (
        <DriverInfoContext.Provider
            value={{
              ...state,
              actions: {
                setYear,
                setDataResults
              }
            }}>
            {children}
        </DriverInfoContext.Provider>
  )
}
