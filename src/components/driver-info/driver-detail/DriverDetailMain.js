import React, { useContext, useEffect } from 'react'
import { message } from 'antd'

import useFetchAPI from '../../../hooks/useFetchAPI'

import DriverDetailLayout from './DriverDetailLayout'
import DriverDetailContext from '../context/DriverDetailContext'

export default function DriverDetailMain () {
  const { driverId, actions: { setLoading, setProfileData } } = useContext(DriverDetailContext)

  const fetcher = useFetchAPI()
  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await fetcher({ url: `https://ergast.com/api/f1/drivers/${driverId}.json` })
      setProfileData({ ...result?.data?.MRData?.DriverTable?.Drivers[0] })
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
