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

      if (!(driverId in driverResults)) {
        driverResults[driverId] = {
          constructorId: resultItem.Constructor.constructorId,
          constructorName: resultItem.Constructor.name,
          driverId,
          driverName: `${resultItem.Driver.givenName} ${resultItem.Driver.familyName}`,
          nationality: resultItem.Driver.nationality,
          firstPlace: parseInt(resultItem.position) === 1 ? 1 : 0,
          secondPlace: parseInt(resultItem.position) === 2 ? 1 : 0,
          thirdPlace: parseInt(resultItem.position) === 3 ? 1 : 0
        }
      } else {
        driverResults[driverId].firstPlace += parseInt(resultItem.position) === 1 ? 1 : 0
        driverResults[driverId].secondPlace += parseInt(resultItem.position) === 2 ? 1 : 0
        driverResults[driverId].thirdPlace += parseInt(resultItem.position) === 3 ? 1 : 0
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

export const calculateRowSpanConstructor = (data = []) => {
  const contructorsOccurence = data.reduce((acc, item) => {
    acc[item.constructorId] = (acc[item.constructorId] || 0) + 1
    return acc
  }, {})

  return data.sort((a, b) => b.constructorPoints - a.constructorPoints || b.points - a.points)
    .map((item, index, arr) => ({ ...item, firstCol: arr[index - 1]?.constructorId !== item.constructorId, rowSpan: contructorsOccurence[item.constructorId] }
    ))
}
