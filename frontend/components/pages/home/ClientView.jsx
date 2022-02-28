import AppointmentButton from '../../../components/Appointment/AppointmentButton'
import HomeWrapper from './HomeWrapper'
import cls from '../../../styles/pages/home/base.module.css'

// tmp
import Calendar from '../../UI/Calaendar/Calendar'

const ClientView = () => {
  return (
    <HomeWrapper>
      <Calendar></Calendar>
      
      <AppointmentButton />
    </HomeWrapper>
  )
}


export default ClientView
