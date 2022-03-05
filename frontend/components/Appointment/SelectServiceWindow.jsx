import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import CAPActinons from '../../store/actions/CAPActions.js'
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import CAPActions from '../../store/actions/CAPActions.js'
import SelectService from './Select/SelectService'
import ModalHeading from '../Modal/ModalHeading'
import SearchInput from '../Modal/UI/SearchInput'
import cls from '../../styles/pages/home/base.module.css'


const useFiltredServices = (services, sort) => {
  const filtred = useMemo(() => {
    if (services) {
      return services.filter(service => service.name.toLowerCase().includes(sort.toLowerCase()))
    }
  }, [services, sort])

  return filtred
}

const SelectServiceWindow = ({
  showModal, 
  setShowModal,
  showButtons,
  setShowButtons,
}) => {
  const dispatch = useDispatch()
  const appointment = useSelector(store => store.cap.appointment)
  const servicesStore = useSelector(store => store.cap.services)
  const services = servicesStore.services
 
  const [servicesFilter, setServicesFilter] = useState('')
  const filtredServices = useFiltredServices(services, servicesFilter)

  // upload services
  useEffect(() => {
    dispatch(CAPActions.uploadServices())
  }, [])

  const closeSelectServiceWindow = () => {
    setShowModal({...showModal, service: false})
    setShowButtons({...showButtons, service: true})
  }

  // find services if it's need
  const findIfRequire = (e) => {
    let ifUpload = true
    for (let i of services) {
      if (i.name.includes(e.target.value)) {
        ifUpload = false
        break
      }
    }

    if (ifUpload) {
      dispatch(CAPActions.findServices({
        name: e.target.value
      }))
    }
  }

  return (
    <Modal
      show={showModal.service}
      onClose={closeSelectServiceWindow}
      padding={false}
    >
      <div>
        <ModalHeading>
          <SearchInput
            className={[cls.service_search_input].join(' ')}
            placeholder="service name"
            onChange={e => {
              findIfRequire(e)
              setServicesFilter(e.target.value)
            }}
          />
        </ModalHeading>

        <div
          className='pb-2'
          onClick={e => {
            if (e.target.dataset.id) {
              dispatch(CAPActions.updateAppointment({
                ...appointment,
                serviceID: e.target.dataset.id,
              }))

              dispatch(CAPActions.uploadMasters({
                serviceID: e.target.dataset.id,
              }))

              setShowModal({...showModal, service: false, master: true})
            }
          }}
        >
          {
            services
              ? filtredServices.map(e => {
                return (
                  <SelectService
                    key={e.id} 
                    data-id={e.id}
                    className="modal_paddings"
                    active={appointment.serviceID == e.id ? true : false}
                  >
                    {e.name}
                  </SelectService>
                )
              })
              : null
          }
        </div>
      </div>

      {
        showButtons.service
          ? <div>
              <Button 
                className="middle muted"
                onClick={e => setShowModal({...showModal, service: false})}
              >
                close
              </Button>

              <Button 
                className="middle primary"
                onClick={e => setShowModal({...showModal, service: false, master: true})}
              >
                confirm
              </Button>
            </div>

          : null
      }
    </Modal>
  )
}


export default SelectServiceWindow
