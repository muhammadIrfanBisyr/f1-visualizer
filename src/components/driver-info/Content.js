import React from 'react'

import DriverList from './list/DriverList'
import DriverListFilter from './DriverListFilter'
import DriverInfoContextProvider from './context/DriverInfoContextProvider'

export default function Content () {
  return (
      <DriverInfoContextProvider>
        <DriverListFilter/>
        <DriverList/>
      </DriverInfoContextProvider>
  )
}
