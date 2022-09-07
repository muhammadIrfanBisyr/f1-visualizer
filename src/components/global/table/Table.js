import React from 'react'
import { Table as AntdTable } from 'antd'

export default function Table (props) {
  return (
    <AntdTable
        className='main-table'
        pagination={false}
        size='small'
        {...props}
    />
  )
}
