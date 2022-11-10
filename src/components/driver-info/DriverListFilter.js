import React, { useContext } from 'react'
import { Card } from 'antd'
import YearSelect from '../global/select/YearSelect'
import DriverInfoContext from './context/DriverInfoContext'

export default function DriverListFilter () {
  const { actions: { setYear }, year } = useContext(DriverInfoContext)
  return (
    <Card className='driver-list-filter-card'>
        <YearSelect onChange={setYear} defaultValue={year}/>
    </Card>
  )
}
