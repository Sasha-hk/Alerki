import { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import CAPActions from '../../store/actions/CAPActions.js'
import SelectMaster from './Select/SelectMaster'
import ModalHeading from '../Modal/ModalHeading'
import SearchInput from '../Modal/UI/SearchInput'


const useFiltredMasters = (masters, filter) => {
  const filtred = useMemo(() => {
    if (masters) {
      return masters.filter(master => {
        const FullName = `${master.username} ${master.firstName} ${master.lastName}`
        return FullName.toLowerCase().includes(filter.toLowerCase())
      })
    }
  }, [masters, filter])

  return filtred
}

const SelectMasterWindow = ({
  showModal,
  setShowModal,
  showButtons,
  setShowButtons,
}) => {
  const dispatch = useDispatch()
  const appointment = useSelector(store => store.cap.appointment)
  const mastersStore = useSelector(store => store.cap.masters)
  const masters = mastersStore.masters

  const [mastersFilter, setMasterFilter] = useState('')
  const filtredMasters = useFiltredMasters(masters, mastersFilter)

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
        >
          <div>
            <ModalHeading
              className="modal_heading"
            >
              <SearchInput 
                placeholder="master"
                value={mastersFilter} 
                onChange={e => {
                  setMasterFilter(e.target.value)
                  dispatch(CAPActions.uploadMasters({
                    serviceID: appointment.serviceID,
                    limit: 1000,
                  }))
                }}
              />
            </ModalHeading>
            <div
              className='pb-2'
              onClick={e => {
                if (e.target.dataset['masterId']) {
                  console.log(masters)
                  const masterService = masters.find(i => i.masterID == e.target.dataset.masterId)

                  dispatch(CAPActions.updateAppointment({
                    masterService: masterService,
                    masterID: e.target.dataset.masterId,
                    masterServiceID: e.target.dataset.masterServiceId,                    
                  }))

                  dispatch(CAPActions.uploadSchedule({
                    year: new Date().getFullYear(),
                    month: new Date().getMonth(),
                    masterID: e.target.dataset.masterId,
                  }))
                  
                  setShowModal({...showModal, master: false, date: true})
                }
              }}
            >
              {
                filtredMasters
                  ? filtredMasters.map(e => {
                      return (
                        <SelectMaster
                          key={e.id}
                          data-master-id={e.masterID}
                          data-master-service-id={e.service.id}
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
