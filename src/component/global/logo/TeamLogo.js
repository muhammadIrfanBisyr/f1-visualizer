import React from 'react'
import Icon from '@ant-design/icons'

import { LOGO_MAP } from '../../../asset/team-logo'

export default function TeamLogo ({ name }) {
  return (<Icon component={LOGO_MAP[name]} className='logo-icon'></Icon>)
}
