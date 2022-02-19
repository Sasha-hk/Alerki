import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import getT from 'next-translate/getT'
import userActions from '../../../store/actions/userActions.js'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import Select from '../../UI/Select/Select'
import Modal from '../../Modal/Modal'
import Toggle from '../../UI/Toggle/Toggle'
import cls from '../../../styles/pages/profile.module.css'


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

  if (serviceData.duration >= 60) {
    var durationView = Math.trunc(serviceData.duration / 60) + 'h. '
    if (serviceData.duration % 60 != 0) {
      durationView += serviceData.duration % 60 + 'm.'
    }
  }
  else {
    var durationView = serviceData.duration % 60 + 'm.'
  }
  
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
            
            <b>{durationView}</b>

            <Input
              placeholder="duration"
              className="middle"
              type="range"
              min="1"
              max="120"
              step="1"
              name="duration"
              value={serviceData.duration}
              onChange={e => updateByName(e)}
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
