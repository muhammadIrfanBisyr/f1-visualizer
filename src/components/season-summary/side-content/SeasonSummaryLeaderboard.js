import React, { useContext, useMemo } from 'react'
import { Card, List, Row, Col, Typography, Space, Popover } from 'antd'
import { CrownFilled, DollarCircleFilled } from '@ant-design/icons'

import SeasonSummaryContext from '../context/SeasonSummaryContext'
import CountryFlag from '../../global/flag/CountryFlag'
import DriverAvatar from '../../global/avatar/DriverAvatar'
import { PODIUM_COLOR } from '../../global/constant/Podium'

const { Text } = Typography

const CrownedAvatar = ({ rank, driverInfo }) => {
  return (
    <>
      <CrownFilled style={{ fontSize: '20px', color: PODIUM_COLOR[rank], position: 'absolute', top: '3px', left: '13px' }}></CrownFilled>
      <DriverAvatar driverId={driverInfo.driverId} size={45} style={{ marginTop: '16px' }}/>
    </>
  )
}

const PodiumStats = ({ firstTot, secondTot, thirdTot }) => {
  return (
    <Space>
      <DollarCircleFilled style={{ color: PODIUM_COLOR.first }}/>{firstTot}
      <DollarCircleFilled style={{ color: PODIUM_COLOR.second }}/>{secondTot}
      <DollarCircleFilled style={{ color: PODIUM_COLOR.third }}/>{thirdTot}
    </Space>
  )
}

const Top3Stats = ({ rank, driverInfo }) => {
  return (
    <Row align='middle'>
      <Col style={{ paddingRight: '8px' }}>
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
            <PodiumStats
              firstTot={driverInfo.firstPlace}
              secondTot={driverInfo.secondPlace}
              thirdTot={driverInfo.thirdPlace}
            />
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
                    : <Popover
                        content={
                          <PodiumStats
                            firstTot={driverInfo.firstPlace}
                            secondTot={driverInfo.secondPlace}
                            thirdTot={driverInfo.thirdPlace}
                          />}>
                        <div>
                          <DriverFlagAndName nationality={driverInfo.nationality} driverName={driverInfo.driverName} />
                        </div>
                    </Popover>
                }
            </Col>
            <Col span={4} style={{ textAlign: 'right' }}>
                <Text strong>{driverInfo.points}</Text>
            </Col>
          </Row>
        </Card>
  )
}

export default function SeasonSummaryLeaderboard () {
  const { dataResults, loading } = useContext(SeasonSummaryContext)
  const leaderboardData = useMemo(() => dataResults?.dataSource?.map((item) => ({
    points: item.points,
    nationality: item.nationality,
    driverId: item.driverId,
    driverName: item.driverName,
    firstPlace: item.firstPlace,
    secondPlace: item.secondPlace,
    thirdPlace: item.thirdPlace
  })).sort((a, b) => b.points - a.points), [dataResults])

  return (
    <Card
      className='leaderboard'
      bodyStyle={{ padding: '0px' }}
      title='Leaderboard'
      loading={loading}
    >
      <List
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
