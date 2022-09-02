export const lapTimeToMiliseconds = (lapTime) => {
  if (!lapTime) { return 0 }

  const times = lapTime.split(':')
  return (parseInt(times[0]) * 60 + parseFloat(times[1])) * 1000
}

export const milisecondsToLapTime = (miliseconds) => {
  if (!miliseconds) { return '00:00.000' }

  const normalized = miliseconds / 1000.0
  const minutes = Math.trunc(normalized / 60)
  const secondsAndMilis = (Math.trunc(normalized % 60) + (normalized % 1)).toFixed(3).padStart(6, '0')

  return `${minutes}:${secondsAndMilis}`
}
