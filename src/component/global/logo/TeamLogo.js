import React from 'react'
import Icon from '@ant-design/icons';

import { LOGO_MAP } from '../../../asset/team-logo';

export default function TeamLogo({name}){

    return ( <Icon component={LOGO_MAP[name]} style={{ fontSize: '32px', verticalAlign: 'middle', marginTop: '-8px', marginBottom: '-8px'}}></Icon>)
} 