import React, {useEffect, useState, useContext} from 'react';
import { Select } from 'antd';

import RaceDetailContext from '../context/RaceDetailContext';
import TrackInfoContext from '../context/TrackInfoContext';
import { handleAPITracks } from '../helper/handler';

const {Option} = Select;

export default function TrackSelect(){

    const { actions: {setLoading, setTrackInfo}} = useContext(TrackInfoContext);
    const { track, year, actions: {setTrack} } = useContext(RaceDetailContext);

    const [ trackOptions, setTracksOptions ] = useState([]);

    useEffect(() =>{
        if(setLoading)
            handleAPITracks({year}, {setTracksOptions, setLoading});
    },[year])
    
    return(
        <Select 
            defaultValue={track}
            value={track}
            onChange={(e) => {setTrack(e); setTrackInfo(trackOptions[e-1])}}
            className='detail-title-selectable track-select'
        >
            {
                trackOptions.map((item, i) => {
                    return(<Option value={item.round} key={i}> {item.raceName} </Option>)
                })
            }
        </Select>
    )
}