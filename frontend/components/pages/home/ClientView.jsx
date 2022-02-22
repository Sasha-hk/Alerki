import AppointmentButton from '../../../components/Appointment/AppointmentButton'
import HomeWrapper from './HomeWrapper'
import cls from '../../../styles/pages/home/base.module.css'

const ClientView = () => {
  return (
    <HomeWrapper>
      <div>
        Future appointment views
      </div>
      
      <AppointmentButton />
    </HomeWrapper>
  )
}


export default ClientView
