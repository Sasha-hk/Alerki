import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import appointmentActins from '../../store/actions/appointmentActions.js'
import ServiceItem from './ServiceItem'
import api from '../../http'
import cls from './appointment-buttons.module.css'


const AppointmentButton = () => {
  const dispatch = useDispatch()
  const appointmentStore = useSelector(store => store.appointment)
  const appointments = appointmentStore.appointments

  const [selectService, setSelectService] = useState()
  const [serviceWindow, setServiceWindow] = useState(false)
  const [selectMaster, setSelectMaster] = useState()
  const [masterWindow, setMasterWindow] = useState(false)

  const [services, setServices] = useState()

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
    <div className={cls.buttons_wrapper}>
      {/* service modal */}
      <Modal 
        show={serviceWindow}
        onClose={setServiceWindow}
      >
        <div>
          <span className="text-big">Service</span>

          <ul className={[cls.services_wrapper, 'mt-3', 'pb-2'].join(' ')}>
            {
              services
                ? services.map(e => {
                  return (
                    <ServiceItem key={e.id}>
                      {e.name}
                    </ServiceItem>
                  )
                })
                : null
            }
          </ul>
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
        className={cls.service_button}
        onClick={e => setServiceWindow(true)}
      >
        <span className={cls.button_inscription}>Service</span>
      </div>

      <div 
        className={cls.master_button}
        onClick={e => console.log('Master')}
      >
        <span className={cls.button_inscription}>Master</span>
      </div>
    </div>
  )
}


export default AppointmentButton
