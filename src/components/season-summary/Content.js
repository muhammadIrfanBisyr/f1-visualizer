import React, { useState, useEffect, useContext, useMemo } from 'react'
import { Row, Col, Card, message } from 'antd'

import SeasonSummaryContext from './context/SeasonSummaryContext'
import Table from '../../components/global/table/Table'
import LeaderBoard from './Leaderboard'

import Setting from './Setting'

import useFetchAPI from '../../hooks/useFetchAPI'
import { apiDataToTableData, calculateRowSpanConstructor } from './helper/handler'
import { TOTAL_CONSTRUCTOR_POINT_COLUMN, CONSTRUCTOR_COLUMN } from './table/TableConstant'

export default function Content () {
  const { dataResults, dataMode, year, actions: { setDataResults } } = useContext(SeasonSummaryContext)

  const [loading, setLoading] = useState(false)
  const fetcher = useFetchAPI()

  const tableColumns = useMemo(
    () => dataMode === 'D'
      ? dataResults?.columns
      : [CONSTRUCTOR_COLUMN, ...dataResults?.columns.slice(1, -1), TOTAL_CONSTRUCTOR_POINT_COLUMN],
    [dataResults, dataMode])

  const tableData = useMemo(
    () => dataMode === 'D'
      ? dataResults?.dataSource
      : calculateRowSpanConstructor(dataResults?.dataSource), [dataResults, dataMode])

  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await fetcher({ url: `https://ergast.com/api/f1/${year}/results.json?limit=500` })
      setDataResults(apiDataToTableData(result))
    } catch (e) {
      message(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [year])

  return (
        <Row>
            <Col span={19}>
                <Card className='main-summary-content-container'
                    title={
                      <Setting title={`F1 ${year} Season Summary - ${dataMode === 'D' ? 'Driver' : 'Constructor'} Standing`}/>
                    }
                >
                    <Table loading={loading} dataSource={tableData} columns={tableColumns} />

                </Card>
            </Col>
            <Col span={5}>
                <LeaderBoard loading={loading}/>
            </Col>
        </Row>
  )
}
