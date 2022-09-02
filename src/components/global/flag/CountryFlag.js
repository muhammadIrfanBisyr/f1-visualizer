import Flags from 'country-flag-icons/react/3x2'

import { COUNTRY_NAME_TO_ISO, NATIONALITY_TO_ISO } from '../constant/Country'
import React from 'react'

export default function CountryFlag ({ country = '', nationality = '' }) {
  const unicode = country ? COUNTRY_NAME_TO_ISO?.[country.toLowerCase()] : NATIONALITY_TO_ISO?.[nationality.toLowerCase()]
  const Flag = unicode ? Flags[unicode] : Flags.TV

  return (<Flag className='flag-icon'/>)
}
