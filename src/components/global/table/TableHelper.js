import React from 'react'
import { Link } from 'react-router-dom'
import { PODIUM_COLOR } from '../constant/Podium'

import CountryFlag from '../flag/CountryFlag'

const checkFinishPositionColor = (result, status) => {
  if (status === 'Finished' || status?.charAt(0) === '+') {
    if (result <= 3) {
      return result
    } else if (result >= 4 && result <= 10) {
      return 'points'
    } else {
      return 'noPoints'
    }
  } else {
    return 'dnf'
  }
}

const RaceResultCell = ({ result, status }) => {
  return (
    <div style={{ backgroundColor: PODIUM_COLOR[checkFinishPositionColor(result, status)], textAlign: 'center' }}>
      { status === 'Finished' || status?.charAt(0) === '+' ? result : status && 'DNF'}
    </div>
  )
}

export const generateCountryColumn = (countryInitialKey, country, year, round, width) => ({
  key: countryInitialKey,
  title: () => (
    <Link to={`/detail/${year}/${round}`}>
        <div className='table-header-country'>
            <div>{countryInitialKey.split('_')[0]}</div>
            <CountryFlag country={country}/>
        </div>
    </Link>
  ),
  dataIndex: countryInitialKey,
  render: (countryInitialKey) => (
    <RaceResultCell result={countryInitialKey?.result} status={countryInitialKey?.status}/>
  ),
  ...(width && { maxWidth: `${width}px` })
})
