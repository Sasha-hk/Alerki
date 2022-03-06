import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import userActions from '../../../store/actions/userActions.js'
import Input from '../../UI/Input/Input'
import Select from '../../UI/Select/Select'
import Modal from '../../Modal/Modal'
import Toggle from '../../UI/Toggle/Toggle'
import cls from '../../../styles/pages/profile.module.css'


const getDurationView = (duration) => {
  let hours = Math.floor(duration / 60 / 60 / 1000) % 24
  let minutes = Math.floor(duration / 60 / 1000) % 60

  if (minutes == 0) {
    return `${hours}h.`
  }
  else if (hours == 0) {
    return `${minutes}m.`
  }
  return `${hours}h. ${minutes}m.`
}

const ManageServiceWIndow = ({
  children, 
  serviceData,
  setServiceData,
  showModal,
  setShowModal,
}) => {
  const {t} = useTranslation('profile')
  const dispatch = useDispatch()
  const profileStore = useSelector(store => store.profile)
  const profile = profileStore.profile
  const [priceType, setPriceType] = useState()
  
  const updateByName = (e) => {
    const newState = {
      ...serviceData,
    }
    newState[e.target.name] = e.target.value
    setServiceData(newState)
  }

  const creaeserviceData = () => {
    dispatch(userActions.createService(serviceData))
  }

  return (
    <Modal show={showModal} onClose={setShowModal}>
    <div>
        <span className="text-big"><b>New service</b></span>

        <form className="mt-3">
          <div>
            <Input 
              className="middle"
              placeholder="service name"
              name="name"
              value={serviceData.name}
              onChange={e => updateByName(e)}
              required
            />
          </div>

          <div>
            <label>Price:</label>
            <Toggle
              variants={['fixed', 'dynamic']}
              state={{state: priceType, set: setPriceType}}
              required
            />

            <div className={cls.currency_block}>
              <Input 
                placeholder={priceType ? 'fixed price' : 'from...'}
                className={[cls.price_input, "middle"].join(' ')}
                type="number" 
                min="1"
                max="10000"
                step="any"
                name="price"
                value={serviceData.price}
                onChange={e => updateByName(e)}
                required
              />

              <Select 
                className="little"
                name="currency"
                value={serviceData.currency}
                onChange={e => updateByName(e)}
                required
              >
                <option value="UAN">UAN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </Select>
            </div>
          </div>

          <div>
            <label>Duration:</label>
            
            <b>{getDurationView(serviceData.duration)}</b>

            <Input
              placeholder="duration"
              className="middle"
              type="range"
              min="1"
              max="120"
              step="1"
              name="duration"
              value={serviceData.duration / 60 / 1000}
              onChange={e => {
                setServiceData({
                  ...serviceData,
                  duration: e.target.value * 60 * 1000
                })
              }}
              required
            />
          </div>
        </form>
      </div>
      <div>
        {children}
      </div>
    </Modal>
  )
}


export default ManageServiceWIndow
