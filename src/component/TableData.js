import React from 'react';
import { Table } from 'antd';

export default function TableData({dataSource, columns, loading}){
    return(
        <Table 
            className='main-table'
            dataSource={dataSource} 
            columns={columns}
            pagination={false}
            loading={loading}
            size='small'
        >

        </Table>
    )
}