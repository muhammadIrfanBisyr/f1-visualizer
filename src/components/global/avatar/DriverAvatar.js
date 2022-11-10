import React from 'react'
import { Avatar as AntdAvatar } from 'antd'

export default function DriverAvatar (props) {
  const imagePath = `${process.env.PUBLIC_URL}/assets/drivers/${props.driverId}.jpg`
  return (
    <AntdAvatar src={imagePath} {...props}/>
  )
}
