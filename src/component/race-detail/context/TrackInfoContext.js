import {createContext} from 'react';

export const TRACK_INFO_INITIAL_STATE = {
    
    trackId: '',
    trackName: '',
    raceName: '',
    locality: '',
    country: '',
    date: '',
    time: '',  
    actions: {}
}

const TrackInfoContext = createContext(TRACK_INFO_INITIAL_STATE)
export default TrackInfoContext;