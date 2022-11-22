import React, { useState, useEffect, useContext, useMemo } from 'react'
import { Card, Skeleton, Row, Col, Typography } from 'antd'

import TeamLogo from '../../global/logo/TeamLogo'
import CountryFlag from '../../global/flag/CountryFlag'
import { TEAM_CONST } from '../../global/constant/Teams'

import RaceDetailContext from '../context/RaceDetailContext'
import { apiDataToTableData } from '../helper/RaceDetailAPI'

const PODIUM_HEIGHT = [100, 75, 50]
const PODIUM_WIDTH = 70

const PODIUM_INITIAL_STATE = {
  podiumColor: '#ffffff',
  height: 40,
  constructorName: '',
  driverName: '',
  nationality: ''
}

const Stage = ({ place, displayOrder }) => {
  const { resultData, session } = useContext(RaceDetailContext)

  const [state, setState] = useState(PODIUM_INITIAL_STATE)
  const podiumData = useMemo(() => apiDataToTableData(resultData, session), [resultData])

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
            <Col span={12}><Typography.Text strong>{item.label}</Typography.Text></Col>
            <Col span={12}>{item.value}</Col>
          </>
        ))
      }
    </Row>
  )
}

export default function RaceDetailPodium () {
  const { loading } = useContext(RaceDetailContext)

  const textData = [{
    label: 'Fastest Lap',
    value: 'Leclerc On Lap 53 1:30.999'
  }, {
    label: 'Most Position Gain',
    value: 'Hamilton 5 Position'
  }, {
    label: 'Most Position Lost',
    value: 'Magnussen 1 Position'
  }, {
    label: 'Most Lap Led',
    value: 'Magnussen 30 Laps'
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
                        <Stage place={1} displayOrder={0}/>
                        <Stage place={0} displayOrder={1}/>
                        <Stage place={2} displayOrder={2}/>
                    </div>
                    <TextInfo textData={textData}/>
                </>
            }
        </Card>
  )
}
