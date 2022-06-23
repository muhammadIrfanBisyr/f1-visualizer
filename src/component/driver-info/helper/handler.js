import axios from 'axios'
import { message } from 'antd'

export const handleAPIDriver = (params, setters) => {
  const apiUrl = `https://ergast.com/api/f1/${params.year}/drivers.json`

  setters.setLoading(true)
  axios.get(apiUrl).then(res => {
    try {
      const resData = []
      res.data.MRData.DriverTable.Drivers.forEach((item) => {
        resData.push(
          {
            driverId: item.driverId,
            name: `${item.givenName} ${item.familyName}`,
            nationality: item.nationality,
            number: item?.permanentNumber
          }
        )
      })

      setters.setDriverData(resData)
    } catch {
      setters.setDriverData([])
    } finally {
      setters.setLoading(false)
    }
  }).catch((err) => {
    setters.setDriverData([])
    message(`Error fetching API data: ${err}`)
  }).finally(() => {
    setters.setLoading(false)
  })
}
