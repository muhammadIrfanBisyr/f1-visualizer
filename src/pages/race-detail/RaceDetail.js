import React from 'react'

import Content from '../../components/race-detail/Content'
import RaceDetailContextProvider from '../../components/race-detail/context/RaceDetailContextProvider'

export default function Detail ({ match: { params } }) {
  return (
        <RaceDetailContextProvider initValue={params}>
            <Content/>
        </RaceDetailContextProvider>
  )
}
