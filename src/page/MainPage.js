import React, {useState, useEffect} from 'react';
import { Typography } from 'antd';
import axios from 'axios';

import YearSelect from '../component/YearSelect'
import TrackSelect from '../component/TrackSelect'

const { Title } = Typography;

export default function MainPage(){

    const [year, setYear] = useState('2021');
    const [track, setTrack] = useState('1');

    const [allData, setAllData] = useState('');

    useEffect(() =>{
        axios.get(`http://ergast.com/api/f1/${year}/${track}/results.json`)
            .then(res => { setAllData(JSON.stringify(res)) })
    },[year, track])

    return(
        <>
            <Title>
                F1 Visualizer
            </Title>

            <YearSelect year={year} setYear={setYear}/>
            <TrackSelect year={year} track={track} setTrack={setTrack}/>

            {allData}
        </>
    )
}