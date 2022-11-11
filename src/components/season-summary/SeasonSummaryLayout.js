import React from 'react'
import { Row, Col } from 'antd'

import SeasonSummaryMainContent from './SeasonSummaryMainContent'
import SeasonSummarySideContent from './SeasonSummarySideContent'

export default function SeasonSummaryLayout ({ loading }) {
  return (
    <Row>
        <Col span={19}>
          <SeasonSummaryMainContent loading={loading}/>
        </Col>
        <Col span={5}>
          <SeasonSummarySideContent loading={loading}/>
        </Col>
    </Row>
  )
}
