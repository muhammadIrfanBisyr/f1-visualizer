import React, {useState, useEffect, useContext} from 'react';
import { Card } from 'antd';

import RaceDetailContext from './context/RaceDetailContext';
import TeamLogo from '../global/logo/TeamLogo';
import { TEAM_CONST } from '../global/constant/Teams';

const PODIUM_HEIGHT = [110,85,60];
const PODIUM_WIDTH = 70;

function Stage({place, displayOrder}) {

    const { resultData } = useContext(RaceDetailContext);

    const [ podiumColor, setPodiumColor] = useState('#ffffff');
    const [ curHeight, setCurheight] = useState(40);
    const [ constructorName, setConstructorName ] = useState('')
    const [ driverName, setDriverName ] = useState('')

    useEffect(() => {
        const interval = setInterval(() => {  
            if(curHeight < PODIUM_HEIGHT[place])
                setCurheight(curr => ++curr);
        })
        return () => { clearInterval(interval) }
    },[place, curHeight])

    useEffect(() => {
        if(resultData.length !== 0){
            setCurheight(0);
            setPodiumColor(TEAM_CONST[resultData[place].constructorId].color);
            setConstructorName(resultData[place].constructorId);
            setDriverName(resultData[place].driver.split(' ')[1])
        } else {
            setPodiumColor('#ffffff');
            setCurheight(0);
            setConstructorName('');
            setDriverName('');
        }

    },[place, resultData])

    return (
        <div
            class='podium-stage' 
            style={{
                left: displayOrder * PODIUM_WIDTH,
                backgroundColor: podiumColor, 
                height: curHeight, 
                width: PODIUM_WIDTH,
            }}
        >
            <div style={{position: 'absolute', textAlign: 'center', width: 'inherit', top: '-20px', fontWeight: 'bold'}}>{driverName}</div>
            <TeamLogo name={constructorName}/>
        </div>
    );
}

export default function Podium() {
    return (
        <Card className='race-result-container'>
            <div className='podium-container'>
                <Stage place={1} displayOrder={0}/>
                <Stage place={0} displayOrder={1}/>
                <Stage place={2} displayOrder={2}/>
            </div>
        </Card>
    );
}