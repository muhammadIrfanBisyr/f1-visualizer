import React from 'react'

import Content from '../component/season-summary/Content'
import SeasonSummaryContextProvider from '../component/season-summary/context/SeasonSummaryContextProvider'

export default function Summary ({ match: { params } }) {
  return (
        <SeasonSummaryContextProvider initValue={params}>
            <Content/>
        </SeasonSummaryContextProvider>
  )
}
