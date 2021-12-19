import React, {useEffect, useState} from 'react';
import { Select, message } from 'antd';
import axios from 'axios';

const {Option} = Select;

const processData = (res, setOpt) => {
    if(res.status === 200){
        const retVar = [];
        res.data.MRData.RaceTable.Races.forEach((item)=>{
            console.log(item)
            retVar.push({round: item.round, race:item.raceName})
        })

        setOpt(retVar)
    }
    else {
        message('Error Fetching Data');
    }
}

export default function TrackSelect({year, track, setTrack}){

    const [tracks, setTracks] = useState([]);

    useEffect(() =>{
        axios.get(`http://ergast.com/api/f1/${year}.json`)
             .then(res => processData(res, setTracks))
    },[year])
    
    return(
        <Select 
            defaultValue={track}
            onChange={(e) => {setTrack(e)}}>
            {
                tracks.map((item) => {
                    return(<Option value={item.round}> {item.race} </Option>)
                })
            }
        </Select>
    )
}