import React, { useContext, useMemo } from 'react'
import { Card, Typography, Row, Col, Popover, Space } from 'antd'
import { SettingOutlined, BarChartOutlined, LineChartOutlined } from '@ant-design/icons'
import { Column } from '@ant-design/plots'

import DriverDetailContext from '../context/DriverDetailContext'
import { handleDriverSummary } from '../helper/DriverInfoAPI'
import { TEAM_CONST } from '../../global/constant/Teams'

import Select from '../../global/select/Select'

const OptionsPopover = () => {
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
      Chart Type <Select options={chartOption} width={125}/>
      Data <Select options={dataOption} width={190}/>
    </Space>
  )
}

const TitlePanel = () => {
  return (
    <Row>
      <Col span={12}><Typography.Title level={5}>Career Point Summary</Typography.Title></Col>
      <Col span={12} style={{ textAlign: 'right', paddingRight: '8px' }}>
        <Popover content={OptionsPopover} trigger="click" placement='bottomRight'>
          <SettingOutlined/>
        </Popover>
      </Col>
    </Row>
  )
}

export default function DriverDetailChart () {
  const { loading, summaryData } = useContext(DriverDetailContext)

  const data = useMemo(() => handleDriverSummary(summaryData), [summaryData])

  return (
    <Card
      className='driver-summary'
      bodyStyle={{ padding: '8px' }}
      title={<TitlePanel/>}
    >
      <Column
        className='driver-summary-chart'
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
