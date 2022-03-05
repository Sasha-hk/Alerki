import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {millisecondsToTime} from '../../utils/timeConvert.js'
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

  console.log(appointment)

  const closeConfirmWindow = () => {
    setShowModal({...showModal, confirm: false})
  }
  console.log(appointment.masterService?.pictureID) 
  return (
    <Modal
      show={showModal.confirm}
      onClose={closeConfirmWindow}
    >
      <div>
        <span className="text-middle">{appointment.service?.name || ''}</span>

        <MasterView 
          master={appointment.masterService || null}
          className="mt-3"
        />
      </div>

      {
        showButtons.master 
          ? <div>
              <Button 
                className="middle muted"
                onClick={e => setShowModal({...showModal, master: false})}
              >
                close
              </Button>

              <Button 
                className="middle primary"
                onClick={e => setShowModal({...showModal, master: false})}
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