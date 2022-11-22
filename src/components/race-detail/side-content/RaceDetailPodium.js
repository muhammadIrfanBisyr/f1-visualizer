import React, { useState, useEffect, useContext, useMemo } from 'react'
import { Card, Skeleton, Row, Col, Typography } from 'antd'

import TeamLogo from '../../global/logo/TeamLogo'
import CountryFlag from '../../global/flag/CountryFlag'
import { TEAM_CONST } from '../../global/constant/Teams'

import RaceDetailContext from '../context/RaceDetailContext'
import { apiDataToTableData } from '../helper/RaceDetailAPI'
import { calculatePositionChange } from '../helper/utils'
import { SESSION } from '../../global/constant/Session'

const PODIUM_HEIGHT = [100, 75, 50]
const PODIUM_WIDTH = 70

const PODIUM_INITIAL_STATE = {
  podiumColor: '#ffffff',
  height: 40,
  constructorName: '',
  driverName: '',
  nationality: ''
}

const Stage = ({ place, displayOrder, podiumData = [] }) => {
  const [state, setState] = useState(PODIUM_INITIAL_STATE)

  useEffect(() => {
    setTimeout(() => {
      if (state.height < PODIUM_HEIGHT[place]) { setState((prevState) => ({ ...prevState, height: ++prevState.height })) }
    }, 3)
  }, [state.height])

  useEffect(() => {
    if (podiumData.length !== 0) {
      setState({
        podiumColor: TEAM_CONST[podiumData[place].constructorId].color,
        height: 0,
        constructorName: podiumData[place].constructorId,
        driverName: podiumData[place].driver.split(' ')[1],
        nationality: podiumData[place].nationality
      })
    } else {
      setState({ ...PODIUM_INITIAL_STATE, height: 0 })
    }
  }, [podiumData])

  return (
        <div
            className='podium-stage'
            style={{
              left: displayOrder * PODIUM_WIDTH,
              backgroundColor: state.podiumColor,
              height: state.height,
              width: PODIUM_WIDTH
            }}
        >
            <div style={{ position: 'absolute', textAlign: 'center', width: 'inherit', top: '-35px', fontWeight: 'bold' }}>
                <CountryFlag nationality={state.nationality}/>
                {state.driverName}
            </div>
            <TeamLogo name={state.constructorName}/>
        </div>
  )
}

const TextInfo = ({ textData = [] }) => {
  return (
    <Row>
      {
        textData.map((item) => (
          <>
            <Col span={10}><Typography.Text strong>{item.label}</Typography.Text></Col>
            <Col span={14}>{item.value}</Col>
          </>
        ))
      }
    </Row>
  )
}

export default function RaceDetailPodium () {
  const { resultData, session, loading } = useContext(RaceDetailContext)
  const podiumData = useMemo(() => apiDataToTableData(resultData, session), [resultData])
  const postionChangesData = podiumData.map((item) => ({
    driverName: item.lastName,
    pos: calculatePositionChange(item.grid, item.pos)
  })) ?? []

  const txtPositonChanges = (txtData) => (
    `${txtData?.driverName} ${Math.abs(txtData?.pos)} positions`
  )

  const txtFastestLap = (txtData) => (
    `${txtData?.lastName} on lap ${txtData?.fastestLapOnLap} ${txtData?.fastestLapTime}`
  )

  const txtFastestSession = (txtData, session) => (
    `${txtData?.lastName} ${txtData?.[session]}`
  )

  const txtDataRace = [{
    label: 'Fastest Lap',
    value: txtFastestLap(podiumData.sort((a, b) => parseInt(a.fastestLapRank) - parseInt(b.fastestLapRank))[0])
  }, {
    label: 'Most Pos. Gain',
    value: txtPositonChanges(postionChangesData.sort((a, b) => a.pos - b.pos)[0])
  }, {
    label: 'Most Pos. Lost',
    value: txtPositonChanges(postionChangesData.sort((a, b) => a.pos - b.pos).slice(-1)[0])
  }, {
    label: 'Most Lap Led',
    value: 'Magnussen 30 Laps'
  }]

  const txtDataQualify = [{
    label: 'Fastest Q1',
    value: txtFastestSession(podiumData.find((item) => 'fQ1' in item), 'q1')
  }, {
    label: 'Fastest Q2',
    value: txtFastestSession(podiumData.find((item) => 'fQ2' in item), 'q2')
  }, {
    label: 'Fastest Q3',
    value: txtFastestSession(podiumData.find((item) => 'fQ3' in item), 'q3')
  }]

  return (
        <Card
          className='race-result-container'
          title={<Typography.Title level={5}>Session Summary</Typography.Title>}
        >
            <div className='card-title'>  </div>
            {
                loading
                  ? <Skeleton active/>
                  : <>
                    <div className='podium-container'>
                        <Stage place={1} displayOrder={0} podiumData={podiumData}/>
                        <Stage place={0} displayOrder={1} podiumData={podiumData}/>
                        <Stage place={2} displayOrder={2} podiumData={podiumData}/>
                    </div>
                    <TextInfo textData={session === SESSION.QUALIFICATION.value ? txtDataQualify : txtDataRace}/>
                </>
            }
        </Card>
  )
}
