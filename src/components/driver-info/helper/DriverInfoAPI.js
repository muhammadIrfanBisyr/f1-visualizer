// import { ALL_DATA } from './data'

export const handleDriverStatistic = (data) => {
  return [data?.data?.MRData?.StandingsTable?.StandingsLists?.reduce((acc, item) => ({
    key: 0,
    entries: (acc?.entries + parseInt(item.round)) || parseInt(item.round),
    championships: (acc?.championships + (parseInt(item.DriverStandings[0].position) === 1) | 0) || (parseInt(item.DriverStandings[0].position) === 1) | 0,
    wins: (acc?.wins + parseInt(item.DriverStandings[0].wins)) || parseInt(item.DriverStandings[0].wins),
    podiums: 0,
    points: (acc?.points + parseInt(item.DriverStandings[0].points)) || parseInt(item.DriverStandings[0].points),
    pole: 0,
    fastestLaps: 0
  }), {})]
}

export const handleDriverSummary = (data) => (
  data?.data?.MRData?.StandingsTable?.StandingsLists?.map((item, index) => ({
    key: index,
    year: item.season,
    points: parseInt(item.DriverStandings[0].points),
    position: parseInt(item.DriverStandings[0].position),
    constructor: item.DriverStandings[0].Constructors[0].constructorId
  }))
)

export const handleDriverRaceDetail = (data) => {
  const yearMap = {}
  data?.data?.MRData?.RaceTable?.Races.forEach((item) => {
    const countryInitialKey = `${item?.raceName?.substring(0, 3)?.toUpperCase() ?? ''}_${item.Circuit.circuitId}`
    const innerData = {
      country: item.Circuit.Location.country,
      round: parseInt(item.round),
      result: parseInt(item.Results[0].position),
      points: parseInt(item.Results[0].points),
      status: item.Results[0].status
    }

    if (!(item.season in yearMap)) {
      yearMap[item.season] = { [countryInitialKey]: innerData }
    } else {
      yearMap[item.season][countryInitialKey] = innerData
    }
  })
  return yearMap
}
