import React, { useContext } from 'react';
import { Space, Row, Col, Card } from 'antd';

import RaceDetailContext from './context/RaceDetailContext';
import TrackInfoContextProvider from './context/TrackInfoContextProvider';

import Table from './table/Table';
import LineChart from './line-chart/LineChart';
import TrackInfo from './TrackInfo';

import SessionSelect from './select/SessionSelect';
import ChartTypeSelect from './select/ChartTypeSelect';

export default function RaceDetailContent() {

    const {chartType} = useContext(RaceDetailContext);
   
    return (
        <Row>
            <Col span={17}>
                <Card className='main-detail-content-container'>
                {
                    chartType === 'T' ?
                    <Table/>
                    :
                    <LineChart/>
                }
                </Card>

                <div className='main-select-group'>
                    <Space>
                        <SessionSelect/>
                        <ChartTypeSelect />
                    </Space>
                </div>
            </Col>
            <Col span={7}>
                <TrackInfoContextProvider>
                    <TrackInfo/>
                </TrackInfoContextProvider>
            </Col>
        </Row>
    )
}