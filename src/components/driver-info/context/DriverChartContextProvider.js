import React, { useReducer } from 'react'

import DriverChartContext, { INITIAL_VALUE } from './DriverChartContext'

const ACTION = {
  SET_CHART_TYPE: 'SET_CHART_TYPE',
  SET_DATA_TYPE: 'SET_DATA_TYPE'
}

function reducer (state, { type, payload }) {
  switch (type) {
    case ACTION.SET_CHART_TYPE:
      return { ...state, chartType: payload }
    case ACTION.SET_DATA_TYPE:
      return { ...state, dataType: payload }
    default:
      return state
  }
}

export default function DriverChartContextProvider ({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_VALUE)

  const setChartType = (data) => {
    dispatch({ type: ACTION.SET_CHART_TYPE, payload: data })
  }

  const setDataType = (data) => {
    dispatch({ type: ACTION.SET_DATA_TYPE, payload: data })
  }

  return (
    <DriverChartContext.Provider value={{ ...state, actions: { setChartType, setDataType } }}>
      {children}
    </DriverChartContext.Provider>
  )
}
