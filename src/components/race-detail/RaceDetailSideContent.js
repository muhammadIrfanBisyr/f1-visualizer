import React from 'react'
import { Col, Row } from 'antd'

import RaceDetailPodium from './side-content/RaceDetailPodium'
import RaceDetailTrackInfo from './side-content/RaceDetailTrackInfo'

export default function RaceDetailSideContent () {
  return (
    <>
      <Row gutter={[16, 16]}>
          <Col span={24}>
              <RaceDetailTrackInfo/>
          </Col>
          <Col span={24}>
              <RaceDetailPodium/>
          </Col>
      </Row>
    </>
  )
}
