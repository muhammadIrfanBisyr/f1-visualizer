import React, { useState, useEffect, useContext } from 'react';
import { Table as AntdTable, Popover } from 'antd';

import RaceDetailContext from '../context/RaceDetailContext';
import { QUALIFYING_COLUMN, RACE_COLUMN  } from './TableConstant';
import {handleAPITable} from '../helper/handler';


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
    
    
    const {year, session, track, resultData, actions:{setResultData}} = useContext(RaceDetailContext);
    
    const [isLoading, setLoading] = useState(false);
    const [column, setColumn] = useState([]);


    useEffect(() => {
        handleAPITable({session, track, year}, {setResultData, setLoading});
    },[year, track, session])

    useEffect(() => {
        if (resultData.length > 0){
            if (session === 'R')
                setColumn(RACE_COLUMN);
            else
                setColumn(QUALIFYING_COLUMN);
        }
    },[session,resultData])

    return(
        <AntdTable 
            className='main-table'
            dataSource={resultData} 
            columns={column}
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