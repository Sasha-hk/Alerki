import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import appointmentActins from '../../store/actions/appointmentActions.js'
import ServiceItem from './ServiceItem'
import api from '../../http'
import clsButton from './appointment-buttons.module.css'
import cls from '../../styles/pages/home/base.module.css'


const useFiltredServices = (services, sort) => {
  const filtred = useMemo(() => {
    return services.filter(service => {
      console.log(service)
      return service.name.toLowerCase().includes(sort.toLowerCase())
    })
  }, [services, sort])

  return filtred
}

const AppointmentButton = () => {
  const dispatch = useDispatch()
  const appointmentStore = useSelector(store => store.appointment)
  const appointments = appointmentStore.appointments

  const [selectService, setSelectService] = useState()
  const [serviceWindow, setServiceWindow] = useState(false)
  const [selectMaster, setSelectMaster] = useState()
  const [masterWindow, setMasterWindow] = useState(false)
  
  const [services, setServices] = useState()

  const [servicesFilter, setServicesFilter] = useState(null)
  const filtredServices = useFiltredServices(services, servicesFilter)

  useEffect(() => {
    api({
      url: '/services/',
      params: {
        limit: 30,
        page: 0,
      }
    })
      .then(r => {
        setServices(r.data)
      })
  }, [])

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
