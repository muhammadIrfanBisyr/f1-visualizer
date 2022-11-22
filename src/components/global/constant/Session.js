export const getSessionKeyFromValue = (keyValue, value) => (
  Object.entries(SESSION).find(([_, v]) => v[keyValue] === value)[0]
)

export const SPRINT_RACE_CONST = new Set([
  '2021_silverstone', '2021_monza', '2021_interlagos', '2022_imola', '2022_monza', '2022_interlagos'
])

export const SESSION = {
  QUALIFICATION: {
    apiEndpoint: 'qualifying',
    label: 'Qualifying',
    value: 'Q',
    title: 'Qualification'
  },
  RACE: {
    apiEndpoint: 'results',
    label: 'Race',
    value: 'R',
    title: 'Race'
  },
  SPRINT: {
    apiEndpoint: 'sprint',
    label: 'Sprint',
    value: 'S',
    title: 'Sprint Race'
  }
}
