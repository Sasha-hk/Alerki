import { useEffect, useRef } from 'react'
import Available from './DayView/Available'
import NotAvailable from './DayView/NotAvailable'
import AnotherMonth from './DayView/AnotherMonth'
import cls from './calendar.module.css'


const Calendar = ({children, ...props}) => {
  const calendarElement = useRef() 

  return (
    <div
      {...props}
      ref={calendarElement}
      className={[cls.calendar, props.className].join(' ')}
    >
      {children}  
    </div>
  )
}


export default Calendar
