import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import serviceActions from '../../store/actions/serviceActions.js'
import masterActions from '../../store/actions/masterActions.js'
import SelectService from './Select/SelectService'
import ModalHeading from '../Modal/ModalHeading'
import ModalContent from '../Modal/ModalContent'
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
  appointment,
  setAppointment,
  showModal, 
  setShowModal,
  showButtons,
  setShowButtons,
}) => {
  const dispatch = useDispatch()
  const serviceStore = useSelector(store => store.service)
  const services = serviceStore.services
 
  const [servicesFilter, setServicesFilter] = useState('')
  const filtredServices = useFiltredServices(services, servicesFilter)

  // upload services
  useEffect(() => {
    dispatch(serviceActions.upload())
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
      dispatch(serviceActions.find({
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
          <Input
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
              setAppointment({
                ...appointment,
                serviceID: e.target.dataset.id,
              })

              dispatch(masterActions.upload({
                serviceID: e.target.dataset.id,
              }))

              setShowModal({...showModal, service: false, master: true})
            }
          }}
        >
          <div>
            {
              services
                ? filtredServices.map(e => {
                  return (
                    <SelectService
                      key={e.id} 
                      data-id={e.id}
                      className="modal_paddings"
                    >
                      {e.name}
                    </SelectService>
                  )
                })
                : null
            }
          </div>
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
                onClick={e => setShowModal({...showModal, service: false})}
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
