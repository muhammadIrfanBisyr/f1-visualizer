import React from 'react'
import { Row, Col, Card, Space } from 'antd'

import YearSelect from '../global/select/YearSelect'

import SeasonSummaryContext from './context/SeasonSummaryContext'
import Table from './table/Table'

export default function Content () {
  return (

        <Row>
            <Col span={19}>
                <Card className='main-summary-content-container'
                    title={
                        <Space>
                            <YearSelect context={SeasonSummaryContext}/> <div>Season Result</div>
                        </Space>
                    }
                >
                    <Table/>
                </Card>
            </Col>
            <Col span={5}/>
        </Row>
  )
}
