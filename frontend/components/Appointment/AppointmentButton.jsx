import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import appointmentActins from '../../store/actions/appointmentActions.js'
import clsButton from './styles/appointment-buttons.module.css'
import cls from '../../styles/pages/home/base.module.css'

import SelectServiceWindow from './SelectServiceWindow'
import SelectMasterWindow from './SelectMasterWindow'
import SelectDateWindow from './SelectDateWindow'
import SelectTimeWindow from './SelectTimeWindow'
import ConfirmWindow from './ConfirmWindow'



const defaultShowButtonsState = {
  service: false,
  master: false,
  date: false,
  time: false,
  confirm: false,
}

const defaultShowModalsState = {
  service: false,
  master: false,
  date: false,
  time: false,
  confirm: false,
}

const defaultAppointmentState = {
  serviceID: null,
  masterServiceID: null,
  masterID: null,
  appointmentStartTime: null,
}

const AppointmentButton = () => {
  const dispatch = useDispatch()
  const appointmentStore = useSelector(store => store.appointment)
  const appointments = appointmentStore.appointments

  const [appointment, setAppointment] = useState(defaultAppointmentState)
  const [showButtons, setShowButtons] = useState(defaultShowButtonsState)
  const [showModal, setShowModal] = useState(defaultShowModalsState)

  return (
    <div className={clsButton.buttons_wrapper}>
      {/* modal windows */}
      <SelectServiceWindow 
          showModal={showModal}
          setShowModal={setShowModal}
          showButtons={showButtons}
          setShowButtons={setShowButtons}
      />

      <SelectMasterWindow
          showModal={showModal}
          setShowModal={setShowModal}
          showButtons={showButtons}
          setShowButtons={setShowButtons}
      />

      <SelectDateWindow
          showModal={showModal}
          setShowModal={setShowModal}
          showButtons={showButtons}
          setShowButtons={setShowButtons}
      />

      <SelectTimeWindow
          showModal={showModal}
          setShowModal={setShowModal}
          showButtons={showButtons}
          setShowButtons={setShowButtons}
      />

      <ConfirmWindow
          showModal={showModal}
          setShowModal={setShowModal}
          showButtons={showButtons}
          setShowButtons={setShowButtons}
      />

      {/* buttons */}
      <div 
        className={clsButton.service_button}
        onClick={e => setShowModal({...showModal, service: true})}
      >
        <span className={clsButton.button_inscription}>Service</span>
      </div>

      <div 
        className={clsButton.master_button}
        onClick={e => {
          if (appointment.serviceID) {
            setShowModal({...showModal, master: true})
          } 
          else {
            setShowModal({...showModal, service: true})
          }
        }}
      >
        <span className={clsButton.button_inscription}>Master</span>
      </div>
    </div>
  )
}


export default AppointmentButton
