import React from 'react';
import { Table as AntdTable } from 'antd';


export default function Table({dataSource, columns, loading}){
    
    return(
        <AntdTable 
            className='main-table'
            dataSource={dataSource} 
            columns={columns}
            pagination={false}
            loading={loading}
            size='small'
        >
        </AntdTable>
    )
}