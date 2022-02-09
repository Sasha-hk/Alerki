import { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import Router, { useRouter } from 'next/router'
import ScrollFrame from '../../components/frames/ScrollFrame.jsx'
// import profileActions from '../store/actions/profileActions'
// import Button from '../components/UI/Button/Button.jsx'
// import Input from '../components/UI/Input/Input.jsx'
// import {useAuth} from '../provider/AuthProvider'
// import api from '../http'
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
