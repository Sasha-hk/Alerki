import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CAPActions from '../../store/actions/CAPActions.js'
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import ModalHeading from '../Modal/ModalHeading'
import ModalContent from '../Modal/ModalContent'
import Calendar, {generateDays, setWeekendDays} from '../UI/Calendar/Calendar'
import AvailableDay from '../UI/Calendar/DayView/Available'
import NotAvailableDay from '../UI/Calendar/DayView/NotAvailable'
import AnotherMonth from '../UI/Calendar/DayView/AnotherMonth'
import DaysInscription from '../UI/Calendar/DaysInscription'
import MonthSwitch from '../UI/Calendar/MonthSwitch'
import cls from './appointment-buttons.module.css'


const SelectDataWindow = ({
  showModal,
  setShowModal,
  showButtons,
  setShowButtons,
}) => {
  const dispatch = useDispatch()
  const appointment = useSelector(store => store.cap.appointment)
  const scheduleStore = useSelector(store => store.cap.schedule)
  const schedule = scheduleStore.schedule

  const [calendar, setCalendar] = useState(null)
  const [calendarDate, setCalendarDate] = useState({
    date: new Date(),
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  })

  // generate calendar days
  useEffect(() => {
    if (schedule?.weekendDays) {
      const generatedDays = generateDays(calendarDate.date)
      setCalendar(setWeekendDays(generatedDays, schedule?.weekendDays))
    }
  }, [calendarDate, schedule, appointment.date])

  const closeSelectDateWindow = () => {
    setShowModal({...showModal, date: false})
  }
  
  return (
    <Modal
      show={showModal.date}
      onClose={closeSelectDateWindow}
      padding={false}
    >
      <div>
        <ModalHeading
          className="modal_heading"
        >
          <div style={{display: 'flex', justifyContent: 'space-between', slignItems: 'center'}}>
            <span className="text-big">{calendarDate.date.toLocaleDateString('EN', {month: 'long'}).toUpperCase()} {calendarDate.year}</span>

            <MonthSwitch
              date={calendarDate.date}   
              previous={() => {
                const previousDate = new Date(calendarDate.date)
                previousDate.setMonth(previousDate.getMonth() - 1)

                setCalendarDate({
                  date: previousDate,
                  year: previousDate.getFullYear(),
                  month: previousDate.getMonth(),
                })
              }}
              next={() => {
                const nextDate = new Date(calendarDate.date)
                nextDate.setMonth(nextDate.getMonth() + 1)

                setCalendarDate({
                  date: nextDate,
                  year: nextDate.getFullYear(),
                  month: nextDate.getMonth(),
                })
              }}
            />
          </div>
        </ModalHeading>
        <ModalContent className={cls.calendar_paddings}>
          <DaysInscription />
          <Calendar
            onClick={e => {
              // set date and switch windows
              const handle = (date) => {
                dispatch(CAPActions.updateAppointment({date}))

                setShowModal({...showModal, date: false, time: true})
              }
              
              // set date for new appointment
              if (e.target.dataset.date) {
                handle(e.target.dataset.date)
              }
              else {
                handle(e.target.offsetParent.dataset.date)
              }
            }}
          >
            {
              schedule && calendar
                ? 
                  calendar.map(day => {
                    if (day.type == 'available') {
                      return <AvailableDay 
                        key={day.date} 
                        data-date={`${day.date.getFullYear()} ${day.date.getMonth()} ${day.date.getDate()}`}
                        date={day.date.getDate()}
                        active={
                          appointment.date == `${day.date.getFullYear()} ${day.date.getMonth()} ${day.date.getDate()}`
                            ? true
                            : false
                        }
                      />
                    }
                    else if (day.type == 'another month') {
                      return <AnotherMonth 
                        key={day.date}
                      />
                    }
                    else if (day.type == 'not available') {
                      return <NotAvailableDay 
                        key={day.date} 
                        date={day.date.getDate()} 
                      />
                    }
                  })
                : null
            }
          </Calendar>
        </ModalContent>
      </div>

      {
        showButtons.master 
          ? <div>
              <Button 
                className="middle muted"
                onClick={e => setShowModal({...showModal, master: false})}
              >
                close
              </Button>

              <Button 
                className="middle primary"
                onClick={e => setShowModal({...showModal, master: false})}
              >
                confirm
              </Button>
            </div>
          : null
      }
    </Modal>
  )
}


export default SelectDataWindow
