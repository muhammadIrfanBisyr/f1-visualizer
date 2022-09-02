import React from 'react'
import { Card } from 'antd'
import YearSelect from '../global/select/YearSelect'
import DriverInfoContext from './context/DriverInfoContext'

export default function DriverListFilter () {
  return (
    <Card>
        <YearSelect context={DriverInfoContext}/>
    </Card>
  )
}
