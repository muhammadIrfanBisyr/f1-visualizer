import React, {useState, useEffect, useContext} from 'react';
import { Card, Space } from 'antd';

import RaceDetailContext from './context/RaceDetailContext';
import SessionSelect from './select/SessionSelect';
import TeamLogo from '../global/logo/TeamLogo';
import CountryFlag from '../global/flag/CountryFlag';
import { TEAM_CONST } from '../global/constant/Teams';

const PODIUM_HEIGHT = [100,75,50];
const PODIUM_WIDTH = 70;

const PODIUM_INITIAL_STATE = {
    podiumColor: '#ffffff',
    height: 40,
    constructorName: '',
    driverName: '',
    nationality: ''
}

function Stage({place, displayOrder}) {

    const { resultData } = useContext(RaceDetailContext);

    const [state, setState] = useState(PODIUM_INITIAL_STATE);

    useEffect(() => {
        setTimeout(() => {
            if(state.height < PODIUM_HEIGHT[place])
                setState((prevState) => ({...prevState, height: ++prevState.height}));
        }, 3);
    },[state.height])

    useEffect(() => {
        if(resultData.length !== 0){
            setState({
                podiumColor: TEAM_CONST[resultData[place].constructorId].color,
                height: 0,
                constructorName: resultData[place].constructorId,
                driverName: resultData[place].driver.split(' ')[1],
                nationality: resultData[place].nationality
            });
        } else {
            setState({...PODIUM_INITIAL_STATE, height: 0})
        }

    },[resultData])

    return (
        <div
            class='podium-stage' 
            style={{
                left: displayOrder * PODIUM_WIDTH,
                backgroundColor: state.podiumColor, 
                height: state.height, 
                width: PODIUM_WIDTH,
            }}
        >
            <div style={{position: 'absolute', textAlign: 'center', width: 'inherit', top: '-35px', fontWeight: 'bold'}}>
                <CountryFlag nationality={state.nationality}/>
                {state.driverName}
            </div>
            <TeamLogo name={state.constructorName}/>
        </div>
    );
}

export default function Podium() {
    return (
        <Card className='race-result-container'>
            <Space><SessionSelect/> <div className='card-title'> Session Result </div></Space>
            <div className='podium-container'>
                <Stage place={1} displayOrder={0}/>
                <Stage place={0} displayOrder={1}/>
                <Stage place={2} displayOrder={2}/>
            </div>
        </Card>
    );
}