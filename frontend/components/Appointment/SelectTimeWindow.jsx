import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import ModalHeading from '../Modal/ModalHeading'
import ModalContent from '../Modal/ModalContent'
import SelectTime, {generateTime} from './Select/SelectTime'
import cls from './styles/appointment-buttons.module.css'
import pageCls from './styles/select-time.module.css'


const SelectTimeWindow = ({
  showModal,
  setShowModal,
  showButtons,
  setShowButtons,
}) => {
  const dispatch = useDispatch()
  const CAPSrote = useSelector(store => store.cap)
  const appointment = CAPSrote.appointment
  const scheduleStore = useSelector(store => store.cap.schedule)
  const schedule = scheduleStore.schedule

  const [time, setTime] = useState(null)

  // generate time
  useEffect(() => {
    console.log(schedule)
    if (schedule?.weekendDays) {
      // const service = 
      console.log(appointment)

      // setTime(generateTime(
      //   schedule,
      //   schedule.workingStartTime,
      //   schedule.workingEndTime,
      // ))
      // const generatedDays = generateDays(calendarDate.date)
      // setCalendar(setWeekendDays(generatedDays, schedule?.weekendDays))
    }
  }, [schedule])

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