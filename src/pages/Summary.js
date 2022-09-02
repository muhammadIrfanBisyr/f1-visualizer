import React from 'react'

import Content from '../components/season-summary/Content'
import SeasonSummaryContextProvider from '../components/season-summary/context/SeasonSummaryContextProvider'

export default function Summary ({ match: { params } }) {
  return (
        <SeasonSummaryContextProvider initValue={params}>
            <Content/>
        </SeasonSummaryContextProvider>
  )
}
