import React from 'react'
import { Collapse, Typography } from 'antd'
import ChartTypeSelect from '../race-detail/select/ChartTypeSelect'

import YearSelect from '../global/select/YearSelect'
import SeasonSummaryContext from './context/SeasonSummaryContext'

const { Panel } = Collapse
const { Title } = Typography

export default function Setting ({ title }) {
  return (
    <Collapse bordered={false} expandIconPosition='right'>
        <Panel header={<Title level={3}>{title}</Title>} key="1">
            Year <YearSelect context={SeasonSummaryContext}/>
            View Mode <ChartTypeSelect/>
        </Panel>
    </Collapse>
  )
}
