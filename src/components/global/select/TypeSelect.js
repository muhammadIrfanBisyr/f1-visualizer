import React from 'react'
import { Select } from 'antd'
import { UserOutlined, TeamOutlined } from '@ant-design/icons'

const { Option } = Select

export default function TypeSelect ({ onChange, defaultValue }) {
  return (
        <Select onChange={onChange} defaultValue={defaultValue}>
            <Option value='D'><UserOutlined/> Driver</Option>
            <Option value='C'><TeamOutlined/> Constructor</Option>
        </Select>
  )
}
