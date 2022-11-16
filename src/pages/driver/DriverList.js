import React from 'react'

import DriverListContextProvider from '../../components/driver-info/context/DriverListContextProvider'
import DriverListing from '../../components/driver-info/DriverListing'

export default function DriverList () {
  return (
    <DriverListContextProvider>
      <DriverListing/>
    </DriverListContextProvider>
  )
}
