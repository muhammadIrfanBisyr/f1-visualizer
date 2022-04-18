import React, { useContext } from 'react';
import { Space } from 'antd';

import RaceDetailContext from './context/RaceDetailContext';

import Table from './table/Table';
import LineChart from './line-chart/LineChart';

import YearSelect from '../YearSelect';
import TrackSelect from '../TrackSelect';
import SessionSelect from '../SessionSelect';
import ChartTypeSelect from '../ChartTypeSelect';

export default function RaceDetailContent() {

    const {chartType} = useContext(RaceDetailContext);
   
    return (
        <>
            <div className='main-detail-content-container'>
            {
                chartType === 'T' ?
                <Table/>
                :
                <LineChart/>
            }
            </div>

            <div className='main-select-group'>
                <Space>
                    <YearSelect />
                    <TrackSelect />
                    <SessionSelect/>
                    <ChartTypeSelect />
                </Space>
            </div>
        </>
    )
}