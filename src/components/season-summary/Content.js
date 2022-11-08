import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Card, message } from 'antd'

import SeasonSummaryContext from './context/SeasonSummaryContext'
import Table from '../../components/global/table/Table'
import LeaderBoard from './Leaderboard'

import Setting from './Setting'

import useFetchAPI from '../../hooks/useFetchAPI'
import { apiDataToTableData } from './helper/handler'

export default function Content () {
  const { dataResults, year, actions: { setDataResults } } = useContext(SeasonSummaryContext)

  const [loading, setLoading] = useState(false)
  const fetcher = useFetchAPI()

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
                      <Setting title={`F1 ${year} Season Summary`}/>
                    }
                >
                    <Table loading={loading} {...dataResults}/>

                </Card>
            </Col>
            <Col span={5}>
                <LeaderBoard loading={loading}/>
            </Col>
        </Row>
  )
}
