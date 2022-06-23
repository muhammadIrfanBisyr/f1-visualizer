import axios from 'axios'
import { message } from 'antd'
import { generateCountryColumn, DRIVER_COLUMN, TOTAL_POINT_COLUMN } from '../table/TableConstant'

export const handleAPITable = (params, setters) => {
  const apiUrl = `https://ergast.com/api/f1/${params.year}/results.json?limit=500`

  setters.setLoading(true)
  axios.get(apiUrl).then(res => {
    try {
      setters.setResultData(apiDataToTableData(res))
    } catch {
      setters.setResultData({})
    } finally {
      setters.setLoading(false)
    }
  }).catch((err) => {
    setters.setResultData({})
    message(`Error fetching API data: ${err}`)
  }).finally(() => {
    setters.setLoading(false)
  })
}

const apiDataToTableData = (data) => {
  const resCol = [DRIVER_COLUMN]
  const driverResults = {}
  const totalPoints = {}

  data.data.MRData.RaceTable.Races.forEach((item) => {
    const round = item.round
    const country = item.Circuit.Location.country
    const year = item.season

    const countryInitialKey = `${item?.raceName?.substring(0, 3)?.toUpperCase() ?? ''}_${item.Circuit.circuitId}`

    resCol.push(generateCountryColumn(countryInitialKey, country, year, round))

    item.Results.forEach((resultItem) => {
      const driverId = resultItem.Driver.driverId
      const points = parseInt(resultItem.points)

      if (driverId in driverResults === false) {
        driverResults[driverId] = {
          driverName: `${resultItem.Driver.givenName} ${resultItem.Driver.familyName}`,
          nationality: resultItem.Driver.nationality
        }
      }

      driverResults[driverId][countryInitialKey] = {
        result: parseInt(resultItem.position),
        status: resultItem.status
      }

      totalPoints[driverId] = (totalPoints[driverId] + points) || points
    })
  })

  Object.keys(driverResults).forEach((key) => {
    driverResults[key] = { ...driverResults[key], points: totalPoints[key] }
  })

  return { columns: [...resCol, TOTAL_POINT_COLUMN], dataSource: Object.values(driverResults) }
}
