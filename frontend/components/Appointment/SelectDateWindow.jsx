import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import ModalHeading from '../Modal/ModalHeading'
import ModalContent from '../Modal/ModalContent'
import Calendar, {generateDays} from '../UI/Calendar/Calendar'
import AvailableDay from '../UI/Calendar/DayView/Available'
import NotAvailableDay from '../UI/Calendar/DayView/NotAvailable'
import AnotherMonth from '../UI/Calendar/DayView/AnotherMonth'


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

  if (!calendar) {
    generateDays(calendarMonth.date, setCalendar)
  }

  const closeSelectDateWindow = () => {
    setShowModal({...showModal, date: false})
  }
  console.log(calendar)
  
  return (
    <Modal
      show={showModal.date}
      onClose={closeSelectDateWindow}
      padding={false}
    >
      <div
        onClick={e => {
          // if (e.target.dataset.id) {
          //   setAppointment({
          //     ...appointment,
          //     serviceID: e.target.dataset.id,
          //   })

          //   setShowModal({...showModal, master: false})
          //   setShowModal({...showModal, date: true})
          // }
        }}
      >
        <ModalHeading
          className="modal_heading"
        >
          <span className="text-big">2022 Fabruary</span>
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
          <Calendar>
            {
              schedule && calendar
                ? 
                  calendar.map(day => {
                    console.log(day.type)
                    if (day.type == 'available') {
                      return <AvailableDay key={day.date} date={day.date.getDate()} />
                    }
                    else if (day.type == 'another month') {
                      return <AnotherMonth key={day.date}/>
                    }
                  })
                : 0
            }
          </Calendar>
          {/* {
            filtredMasters
              ? filtredMasters.map(e => {
                  return (
                    <SelectMaster
                      key={e.id}
                      data-master-id={e.masterID}
                      data-master-service-id={e.service.serviceID}
                      master={e}
                      active={appointment.masterID == e.masterID ? true : false}
                    >
                      {e.username}
                    </SelectMaster>
                  )
                })
              : null
          } */}
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
