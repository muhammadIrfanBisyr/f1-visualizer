import React, { useContext } from 'react'
import { Select } from 'antd'

import RaceDetailContext from '../context/RaceDetailContext'

const { Option } = Select

export const SPRINT_RACE_CONST = new Set([
  '2021_silverstone', '2021_monza', '2021_interlagos', '2022_imola'
])

export default function SessionSelect () {
  const { session, year, trackId, actions: { setSession } } = useContext(RaceDetailContext)

  return (
        <Select
            defaultValue='R'
            value={session}
            className='session-select'
            onChange={(val) => { setSession(val) }}
        >
            <Option value='Q'>Qualifying</Option>
            {
                SPRINT_RACE_CONST.has(`${year}_${trackId}`) &&
                <Option value='S'>Sprint</Option>
            }
            <Option value='R'>Race</Option>
        </Select>
  )
}
