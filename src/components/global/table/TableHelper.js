import React from 'react'
import { Link } from 'react-router-dom'
import { PODIUM_COLOR } from '../constant/Podium'

import CountryFlag from '../flag/CountryFlag'

const RaceResultCell = ({ result, status }) => {
  const res = status === 'Finished' || status?.charAt(0) === '+' ? result <= 3 ? result : 'points' : 'dnf'
  return (
    <div style={{ backgroundColor: PODIUM_COLOR[res] }}>
      { status === 'Finished' || status?.charAt(0) === '+' ? result : status && 'DNF'}
    </div>
  )
}

export const generateCountryColumn = (countryInitialKey, country, year, round) => ({
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
  )
})
