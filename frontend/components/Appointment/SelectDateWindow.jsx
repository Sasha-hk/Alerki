import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import ModalHeading from '../Modal/ModalHeading'
import ModalContent from '../Modal/ModalContent'
import Calendar from '../UI/Calendar/Calendar'
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
  const masterSchedule = useSelector(store => store.cap.schedule)
  const masters = masterSchedule.schedule

  const [calendarDate, setCalendarData] = useState({
    date: new Date(),
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  })

  const closeSelectDateWindow = () => {
    setShowModal({...showModal, date: false})
  }
  
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
          <Calendar />
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
