import React, { useContext, useMemo } from 'react'
import Card from 'antd/lib/card/Card'
import { Column } from '@ant-design/plots'

import DriverDetailContext from '../context/DriverDetailContext'
import { handleDriverSummary } from '../helper/DriverInfoAPI'
import { TEAM_CONST } from '../../global/constant/Teams'

export default function DriverDetailChart () {
  const { loading, summaryData } = useContext(DriverDetailContext)

  const data = useMemo(() => handleDriverSummary(summaryData), [summaryData])

  return (
    <Card>
      <Column
        loading={loading}
        data={data ?? []}
        xField='year'
        yField='points'
        seriesField='constructor'
        color={({ constructor }) => TEAM_CONST[constructor]
          ? TEAM_CONST[constructor].color
          : '#000000'
        }
      />
    </Card>
  )
}
