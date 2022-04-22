import {createContext} from 'react';

export const CONTEXT_INITIAL_STATE = {
    year: '2022',
    track: '1',
    session: 'R',
    chartType: 'T',
    trackInfo: {
        trackId: '',
        trackName: '',
        raceName: '',
        locality: '',
        country: '',
        date: '',
        time: '',
    },
    actions: {}
}

const RaceDetailContext = createContext(CONTEXT_INITIAL_STATE)

export default RaceDetailContext;