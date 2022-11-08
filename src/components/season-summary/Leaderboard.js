import React, { useContext, useMemo } from 'react'
import { Card, List, Avatar } from 'antd'
import { CrownFilled } from '@ant-design/icons'
import SeasonSummaryContext from './context/SeasonSummaryContext'
import CountryFlag from '../global/flag/CountryFlag'

const LeaderboardTop10 = ({ rank, driverInfo }) => {
  return (
        <Card className='leaderboard-cell' bodyStyle={{ padding: '8px' }}>
          {
            rank <= 3 &&
            <>
              <CrownFilled style={{ color: 'blue' }}></CrownFilled>
              <Avatar size={50} style={{ marginTop: '16px', border: '3px solid #ffffff' }}/>
            </>
          }
          <CountryFlag nationality={driverInfo.nationality}/>
          {
            driverInfo.driverName
          }
          {
            driverInfo.points
          }
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
