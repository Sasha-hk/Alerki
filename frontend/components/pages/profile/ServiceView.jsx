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
import InputServiceWindow from './InputServcieWindow'
import Toggle from '../../UI/Toggle/Toggle'
import cls from '../../../styles/pages/profile.module.css'


const ManageServiceWIndow = ({
  serviceData,
  showModal,
  setShowModal,
}) => {
  const {t} = useTranslation('profile')
  const profileStore = useSelector(store => store.profile)
  const profile = profileStore.profile
  const userStore = useSelector(store => store.user)
  const user = userStore.user

  if (serviceData.duration >= 60) {
    var durationView = Math.trunc(serviceData.duration / 60) + 'h. '
    if (serviceData.duration % 60 != 0) {
      durationView += serviceData.duration % 60 + 'm.'
    }
  }
  else {
    var durationView = serviceData.duration % 60 + 'm.'
  }

  return (
    <Modal show={showModal} onClose={setShowModal}>
      <div>
        <span className="text-big">{serviceData.name}</span>

        <div className="modal-content">
          <label>Price:</label>
          <span>{serviceData.price} {serviceData.currency}</span>
        </div>

        <div className="modal-content">
          <label>Duration:</label>
          <span>{durationView}</span>
        </div>
      </div>
      <div>
        <Button
          className="primary middle br-1"
          onClick={e => setShowModal(false)}
        >
          close
        </Button>
      </div>
    </Modal>
  )
}


export default ManageServiceWIndow
