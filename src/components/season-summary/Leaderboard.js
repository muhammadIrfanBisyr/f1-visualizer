import React, { useContext, useMemo } from 'react'
import { Card, List, Avatar, Row, Col, Space } from 'antd'
import { CrownFilled } from '@ant-design/icons'
import SeasonSummaryContext from './context/SeasonSummaryContext'
import CountryFlag from '../global/flag/CountryFlag'

const COLOR = ['#ffdd34', '#e2e2e2', '#d3a230']

const CrownedAvatar = ({ rank, driverInfo }) => {
  return (
    <>
      <CrownFilled style={{ fontSize: '20px', color: COLOR[rank - 1], position: 'absolute', top: '3px', left: '15px' }}></CrownFilled>
      <Avatar size={50} style={{ marginTop: '16px', border: '3px solid #ffffff' }}/>
    </>
  )
}

const LeaderboardTop10 = ({ rank, driverInfo }) => {
  return (
        <Card className='leaderboard-cell' bodyStyle={{ padding: '8px' }}>
          <Row align='middle'>
            <Col span={20}>
              <Space>
                {
                rank <= 3 &&
                  <CrownedAvatar driverInfo={driverInfo} rank={rank} />
                }
                <CountryFlag nationality={driverInfo.nationality}/>
                {
                  driverInfo.driverName
                }
              </Space>
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
            {
                driverInfo.points
            }
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
    <Card className='leaderboard' bodyStyle={{ padding: '0px' }}>
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
