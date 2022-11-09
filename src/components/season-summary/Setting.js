import React, { useContext } from 'react'
import { Collapse, Space, Typography } from 'antd'
import ChartTypeSelect from '../race-detail/select/ChartTypeSelect'

import YearSelect from '../global/select/YearSelect'
import TypeSelect from '../global/select/TypeSelect'
import SeasonSummaryContext from './context/SeasonSummaryContext'

const { Panel } = Collapse
const { Title } = Typography

export default function Setting ({ title }) {
  const { year, dataMode, actions: { setYear, setDataMode } } = useContext(SeasonSummaryContext)

  return (
    <Collapse bordered={false} expandIconPosition='right'>
        <Panel header={<Title level={3}>{title}</Title>} key="1">
          <Space>
            Year <YearSelect defaultValue={year} onChange={(val) => setYear(val)}/>
            View Type <ChartTypeSelect/>
            Data Type <TypeSelect defaultValue={dataMode} onChange={(val) => setDataMode(val)}/>
          </Space>
        </Panel>
    </Collapse>
  )
}
