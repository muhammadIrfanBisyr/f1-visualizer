import axios from 'axios'
import { message } from 'antd'

export const handleAPIDriver = (params, setters) => {
  const apiUrl = `https://ergast.com/api/f1/${params.year}/driverStandings.json`

  setters.setLoading(true)
  axios.get(apiUrl).then(res => {
    try {
      setters.setDriverData(
        res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map((item) => {
          return (
            {
              points: item.points,
              wins: item.wins,
              driverId: item.Driver.driverId,
              name: `${item.Driver.givenName} ${item.Driver.familyName}`,
              nationality: item.Driver.nationality,
              number: item.Driver?.permanentNumber,
              constructorId: item.Constructors[0].constructorId
            }
          )
        })
      )
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
