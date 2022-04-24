import React, {useState, useEffect} from 'react';
import { Card } from 'antd';

import TeamLogo from '../global/logo/TeamLogo';
import { TEAM_CONST } from '../global/constant/Teams';

const PODIUM_HEIGHT = [110,85,60];
const PODIUM_WIDTH = 70;

function Stage({place, displayOrder}) {

    const pl = ['mercedes', 'red_bull', 'ferrari'];
    const bg = TEAM_CONST[pl[place]].color;
   
    const [curHeight, setCurheight] = useState(40);

    useEffect(() => {
        const interval = setInterval(() => {  
            if(curHeight < PODIUM_HEIGHT[place])
                setCurheight(curr => ++curr);
        }, 3)
        return () => { clearInterval(interval) }
    },[place, curHeight])

    return (
        <div 
            class='podium-stage' 
            style={{
                left: displayOrder * PODIUM_WIDTH,
                backgroundColor: bg, 
                height: curHeight, 
                width: PODIUM_WIDTH,
            }}
        >
            <TeamLogo name={pl[place]}/>
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