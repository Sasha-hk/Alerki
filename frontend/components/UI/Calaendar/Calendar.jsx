import {useRef} from 'react'
import Available from './DayView/Available'
import NotAvailable from './DayView/NotAvailable'
import AnotherMonth from './DayView/AnotherMonth'
import cls from './calendar.module.css'


const Calendar = () => {
  const d = useRef()
  return (
    <div
      ref={d}
      className={cls.calendar}
    >
      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>
    </div>
  )
}


export default Calendar
