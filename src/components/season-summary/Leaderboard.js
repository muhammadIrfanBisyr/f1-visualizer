import React, { useContext, useMemo } from 'react'
import { Card, List, Avatar, Row, Col, Typography, Space } from 'antd'
import { CrownFilled, DollarCircleFilled } from '@ant-design/icons'
import SeasonSummaryContext from './context/SeasonSummaryContext'
import CountryFlag from '../global/flag/CountryFlag'

const { Text } = Typography
const COLOR = ['#ffdd34', '#e2e2e2', '#d3a230']

const CrownedAvatar = ({ rank, driverInfo }) => {
  return (
    <>
      <CrownFilled style={{ fontSize: '20px', color: COLOR[rank - 1], position: 'absolute', top: '3px', left: '15px' }}></CrownFilled>
      <Avatar size={50} style={{ marginTop: '16px', border: '3px solid #ffffff' }}/>
    </>
  )
}

const Top3Stats = ({ rank, driverInfo }) => {
  return (
    <Row align='middle'>
      <Col span={7}>
        <CrownedAvatar driverInfo={driverInfo} rank={rank} />
      </Col>
      <Col>
        <Row>
          <Col>
            <DriverFlagAndName nationality={driverInfo.nationality} driverName={driverInfo.driverName} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Space>
              <DollarCircleFilled style={{ color: COLOR[0] }}/> 10
              <DollarCircleFilled style={{ color: COLOR[1] }}/> 20
              <DollarCircleFilled style={{ color: COLOR[2] }}/> 30
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

const DriverFlagAndName = ({ nationality, driverName }) => {
  return (
    <Space>
      <CountryFlag nationality={nationality}/>
      <Text strong>{driverName}</Text>
    </Space>
  )
}

const LeaderboardTop10 = ({ rank, driverInfo }) => {
  return (
        <Card className='leaderboard-cell' bodyStyle={{ padding: '8px' }}>
          <Row align='middle'>
            <Col span={20}>
                {
                  rank <= 3
                    ? <Top3Stats rank={rank} driverInfo={driverInfo}/>
                    : <DriverFlagAndName nationality={driverInfo.nationality} driverName={driverInfo.driverName} />
                }
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
                <Text strong>{driverInfo.points}</Text>
            </Col>
          </Row>
        </Card>
  )
}

export default function LeaderBoard ({ loading }) {
  const { dataResults } = useContext(SeasonSummaryContext)
  const leaderboardData = useMemo(() => dataResults?.dataSource?.map((item) => ({
    points: item.points,
    nationality: item.nationality,
    driverId: item.driverId,
    driverName: item.driverName
  })).sort((a, b) => b.points - a.points), [dataResults])

  return (
    <Card className='leaderboard' bodyStyle={{ padding: '0px' }} title='Leaderboard'>
      <List
        loading={loading}
        dataSource={leaderboardData}
        renderItem={(item, index) => (
          <>
            {
              index < 10 && <LeaderboardTop10 rank={index + 1} driverInfo={item} />
            }
          </>
        )}
      />
    </Card>
  )
}
