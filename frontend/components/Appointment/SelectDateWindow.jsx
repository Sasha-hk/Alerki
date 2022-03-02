import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import ModalHeading from '../Modal/ModalHeading'
import ModalContent from '../Modal/ModalContent'
import Calendar, {generateDays, setWeekendDays} from '../UI/Calendar/Calendar'
import AvailableDay from '../UI/Calendar/DayView/Available'
import NotAvailableDay from '../UI/Calendar/DayView/NotAvailable'
import AnotherMonth from '../UI/Calendar/DayView/AnotherMonth'
import DaysInscription from '../UI/Calendar/DaysInscription'


const SelectDataWindow = ({
  appointment,
  setAppointment,
  showModal,
  setShowModal,
  showButtons,
  setShowButtons,
}) => {
  const dispatch = useDispatch()
  const scheduleStore = useSelector(store => store.cap.schedule)
  const schedule = scheduleStore.schedule

  const [calendar, setCalendar] = useState(null)
  const [calendarMonth, setCalendarMonth] = useState({
    date: new Date(),
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  })

  useEffect(() => {
    setCalendar(generateDays(calendarMonth.date, setCalendar))
  }, [])

  useEffect(() => {
    if (schedule?.weekendDays) {
      setCalendar(setWeekendDays(calendar, schedule?.weekendDays))
    }
  }, [schedule])

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
          <span className="text-big">MARCH 2022</span>
        </ModalHeading>
        <ModalContent
          className='pb-2'
          onClick={e => {
            if (e.target.dataset['masterId']) {
              // setAppointment({
              //   ...appointment,
              //   masterID: e.target.dataset.masterId,
              //   masterServiceID: e.target.dataset.masterServiceId,
              // })
              
              // setShowModal({...showModal, master: false})
            }
          }}
        >
          <DaysInscription />
          <Calendar>
            {
              schedule && calendar
                ? 
                  calendar.map(day => {
                    if (day.type == 'available') {
                      return <AvailableDay key={day.date} date={day.date.getDate()} />
                    }
                    else if (day.type == 'another month') {
                      return <AnotherMonth key={day.date}/>
                    }
                    else if (day.type == 'not available') {
                      return <NotAvailableDay key={day.date} date={day.date.getDate()} />
                    }
                  })
                : 0
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
