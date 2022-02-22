import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import appointmentActins from '../../store/actions/appointmentActions.js'
import serviceActions from '../../store/actions/serviceActions.js'
import ServiceItem from './ServiceItem'
import api from '../../http'
import clsButton from './appointment-buttons.module.css'
import cls from '../../styles/pages/home/base.module.css'


const useFiltredServices = (services, sort) => {
  const filtred = useMemo(() => {
    if (services) {
      return services.filter(service => service.name.toLowerCase().includes(sort.toLowerCase()))
    }
  }, [services, sort])

  return filtred
}

const AppointmentButton = () => {
  const dispatch = useDispatch()
  const appointmentStore = useSelector(store => store.appointment)
  const appointments = appointmentStore.appointments
  const serviceStore = useSelector(store => store.service)
  const services = serviceStore.services

  const [selectService, setSelectService] = useState()
  const [serviceWindow, setServiceWindow] = useState(false)
  const [selectMaster, setSelectMaster] = useState()
  const [masterWindow, setMasterWindow] = useState(false)
  
  const [servicesFilter, setServicesFilter] = useState('')
  const filtredServices = useFiltredServices(services, servicesFilter)

  useEffect(() => {
    dispatch(serviceActions.upload())
  }, [])

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
    <div className={clsButton.buttons_wrapper}>
      {/* service modal */}
      <Modal 
        show={serviceWindow}
        onClose={setServiceWindow}
        padding={false}
      >
        <div>
          <Input 
            className={['modal_heading', cls.service_search_input].join(' ')}
            placeholder="service name"
            onChange={e => {
              findIfRequire(e)
              setServicesFilter(e.target.value)
            }}
          />

          <div className={[clsButton.services_wrapper, 'pb-2'].join(' ')}>
            <div>
              {
                services
                  ? filtredServices.map(e => {
                    return (
                      <ServiceItem key={e.id} className="modal_paddings">
                        {e.name}
                      </ServiceItem>
                    )
                  })
                  : null
              }
            </div>
          </div>
        </div>

        <div>
          <Button 
            className="middle muted"
            onClick={e => setServiceWindow(false)}
          >
            close
          </Button>

          <Button 
            className="middle primary"
            onClick={e => setServiceWindow(false)}
          >
            confirm
          </Button>
        </div>
      </Modal>

      {/* master modal in future */}
      <div 
        className={clsButton.service_button}
        onClick={e => setServiceWindow(true)}
      >
        <span className={clsButton.button_inscription}>Service</span>
      </div>

      <div 
        className={clsButton.master_button}
        onClick={e => console.log('Master')}
      >
        <span className={clsButton.button_inscription}>Master</span>
      </div>
    </div>
  )
}


export default AppointmentButton
