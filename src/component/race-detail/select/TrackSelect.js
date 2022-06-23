import React, { useEffect, useState, useContext } from 'react'
import { Select } from 'antd'

import RaceDetailContext from '../context/RaceDetailContext'
import TrackInfoContext from '../context/TrackInfoContext'
import { handleAPITracks } from '../helper/handler'

const { Option } = Select

export default function TrackSelect () {
  const { actions: { setTrackInfo } } = useContext(TrackInfoContext)
  const { track, year, actions: { setTrack, setTrackId } } = useContext(RaceDetailContext)

  const [trackOptions, setTracksOptions] = useState([])

  useEffect(() => {
    handleAPITracks({ year }, { setTracksOptions })
  }, [year])

  useEffect(() => {
    if (setTrackInfo) { setTrackInfo(trackOptions[parseInt(track) - 1]) }
  }, [trackOptions])

  return (
        <Select
            defaultValue={track}
            value={track}
            onChange={(e) => { setTrack(e); setTrackId(trackOptions?.[e - 1]?.trackId); setTrackInfo(trackOptions[e - 1]) }}
            className='detail-title-selectable track-select'
        >
            {
                trackOptions.map((item, i) => {
                  return (<Option value={item.round} key={i}> {item.raceName} </Option>)
                })
            }
        </Select>
  )
}
