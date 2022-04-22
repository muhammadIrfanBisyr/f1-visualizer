import React, {useEffect, useState, useContext} from 'react';
import { Select, message } from 'antd';
import axios from 'axios';

import RaceDetailContext from '../context/RaceDetailContext';

const {Option} = Select;

const processData = (res, setOpt) => {
    if(res.status === 200){
        const retVar = [];
        res.data.MRData.RaceTable.Races.forEach((item)=>{
            retVar.push({round: item.round, race:item.raceName})
        })

        setOpt(retVar)
    }
    else {
        message('Error Fetching Track Data');
    }
}

export default function TrackSelect(){

    const { track, year, actions: {setTrack} } = useContext(RaceDetailContext);
    const [ tracks, setTracks ] = useState([]);

    useEffect(() =>{
        axios.get(`http://ergast.com/api/f1/${year}.json`)
             .then(res => processData(res, setTracks))
    },[year])
    
    return(
        <Select 
            defaultValue={track}
            value={track}
            onChange={(e) => {setTrack(e)}}
            className='detail-title-selectable track-select'
        >
            {
                tracks.map((item, i) => {
                    return(<Option value={item.round} key={i}> {item.race} </Option>)
                })
            }
        </Select>
    )
}