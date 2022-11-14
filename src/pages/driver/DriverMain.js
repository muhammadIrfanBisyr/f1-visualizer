import React from 'react'

import DriverDetail from './DriverDetail'
import DriverList from './DriverList'

export default function DriverMain ({ match: { params } }) {
  return (
    <>
      {
          params.driverId
            ? <DriverDetail driverId={params.driverId} />
            : <DriverList/>
      }
    </>
  )
}
