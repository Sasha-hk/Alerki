import { useEffect, useRef } from 'react'
import Available from './DayView/Available'
import NotAvailable from './DayView/NotAvailable'
import AnotherMonth from './DayView/AnotherMonth'
import cls from './calendar.module.css'


const Calendar = () => {
  const calendarElement = useRef() 

  return (
    <div
      ref={calendarElement}
      className={cls.calendar}
    >
      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>


      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>

      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>
      <Available></Available>


      <AnotherMonth></AnotherMonth>
      <AnotherMonth></AnotherMonth>
      <AnotherMonth></AnotherMonth>
      <AnotherMonth></AnotherMonth>
      <AnotherMonth></AnotherMonth>
      <AnotherMonth></AnotherMonth>
      <AnotherMonth></AnotherMonth>


      <NotAvailable></NotAvailable>
      <NotAvailable></NotAvailable>
      <NotAvailable></NotAvailable>
      <NotAvailable></NotAvailable>
      <NotAvailable></NotAvailable>
      <NotAvailable></NotAvailable>
      <NotAvailable></NotAvailable>
    </div>
  )
}


export default Calendar
