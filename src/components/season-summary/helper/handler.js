import { generateCountryColumn, DRIVER_COLUMN, TOTAL_POINT_COLUMN } from '../table/TableConstant'

const calculateConstructor = (data) => {
  const contructors = data.reduce((acc, item) => {
    acc[item.constructorId] = (acc[item.constructorId] + item.points) || item.points
    return acc
  }, {})

  return data.map((item) => { return { ...item, constructorPoints: contructors[item.constructorId] } })
}

export const apiDataToTableData = (data) => {
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
          constructorId: resultItem.Constructor.constructorId,
          constructorName: resultItem.Constructor.name,
          driverId,
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

  return { columns: [...resCol, TOTAL_POINT_COLUMN], dataSource: calculateConstructor(Object.values(driverResults)) }
}
