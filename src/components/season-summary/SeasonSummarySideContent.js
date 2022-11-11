import React from 'react'

import SeasonSummaryLeaderboard from './side-content/SeasonSummaryLeaderboard'

export default function SeasonSummarySideContent ({ loading }) {
  return (
      <SeasonSummaryLeaderboard loading={loading}/>
  )
}
