import React, { useContext, useMemo } from 'react'
import { Line } from '@ant-design/plots'
import { generateLineChartData } from '../helper/SeasonSummaryAPI'

import SeasonSummaryContext from '../context/SeasonSummaryContext'

export default function SeasonSummaryLine () {
  const { dataResults, loading } = useContext(SeasonSummaryContext)

  const data = useMemo(() => generateLineChartData(dataResults?.dataSource, dataResults?.columns), [dataResults])

  return (
    <Line
      data={data}
      xField='round'
      yField='cumulativePoints'
      xAxis={{
        title: {
          text: 'Rounds'
        },
        label: {
          formatter: (item) => item
        }
      }}
      yAxis={{
        title: {
          text: 'Point Gained'
        }
      }}
      seriesField='driverId'
      loading={loading}
      smooth
    />)
}
