import React from 'react'

import SeasonSummaryMain from '../components/season-summary/SeasonSummaryMain'
import SeasonSummaryContextProvider from '../components/season-summary/context/SeasonSummaryContextProvider'

export default function Summary ({ match: { params } }) {
  return (
    <SeasonSummaryContextProvider initValue={params}>
        <SeasonSummaryMain/>
    </SeasonSummaryContextProvider>
  )
}
