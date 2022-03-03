import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import appointmentActins from '../../store/actions/appointmentActions.js'
import clsButton from './appointment-buttons.module.css'
import cls from '../../styles/pages/home/base.module.css'

import SelectServiceWindow from './SelectServiceWindow'
import SelectMasterWindow from './SelectMasterWindow'
import SelectDateWindow from './SelectDateWindow'
import SelectTimeWindow from './SelectTimeWindow'



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
          appointment={appointment}
          setAppointment={setAppointment}
          showModal={showModal}
          setShowModal={setShowModal}
          showButtons={showButtons}
          setShowButtons={setShowButtons}
      />

      <SelectMasterWindow
          appointment={appointment}
          setAppointment={setAppointment}
          showModal={showModal}
          setShowModal={setShowModal}
          showButtons={showButtons}
          setShowButtons={setShowButtons}
      />

      <SelectDateWindow
          appointment={appointment}
          setAppointment={setAppointment}
          showModal={showModal}
          setShowModal={setShowModal}
          showButtons={showButtons}
          setShowButtons={setShowButtons}
      />

      <SelectTimeWindow
          appointment={appointment}
          setAppointment={setAppointment}
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
