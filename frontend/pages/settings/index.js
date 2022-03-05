import { useState, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import ScrollFrame from '../../components/frames/ScrollFrame.jsx'
import SettingsWrapper from '../../components/pages/settings'



const Settings = () => {
  useEffect(() => {
    Router.push('/settings/profile')
  }, [])

  return (
    <ScrollFrame navigation={true}>
      <SettingsWrapper />
    </ScrollFrame>
  )
}


export default Settings
