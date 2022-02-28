import AppointmentButton from '../../../components/Appointment/AppointmentButton'
import HomeWrapper from './HomeWrapper'
import cls from '../../../styles/pages/home/base.module.css'


const ClientView = () => {
  return (
    <HomeWrapper>
      <span className="text-big">Planned:</span>
      
      <AppointmentButton />
    </HomeWrapper>
  )
}


export default ClientView
