import React, { useState, useEffect, useContext, useMemo } from 'react'
import { Card, Skeleton } from 'antd'

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

function Stage ({ place, displayOrder }) {
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

export default function RaceDetailPodium () {
  const { loading } = useContext(RaceDetailContext)

  return (
        <Card className='race-result-container'>
            <div className='card-title'> Session Summary </div>
            {
                loading
                  ? <Skeleton active/>
                  : <>
                    <div className='podium-container'>
                        <Stage place={1} displayOrder={0}/>
                        <Stage place={0} displayOrder={1}/>
                        <Stage place={2} displayOrder={2}/>
                    </div>
                    <div>Fastest Lap: Leclerc On Lap 53 1:30.999</div>
                    <div>Most Position Gain: Hamilton 5 Position</div>
                    <div>Most Position Lost: Magnussen 1 Position</div>
                    <div>Most Lap Led: Magnussen 30 Laps</div>
                </>
            }
        </Card>
  )
}
