import React from 'react'
import { Collapse, Typography, Select } from 'antd'

import YearSelect from '../global/select/YearSelect'
import SeasonSummaryContext from './context/SeasonSummaryContext'

const { Panel } = Collapse
const { Title } = Typography

export default function Setting ({ title }) {
  return (
    <Collapse bordered={false} expandIconPosition='right'>
        <Panel header={<Title level={3}>{title}</Title>} key="1">
            Year <YearSelect context={SeasonSummaryContext}/>
            View Mode <Select />
        </Panel>
    </Collapse>
  )
}