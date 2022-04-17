import {createContext} from 'react';

export const initialState = {
    year: '2022',
    track: '1',
    session: 'R',
    actions: {}
}

const RaceDetailContext = createContext(initialState)

export default RaceDetailContext;