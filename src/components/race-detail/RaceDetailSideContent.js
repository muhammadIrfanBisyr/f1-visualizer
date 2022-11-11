import React from 'react'
import { Col, Row } from 'antd'

import RaceDetailPodium from './side-content/RaceDetailPodium'
import RaceDetailTrackInfo from './side-content/RaceDetailTrackInfo'

export default function RaceDetailSideContent () {
  return (
    <>
      <Row>
          <Col>
              <RaceDetailTrackInfo/>
          </Col>
      </Row>
      <Row>
          <Col>
              <RaceDetailPodium/>
          </Col>
      </Row>
    </>
  )
}
