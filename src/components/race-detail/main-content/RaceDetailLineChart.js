import React, { useEffect, useState, useContext, useMemo } from 'react'
import { Space, Card, Row, Col, Typography, Popover } from 'antd'
import { Line } from '@ant-design/plots'
import { SettingOutlined } from '@ant-design/icons'

import RaceDetailContext from '../context/RaceDetailContext'

import { handleAPILineChart } from '../helper/RaceDetailAPI'
import { milisecondsToLapTime } from '../helper/utils'
import { TEAM_CONST } from '../../global/constant/Teams'

import Select from '../../global/select/Select'

const OptionsPopover = ({ yAxis, setYAxis }) => {
  const dataOption = [
    { label: 'Position Changes', value: 'pos' },
    { label: 'Lap Times', value: 'time' }
  ]

  return (
    <Space>
      Data
      <Select
        value={yAxis}
        onChange={(val) => setYAxis(val)}
        options={dataOption}
        width={190}
      />
    </Space>
  )
}

const TitlePanel = ({ yAxis, setYAxis }) => {
  const titleText = yAxis === 'pos' ? 'Position Changes' : 'Lap Times'

  return (
    <Row>
      <Col span={12}><Typography.Title level={5}>{titleText}</Typography.Title></Col>
      <Col span={12} style={{ textAlign: 'right', paddingRight: '8px' }}>
        <Popover content={<OptionsPopover yAxis={yAxis} setYAxis={setYAxis} />} trigger="click" placement='bottomRight'>
          <SettingOutlined/>
        </Popover>
      </Col>
    </Row>
  )
}

export default function RaceDetailLineChart () {
  const { track, year, resultData, lapsData, loading } = useContext(RaceDetailContext)

  const allData = useMemo(() => handleAPILineChart(resultData, lapsData), [track, year])

  const [yAxis, setYAxis] = useState('pos')
  const [chartConfig, setChartConfig] = useState({
    title: 'Position',
    tickInterval: 1,
    max: null,
    min: null
  })

  useEffect(() => {
    switch (yAxis) {
      case 'time':
        setChartConfig({
          title: 'Lap Time',
          tickInterval: 5000,
          max: allData?.chartLimit?.[1],
          min: allData?.chartLimit?.[0]
        })
        break
      case 'pos':
      default:
        setChartConfig({
          title: 'Position',
          tickInterval: 1,
          max: null,
          min: null
        })
        break
    }
  }, [yAxis, allData])

  return (
    <Card
        className='main-line-chart-container'
        bodyStyle={{ padding: '8px' }}
        title={<TitlePanel yAxis={yAxis} setYAxis={setYAxis}/>}
      >
        <Line
            className='main-line-chart'
            data={allData?.chartData ?? []}
            xField='lapNo'
            yField={yAxis}
            xAxis={{
              title: {
                text: 'Lap Number'
              }
            }}
            yAxis={{
              title: {
                text: chartConfig.title
              },
              label: {
                formatter: (item) => {
                  const formatted = yAxis === 'pos' ? Math.abs(item) : milisecondsToLapTime(-item)
                  return formatted
                }
              },
              tickInterval: chartConfig.tickInterval,
              max: chartConfig.max,
              min: chartConfig.min
            }}
            tooltip={{
              formatter: (item) => {
                const value = yAxis === 'pos' ? Math.abs(item.pos) : milisecondsToLapTime(-item.time)
                return { name: item.driverId, value }
              }
            }}
            seriesField='driverId'
            loading={loading}
            colorField='driverId'
            color= {({ driverId }) => TEAM_CONST[allData.driverTable[driverId]] ? TEAM_CONST[allData.driverTable[driverId]].color : '#000000'}
            smooth
        />
    </Card>
  )
}
