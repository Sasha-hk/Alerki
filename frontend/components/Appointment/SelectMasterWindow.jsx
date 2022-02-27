import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import masterActions from '../../store/actions/masterActions.js'
import SelectService from './Select/SelectService'
import SelectMaster from './Select/SelectMaster'
import ModalHeading from '../Modal/ModalHeading'
import ModalContent from '../Modal/ModalContent'
import cls from '../../styles/pages/home/base.module.css'


const SelectMasterWindow = ({
  appointment,
  setAppointment,
  showModal, 
  setShowModal,
  showButtons,
  setShowButtons,
}) => {
  const dispatch = useDispatch()
  const masterStore = useSelector(store => store.master)
  const masters = masterStore.masters

  // upload services
  useEffect(() => {
    dispatch(masterActions.upload({serviceID: appointment.serviceID}))
  }, [])

  const closeSelectMasterWindow = () => {
    setShowModal({...showModal, master: false})
  }
  console.log(masters)

  return (
    <Modal 
      show={showModal.master}
      onClose={closeSelectMasterWindow}
      padding={false}
    >
      <div>
        <div 
          className={'pb-2'}
          onClick={e => {
            if (e.target.dataset.id) {
              setAppointment({
                ...appointment,
                serviceID: e.target.dataset.id,
              })

              setShowModal({...showModal, master: false})
              setShowModal({...showModal, date: true})
            }
          }}
        >
          <div>
            <div
              className="modal_heading"
            >
              hello
            </div>
            {
              masters
                ? masters.map(e => {
                  {/* console.log(e) */}
                    return (
                      <SelectMaster
                        key={e.id}
                        data-id={e.id}
                        master={e}
                      >
                        {e.username}
                      </SelectMaster>
                    )
                  })
                : null
            }
          </div>
        </div>
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


export default SelectMasterWindow
