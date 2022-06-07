import React from 'react';
import { Row, Col, Card } from 'antd';
import Table from './table/Table';

export default function Content(){
    return (

        <Row>
            <Col span={20}>
                <Card className='main-summary-content-container'>
                    <Table/>
                </Card>
            </Col>
            <Col span={4}/>
        </Row>
    )
}