import React from 'react'

import DriverListFilter from '../../components/driver-info/DriverListFilter'
import DriverInfoContextProvider from '../../components/driver-info/context/DriverInfoContextProvider'
import DriverListing from '../../components/driver-info/DriverListing'

export default function DriverList () {
  return (
    <DriverInfoContextProvider>
      <DriverListFilter/>
      <DriverListing/>
    </DriverInfoContextProvider>
  )
}
