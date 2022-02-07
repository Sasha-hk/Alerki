import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import ScrollFrame from '../components/frames/ScrollFrame.jsx'
import profileActions from '../store/actions/profileActions'
import Button from '../components/UI/Button/Button.jsx'
import Input from '../components/UI/Input/Input.jsx'
import {useAuth} from '../provider/AuthProvider'
import api from '../http'

import cls from '../styles/pages/profile.module.css'


const API_URL = process.env.API_URL

const Profile = () => {
  const profileStore = useSelector(store => store.profile)
  const profile = profileStore.profile
  const dispatch = useDispatch()
  const router = useRouter()

  // upload user info
  useEffect(() => {
    if (router.isReady) {
      if (router.query.username) {
        console.log('upload profile data...')
        dispatch(profileActions.upload({username: router.query.username})) 
      }
    }
  }, [router.isReady, router.query.username])

  // general view for master and client
  const headerView = (balance = false) => (
    <div className={[
      cls.header, 
      balance ? cls.balance_header : null
      ].join(' ')
    }>
      {
        profile.pictureID
          ? <img
            className={cls.user_picture}
            src={`${API_URL}/profile/picture/${profile.pictureID}`}
            alt=""
          />
        : <svg 
          className={cls.plug_user_picture}
          viewBox="0 0 29 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="14.5" cy="14.5" r="14.5" />
        </svg>
      }

      <div className={cls.header_info}>
        <span className="text-big">{profile.firstName} {profile.lastName}</span>
        <span className="text-little text-muted">{profile.username}</span>
        <div className={cls.settings_button}>
          <Link href="/settings">
            <Button className="little sceleton br-3">settings</Button>
          </Link>
        </div>
      </div>
    </div>
  )
  
  // view only for master
  const extendedView = (
    <>
      {headerView()}

      <div className={cls.about}>
        <span>{profile.worker?.shortBiography}</span>
      </div>

      <div className={cls.services}>
        <span className="text-big">Services</span>
      </div>
    </>
  )

  return (
    <ScrollFrame navigation={true}>
        <div className="container">
          {
            profileStore.loading && profileStore.initRender
              ? <b>loading</b>
              : profile.profileType == 'worker'
                ? extendedView
                : headerView(true)
          }
        </div>
    </ScrollFrame>
  )
}


export default Profile
