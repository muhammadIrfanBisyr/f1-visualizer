import React, { useContext } from 'react'
import { Card, List, Avatar } from 'antd'
import { CrownFilled } from '@ant-design/icons'
import SeasonSummaryContext from './context/SeasonSummaryContext'

const LeaderBoardTop3 = ({ rank, driverInfo }) => {
  return (
        <Card>
          <CrownFilled></CrownFilled>
          <Avatar size={50} style={{ marginTop: '16px', border: '3px solid #ffffff' }}/>
          {
            driverInfo.driverName
          }
        </Card>
  )
}

export default function LeaderBoard () {
  const { dataResults } = useContext(SeasonSummaryContext)
  return (
    <List
      dataSource={dataResults?.dataSource}
      renderItem={(item, index) => (
        <>
          {
            index < 3
              ? <LeaderBoardTop3 rank={index + 1} driverInfo={item}/>
              : index <= 10 && <Card/>
          }
        </>
      )}
    />
  )
}
