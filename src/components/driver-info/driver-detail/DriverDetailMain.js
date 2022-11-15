import React, { useContext, useEffect } from 'react'
import { message } from 'antd'

import useFetchAPI from '../../../hooks/useFetchAPI'

import DriverDetailLayout from './DriverDetailLayout'
import DriverDetailContext from '../context/DriverDetailContext'

export default function DriverDetailMain () {
  const { driverId, actions: { setLoading, setProfileData, setSummaryData, setDetailData } } = useContext(DriverDetailContext)

  const fetcher = useFetchAPI()
  const fetchData = async () => {
    try {
      setLoading(true)
      const [profileResult, summaryResult, detailResult] = await fetcher({
        urls: [
          `https://ergast.com/api/f1/drivers/${driverId}.json`,
          `https://ergast.com/api/f1/drivers/${driverId}/driverStandings.json?limit=500`,
          `https://ergast.com/api/f1/drivers/${driverId}/results.json?limit=500`]
      })

      setProfileData({ ...profileResult?.data?.MRData?.DriverTable?.Drivers[0] })
      setSummaryData(summaryResult)
      setDetailData(detailResult)
    } catch (e) {
      message(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [driverId])

  return (
    <DriverDetailLayout/>
  )
}
