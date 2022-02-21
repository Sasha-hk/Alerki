import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import cls from './appointment-buttons.module.css'


const AppointmentButton = () => {
  const [selectService, setSelectService] = useState()
  const [serviceWindow, setServiceWindow] = useState(false)
  const [selectMaster, setSelectMaster] = useState()
  const [masterWindow, setMasterWindow] = useState(false)

  return (
    <div className={cls.buttons_wrapper}>
      {/* service modal */}
      <Modal 
        show={serviceWindow}
        onClose={setServiceWindow}
      >
        <div>
          <span>Service</span>

          <form className="space-above">
            some inputs...
          </form>
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
