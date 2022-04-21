import React, {useContext} from 'react';

import RaceDetailContext from './context/RaceDetailContext';

import CountryFlag from '../CountryFlag';
import image from '../../asset/track-map/bahrain.png'

export default function TrackInfo(){

    const {trackInfo} = useContext(RaceDetailContext);
 
    return (
        <div className='track-info-container'>
            <img src={image} alt='track' className='track-image'/>
            <div className='track-info-text-container'>
                <div>{`Grand Prix Name: ${trackInfo.raceName}`}</div>
                <div>{`Track Name     : ${trackInfo.trackName}`}</div>
                <div>{`Location       : ${trackInfo.locality}, ${trackInfo.country}`}<CountryFlag name='australian'/></div>
                <div>{`Local Time     : ${trackInfo.date} ${trackInfo.time} `}</div>
            </div>
        </div>
    )
}