import React from 'react'

import RaceDetailMain from '../components/race-detail/RaceDetailMain'
import RaceDetailContextProvider from '../components/race-detail/context/RaceDetailContextProvider'

export default function Detail ({ match: { params } }) {
  return (
      <RaceDetailContextProvider initValue={params}>
          <RaceDetailMain/>
      </RaceDetailContextProvider>
  )
}
