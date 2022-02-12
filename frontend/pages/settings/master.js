import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ScrollFrame from '../../components/frames/ScrollFrame.jsx'
import SettingsWrapper from '../../components/pages/settings'


const Settings = () => {
  return (
    <ScrollFrame navigation={true}>
      <SettingsWrapper>
        <span className="text-big">Master settigns</span>

        <div className="mt-3">
          In process...
        </div>
      </SettingsWrapper>
    </ScrollFrame>
  )
}


export default Settings
