import React from 'react'
import { Row, Col } from 'antd'

import SeasonSummaryMainContent from './SeasonSummaryMainContent'
import SeasonSummarySideContent from './SeasonSummarySideContent'

export default function SeasonSummaryLayout () {
  return (
    <Row>
        <Col span={19}>
          <SeasonSummaryMainContent/>
        </Col>
        <Col span={5}>
          <SeasonSummarySideContent/>
        </Col>
    </Row>
  )
}
