import React from 'react'
import Icon, {CloseOutlined } from '@ant-design/icons';

import { LOGO_MAP } from '../../../asset/race-result-logo';

export default function RaceResultLogo({name}){

    const checkLapped = name.charAt(0) === '+' ? 'lapped' : name.toLowerCase().split(' ').join('_');
    const logoComponent = LOGO_MAP[checkLapped];

    return ( 
        <>
            {
                logoComponent ?
                <Icon 
                    component={logoComponent} style={{ fontSize: '24px', verticalAlign: 'middle', marginTop: '-8px', marginBottom: '-8px'}}>
                </Icon>
                :
                <CloseOutlined />
            }
            
        </>
    )
} 