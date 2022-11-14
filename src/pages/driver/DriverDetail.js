import React, { useEffect, useState } from 'react'
import { message, Skeleton, Row, Col, Card, Typography, Space } from 'antd'
// import { FieldNumberOutlined, TrophyOutlined, DollarCircleOutlined, CrownOutlined } from '@ant-design/icons'

import DriverDetailStatic from '../../components/driver-info/DriverDetailStatistic'

import useFetchAPI from '../../hooks/useFetchAPI'
import DriverAvatar from '../../components/global/avatar/DriverAvatar'

const { Title, Text } = Typography

export default function DriverDetail ({ driverId }) {
  const fetcher = useFetchAPI()
  const [loading, setLoading] = useState(false)
  const [dataResult, setDataResult] = useState({})

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await fetcher({ url: `https://ergast.com/api/f1/drivers/${driverId}.json` })
      setDataResult({ ...result?.data?.MRData?.DriverTable?.Drivers[0] })
    } catch (e) {
      message(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [driverId])

  return (
    loading
      ? <Skeleton/>
      : <Row>
        <Col span={12}>
          <Card style={{ width: '96%', margin: '0 auto' }}>
            <Row>
              <Col>
                <DriverAvatar shape='square' driverId={dataResult?.driverId} size={160}/>
              </Col>
              <Col span={16} style={{ marginLeft: '16px' }}>
                <Title level={3}>{`${dataResult?.givenName} ${dataResult?.familyName}`}</Title>
                <Space direction='vertical' size='small'>
                  <span><Text strong> Nationality</Text> {dataResult.nationality}</span>
                  <span><Text strong> Date of Birth</Text> {dataResult.dateOfBirth}</span>
                  <span><Text strong> Current Team</Text> {dataResult.permanentNumber}</span>
                  <span><Text strong> Car number</Text> {dataResult.permanentNumber}</span>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col>
                <DriverDetailStatic driverId={dataResult?.driverId}/>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card/>
        </Col>
      </Row>
  )
}
