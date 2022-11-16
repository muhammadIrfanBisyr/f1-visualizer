import React from 'react'

import DriverListFilter from '../../components/driver-info/DriverListFilter'
import DriverListContextProvider from '../../components/driver-info/context/DriverListContextProvider'
import DriverListing from '../../components/driver-info/DriverListing'

export default function DriverList () {
  return (
    <DriverListContextProvider>
      <DriverListFilter/>
      <DriverListing/>
    </DriverListContextProvider>
  )
}
