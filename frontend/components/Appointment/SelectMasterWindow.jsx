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
import SearchInput from '../Modal/UI/SearchInput'
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

  const closeSelectMasterWindow = () => {
    setShowModal({...showModal, master: false})
  }

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
            <ModalHeading
              className="modal_heading"
            >
              <SearchInput 
                placeholder="master"

              />
            </ModalHeading>
            <div
              className='pb-2'
              onClick={e => {
                if (e.target.dataset['masterId']) {
                  setAppointment({
                    ...appointment,
                    masterID: e.target.dataset.masterId,
                    masterServiceID: e.target.dataset.masterServiceId,
                  })

                  // dispatch(masterActions.upload({
                  //   serviceID: e.target.dataset.id,
                  // }))

                  setShowModal({...showModal, master: false})
                }
              }}
            >
              {
                masters
                  ? masters.map(e => {
                      return (
                        <SelectMaster
                          key={e.id}
                          data-master-id={e.masterID}
                          data-master-service-id={e.service.serviceID}
                          master={e}
                          active={appointment.masterID == e.masterID ? true : false}
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
