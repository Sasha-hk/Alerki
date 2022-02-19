import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import getT from 'next-translate/getT'
import ScrollFrame from '../components/frames/ScrollFrame.jsx'
import profileActions from '../store/actions/profileActions'
import CreateService from '../components/pages/profile/CreateService.jsx'
import UpdateService from '../components/pages/profile/UpdateService.jsx'
import ServiceView from '../components/pages/profile/ServiceView.jsx'
import Button from '../components/UI/Button/Button.jsx'
import Input from '../components/UI/Input/Input.jsx'
import Select from '../components/UI/Select/Select.jsx'
import Modal from '../components/Modal/Modal.jsx'
import Toggle from '../components/UI/Toggle/Toggle.jsx'
import {useAuth} from '../provider/AuthProvider'
import api from '../http'

import cls from '../styles/pages/profile.module.css'


const API_URL = process.env.API_URL

const Profile = () => {
  const {t} = useTranslation('profile')
  const [showModal, setShowModal] = useState(false)
  const [updateData, setUpdateData] = useState({
    name: "",
    currency: "UAN",
    price: 1,
    location: "",
    duration: 1,
  })
  const profileStore = useSelector(store => store.profile)
  const profile = profileStore.profile
  const userStore = useSelector(store => store.user)
  const user = userStore.user
  const dispatch = useDispatch()
  const router = useRouter()

  // upload user info
  useEffect(() => {
    if (router.isReady) {
      if (router.query.username) {
        if (router.query.username != profile.username) {
          dispatch(profileActions.upload({username: router.query.username})) 
        }
      }
    }
  }, [router.isReady, router.query.username])

  // general view for master and client
  const headerView = (
    <div className={cls.header}>
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
          <Link href="/settings/profile">
            <a>
              <Button className="little sceleton br-3"><span>{t('settings')}</span></Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
  
  // view only for master
  const extendedView = (
    <>
      {headerView}

      <div className={cls.about}>
        <span>{profile.master?.shortBiography}</span>
      </div>

      <div className={cls.services}>
        <span className="text-big">{t('Services')}</span>

        <div
          className={[cls.services_wrapper, 'mt-3'].join(' ')}
        >
          {
              profile.master?.services?.length != 0
              ? <>
                {
                  profile.id == user.id
                    ? <UpdateService
                      serviceData={updateData}
                      setServiceData={setUpdateData}
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
                    : <ServiceView
                      serviceData={updateData}
                      showModal={showModal}
                      setShowModal={setShowModal}
                    />
                }
                {
                  profile.master?.services.map(service => {
                    return (
                      <Button
                        key={service.id}
                        className="little sceleton br-3"
                        onClick={e => {
                          setUpdateData(service)
                          setShowModal(true)
                        }}
                      >{service.name}</Button> 
                    )
                  })
                }
              </>
              : null
          }
          {
            profile.id && user.id && profile.id == user.id
              ? <CreateService />
              : null
          }
        </div>
      </div>
    </>
  )

  return (
    <ScrollFrame navigation={true}>
        <div className="container">
          {
            profileStore.loading && profileStore.initRender
              ? <b>loading</b>
              : profile.profileType == 'master'
                ? extendedView
                : headerView
          }
        </div>
    </ScrollFrame>
  )
}


export default Profile
