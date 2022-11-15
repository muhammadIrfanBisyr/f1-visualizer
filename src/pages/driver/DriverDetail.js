import React from 'react'

import DriverDetailContextProvider from '../../components/driver-info/context/DriverDetailContextProvider'
import DriverDetailMain from '../../components/driver-info/driver-detail/DriverDetailMain'

export default function DriverDetail ({ driverId }) {
  return (
    <DriverDetailContextProvider initValue={{ driverId }}>
      <DriverDetailMain/>
    </DriverDetailContextProvider>
  )
}
