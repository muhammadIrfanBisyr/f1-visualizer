import React, { useContext, useMemo } from 'react'
import { Card, Typography, Row, Col, Popover, Space } from 'antd'
import { SettingOutlined, BarChartOutlined, LineChartOutlined } from '@ant-design/icons'
import { Column, Line } from '@ant-design/plots'

import Select from '../../global/select/Select'
import { TEAM_CONST } from '../../global/constant/Teams'

import DriverChartContextProvider from '../context/DriverChartContextProvider'
import DriverDetailContext from '../context/DriverDetailContext'
import DriverChartContext from '../context/DriverChartContext'
import { handleDriverSummary } from '../helper/DriverInfoAPI'

const OptionsPopover = () => {
  const { chartType, dataType, actions: { setChartType, setDataType } } = useContext(DriverChartContext)

  const chartOption = [
    { label: 'Bar Chart', value: 'B', icon: <BarChartOutlined/> },
    { label: 'Line Chart', value: 'L', icon: <LineChartOutlined/> }
  ]

  const dataOption = [
    { label: 'Championship Position', value: 'C' },
    { label: 'Points Gained', value: 'P' }
  ]

  return (
    <Space>
      Chart Type
      <Select
        value={chartType}
        onChange={(val) => setChartType(val)}
        options={chartOption}
        width={125}
      />
      Data
      <Select
        value={dataType}
        onChange={(val) => setDataType(val)}
        options={dataOption}
        width={190}
      />
    </Space>
  )
}

const TitlePanel = () => {
  const { dataType } = useContext(DriverChartContext)
  const titleText = dataType === 'P' ? 'Career Point' : 'Championship Position'

  return (
    <Row>
      <Col span={12}><Typography.Title level={5}>{titleText} Summary</Typography.Title></Col>
      <Col span={12} style={{ textAlign: 'right', paddingRight: '8px' }}>
        <Popover content={OptionsPopover} trigger="click" placement='bottomRight'>
          <SettingOutlined/>
        </Popover>
      </Col>
    </Row>
  )
}

const ContentSwitcher = () => {
  const { loading, summaryData } = useContext(DriverDetailContext)
  const { chartType, dataType } = useContext(DriverChartContext)

  const yField = dataType === 'C' ? 'position' : 'points'
  const data = useMemo(() => handleDriverSummary(summaryData), [summaryData])

  switch (chartType) {
    case 'L':
      return (
        <Line
          className='driver-summary-chart'
          data={data ?? []}
          loading={loading}
          xField='year'
          yField={yField}
          yAxis={{
            label: {
              formatter: (item) => (dataType === 'C' ? -item : item)
            }
          }}
        />
      )
    case 'B':
      return (
        <Column
          className='driver-summary-chart'
          loading={loading}
          data={data ?? []}
          xField='year'
          yField={yField}
          yAxis={{
            label: {
              formatter: (item) => (dataType === 'C' ? -item : item)
            }
          }}
          seriesField='constructor'
          color={({ constructor }) => TEAM_CONST[constructor]
            ? TEAM_CONST[constructor].color
            : '#000000'
          }
        />
      )

    default:
      return <></>
  }
}

export default function DriverDetailChart () {
  return (
    <DriverChartContextProvider>
      <Card
        className='driver-summary'
        bodyStyle={{ padding: '8px' }}
        title={<TitlePanel/>}
      >
        <ContentSwitcher/>
      </Card>
    </DriverChartContextProvider>
  )
}
