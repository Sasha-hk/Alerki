import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import getT from 'next-translate/getT'
import userActions from '../../../store/actions/userActions.js'
import profileActions from '../../../store/actions/profileActions.js'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import Select from '../../UI/Select/Select'
import Modal from '../../Modal/Modal'
import InputServcieWindow from './InputServcieWindow'
import Toggle from '../../UI/Toggle/Toggle'
import cls from '../../../styles/pages/profile.module.css'


const ManageServiceWIndow = ({showModal, setShowModal, serviceData, setServiceData}) => {
  const {t} = useTranslation('profile')
  const dispatch = useDispatch()
  const userStore = useSelector(store => store.user)
  const profile = useSelector(store => store.profile)
  const user = userStore.user

  const updateProfile = () => {
    dispatch(profileActions.upload({username: user.username}))
  }
  
  const updateServiceData = () => {
    console.log(serviceData)
    dispatch(userActions.updateService(serviceData))

    setShowModal(false)
  }

  return (
    <InputServcieWindow
      serviceData={serviceData}
      setServiceData={setServiceData}
      showModal={showModal}
      setShowModal={setShowModal}
    >
      <Button
        className="danger middle br-1"
        onClick={e => {
          dispatch(userActions.deleteService({id: serviceData.id}))
          setShowModal(false)
        }}
      >
        delete
      </Button>
      <Button
        className="primary middle br-1"
        onClick={e => updateServiceData()}
      >
        update
      </Button>
    </InputServcieWindow>
  )
}


export default ManageServiceWIndow
