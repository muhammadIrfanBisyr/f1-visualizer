import React, { useState, useEffect, useContext } from 'react';
import { Table as AntdTable } from 'antd';

import {handleAPITable} from '../helper/handler';

import RaceDetailContext from '../context/RaceDetailContext';


export default function Table(){
    
    const {year, session, track} = useContext(RaceDetailContext);

    const [allData, setAllData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        handleAPITable({session, track, year}, {setAllData, setLoading});
    },[year, track, session])


    return(
        <AntdTable 
            className='main-table'
            dataSource={allData.resData} 
            columns={allData.column}
            rowClassName={record => record?.fastestLapRank === '1' && 'row-fastest-lap'}
            pagination={false}
            loading={isLoading}
            size='small'
        >
        </AntdTable>
    )
}