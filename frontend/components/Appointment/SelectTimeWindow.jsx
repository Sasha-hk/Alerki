import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import ModalHeading from '../Modal/ModalHeading'
import ModalContent from '../Modal/ModalContent'
import SelectTime from './Select/SelectTime'
import cls from './appointment-buttons.module.css'
import pageCls from './styles/select-time.module.css'


const SelectTimeWindow = ({
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

  const [time, setTime] = useState(null)
  const [selectTime, setSelectTime] = useState({
    date: new Date(),
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  })

  // generate calendar days
  // useEffect(() => {
  //   if (schedule?.weekendDays) {
  //     const generatedDays = generateDays(calendarDate.date)
  //     setCalendar(setWeekendDays(generatedDays, schedule?.weekendDays))
  //   }
  // }, [calendarDate, schedule, appointment.date])

  const closeSelectTimeWindow = () => {
    setShowModal({...showModal, time: false})
  }
  
  return (
    <Modal
      show={showModal.time}
      onClose={closeSelectTimeWindow}
      padding={false}
    >
      <div>
        <ModalHeading
          className="modal_heading"
        >
          <span className="text-big">Select time</span>
        </ModalHeading>
        <ModalContent
          className={[cls.calendar_paddings, pageCls.select_time_wrapper].join(' ')}
          onClick={e => {
            // if (e.target.dataset['masterId']) {
            // }
          }}
        >
          <SelectTime 
            from="10:30"
            to="12:00"
          />
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


export default SelectTimeWindow
