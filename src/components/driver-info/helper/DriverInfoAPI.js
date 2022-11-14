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
