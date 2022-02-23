import Modal from '../Modal/Modal'
import Button from '../UI/Button/Button'
import Input from '../UI/Input/Input'
import ServiceItem from './ServiceItem'


const SelectServiceWindow = ({
  services,
  showModal, 
  setShowModal,
  showButtons,
  setShowButtons,
}) => {
    return (
    <Modal
      show={showModal.service}
      onClose={closeSelectServiceWindow}
      padding={false}
    >
      <div>
        <Input 
          className={['modal_heading', cls.service_search_input].join(' ')}
          placeholder="service name"
          onChange={e => {
            findIfRequire(e)
            setServicesFilter(e.target.value)
          }}
        />

        <div 
          className='pb-2'
          onClick={e => {
            if (e.target.dataset.id) {
              setAppointment({
                ...appointment,
                serviceID: e.target.dataset.id,
              })

              dispatch(masterActions.upload({
                serviceID: e.target.dataset.id,
              }))

              setShowModal({...showModal, service: false, master: true})
            }
          }}
        >
          <div>
            {
              services
                ? filtredServices.map(e => {
                  return (
                    <ServiceItem 
                      key={e.id} 
                      data-id={e.id}
                      className="modal_paddings"
                    >
                      {e.name}
                    </ServiceItem>
                  )
                })
                : null
            }
          </div>
        </div>
      </div>

      {
        showButtons.service
          ? <div>
              <Button 
                className="middle muted"
                onClick={e => setShowModal({...showModal, service: false})}
              >
                close
              </Button>

              <Button 
                className="middle primary"
                onClick={e => setShowModal({...showModal, service: false})}
              >
                confirm
              </Button>
            </div>

          : null
      }
    </Modal>
  )
}


export default SelectServiceWindow
