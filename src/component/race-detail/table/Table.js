import React, { useState, useEffect, useContext } from 'react';
import { Table as AntdTable, Popover } from 'antd';

import {handleAPITable} from '../helper/handler';

import RaceDetailContext from '../context/RaceDetailContext';

const FastestLapContent = ({time, lap}) => {
    return(
        <>
            <div>{`Time: ${time}`}</div>
            <div>{`Lap : ${lap}`}</div>
        </>
    )
};

const FastestLapPopover = (props) => {
    const showPopOver = props.className.includes('row-fastest-lap');
    const record = props?.children?.[0]?.props?.record;
    return (
        showPopOver ?
        <Popover 
            title='Fastest Lap' 
            content={<FastestLapContent time={record?.fastestLapTime} lap={record?.fastestLapOnLap}/>}
        >
            <tr {...props} />
        </Popover>
        :
        <tr {...props} />
    );
};

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
            components={{
                body: {
                    row: FastestLapPopover 
                }
            }}
            pagination={false}
            loading={isLoading}
            size='small'
        >
        </AntdTable>
    )
}