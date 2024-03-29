import axios from 'axios'
import { message } from 'antd'

import { SESSION } from '../../global/constant/Session'
import { lapTimeToMiliseconds } from './utils'

export const apiDataToTableData = (data = [], session) => {
  try {
    if (session === SESSION.QUALIFICATION.value) {
      const resData = []

      // Warning: Lazy lap time comparison
      const fastestQ1 = ['99:99.999', -1]
      const fastestQ2 = ['99:99.999', -1]
      const fastestQ3 = ['99:99.999', -1]

      data.data.MRData.RaceTable.Races[0].QualifyingResults.forEach((item, index) => {
        if (item?.Q1 && item?.Q1 < fastestQ1[0]) {
          fastestQ1[0] = item?.Q1
          fastestQ1[1] = index
        }

        if (item?.Q2 && item?.Q2 < fastestQ2[0]) {
          fastestQ2[0] = item?.Q2
          fastestQ2[1] = index
        }

        if (item?.Q3 && item?.Q3 < fastestQ3[0]) {
          fastestQ3[0] = item?.Q3
          fastestQ3[1] = index
        }

        resData.push(
          {
            pos: item.position,
            carNo: item.number,
            driver: `${item.Driver.givenName} ${item.Driver.familyName}`,
            lastName: item.Driver.familyName,
            nationality: item.Driver.nationality,
            constructor: item.Constructor.name,
            constructorId: item.Constructor.constructorId,
            q1: item?.Q1 ?? '',
            q2: item?.Q2 ?? '',
            q3: item?.Q3 ?? ''
          }
        )
      })

      if (resData.length > 0) {
        resData[fastestQ1[1]].fQ1 = fastestQ1[0]
        resData[fastestQ2[1]].fQ2 = fastestQ2[0]
        resData[fastestQ3[1]].fQ3 = fastestQ3[0]
      }

      return resData
    } else {
      const resArrName = session === SESSION.RACE.value ? 'Results' : 'SprintResults'

      const year = data.data.MRData.RaceTable.Races[0].season
      return data.data.MRData.RaceTable.Races[0][resArrName].map((item) => (
        {
          pos: item.position,
          grid: item.grid,
          carNo: item.number,
          driver: `${item.Driver.givenName} ${item.Driver.familyName}`,
          lastName: item.Driver.familyName,
          driverId: item.Driver.driverId,
          nationality: item.Driver.nationality,
          constructor: item.Constructor.name,
          constructorId: item.Constructor.constructorId,
          laps: item.laps,
          time: item?.Time?.time ?? '',
          status: item.status,
          points: item.points,
          fastestLapRank: item?.FastestLap?.rank ?? '',
          fastestLapTime: item?.FastestLap?.Time?.time ?? '',
          fastestLapOnLap: item?.FastestLap?.lap ?? '',
          year
        }
      ))
    }
  } catch {
    return []
  }
}

const apiToLineChartData = (data) => {
  const resData = []
  let maxLap = Number.MIN_SAFE_INTEGER
  let minLap = Number.MAX_SAFE_INTEGER

  data.data.MRData.RaceTable.Races[0].Laps.forEach((item) => {
    item.Timings.forEach((innerItem) => {
      let lapTime = lapTimeToMiliseconds(innerItem.time)
      if (lapTime > 300000) { lapTime = 0 } // if laptime > 5 minutes, assuming it is a red flag period.
      maxLap = lapTime > maxLap ? lapTime : maxLap
      minLap = lapTime < minLap ? lapTime : minLap

      resData.push({
        lapNo: parseInt(item.number),
        driverId: innerItem.driverId,
        pos: -parseInt(innerItem.position),
        time: -lapTime
      })
    })
  })
  return { resData, chartLimit: [-maxLap, -minLap] }
}

const appendTableDataToLineData = (tableData, lineData) => {
  const res = []
  const driverTable = {}

  tableData.forEach((item) => {
    const startGrid = item.grid === '0' ? -20 : -parseInt(item.grid)
    res.push({
      lapNo: 0,
      driverId: item.driverId,
      pos: startGrid,
      constructorId: item.constructorId
    })
    driverTable[item.driverId] = item.constructorId
  })

  return { chartData: res.concat(lineData), driverTable }
}

export const handleAPILineChart = (resulData = [], lapsData = []) => {
  const processedTable = apiDataToTableData(resulData, SESSION.RACE.value)
  const processedLine = apiToLineChartData(lapsData)

  return {
    ...appendTableDataToLineData(processedTable, processedLine.resData),
    chartLimit: processedLine.chartLimit
  }
}

export const handleAPITracks = (params, setters) => {
  const apiUrl = `https://ergast.com/api/f1/${params.year}.json`

  axios.get(apiUrl).then(res => {
    try {
      const retVar = []
      res.data.MRData.RaceTable.Races.forEach((item) => {
        retVar.push({
          round: item.round,
          raceName: item.raceName,
          time: item.time,
          date: item.date,
          trackId: item.Circuit.circuitId,
          trackName: item.Circuit.circuitName,
          locality: item.Circuit.Location.locality,
          country: item.Circuit.Location.country
        })
      })

      setters.setTracksOptions(retVar)
    } catch {
      setters.setTracksOptions([])
    }
  }).catch((err) => {
    setters.setTracksOptions([])
    message(`Error fetching API data: ${err}`)
  })
}
