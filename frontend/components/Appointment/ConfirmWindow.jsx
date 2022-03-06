import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {millisecondsToTime} from '../../utils/timeConvert.js'
import DateView from '../DateTime/DateView'
import CAPActions from '../../store/actions/CAPActions'
import MasterView from './Select/MasterView'
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'


const ConfirmWindow = ({
  showModal,
  setShowModal,
  showButtons,
  setShowButtons,
}) => {
  const dispatch = useDispatch()
  const CAPStore = useSelector(store => store.cap)
  const appointment = CAPStore.appointment

  const closeConfirmWindow = () => {
    setShowModal({...showModal, confirm: false})
  }

  return (
    <Modal
      show={showModal.confirm}
      onClose={closeConfirmWindow}
    >
      <div>
        <span className="text-middle">{appointment.service?.name || ''}</span>

        <MasterView 
          master={appointment.masterService || null}
          className="separates-block space-above"
        />

        <div className="separates-block">
          <label>Date:</label>
          <DateView
            date={appointment?.date}
          />
        </div>

        <div className="separates-block">
          <label>Time:</label>
          <span>{millisecondsToTime(appointment?.time)} - {millisecondsToTime(Number(appointment?.time) + Number(appointment?.masterService?.service.duration))}</span>
        </div>
      </div>

      {
        showButtons.confirm
          ? <div>
              <Button 
                className="middle muted"
                onClick={e => setShowModal({...showModal, confirm: false})}
              >
                close
              </Button>

              <Button
                className="middle primary"
                onClick={e => {
                  const time = new Date(appointment.date)
                  time.setTime(time.getTime() + Number(appointment.time))

                  dispatch(CAPActions.makeAppointment({
                    masterServiceID: appointment.masterServiceID,
                    masterID: appointment.masterID,
                    appointmentStartTime: time,
                  }))

                  setShowModal({...showModal, confirm: false})
                }}
              >
                confirm
              </Button>
            </div>
          : null
      }
    </Modal>
  )
}


export default ConfirmWindow