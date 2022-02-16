import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import getT from 'next-translate/getT'
import profileActions from '../../../store/actions/profileActions.js'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import Select from '../../UI/Select/Select'
import Modal from '../../Modal/Modal'
import Toggle from '../../UI/Toggle/Toggle'
import cls from '../../../styles/pages/profile.module.css'


const CreateService = () => {
  const {t} = useTranslation('profile')
  const dispatch = useDispatch()
  const profileStore = useSelector(store => store.profile)
  const profile = profileStore.profile
  const [newService, setNewService] = useState({
    name: "",
    currency: "UAN",
    price: 1,
    location: "",
    duration: 1,
  })
  const [priceType, setPriceType] = useState()
  const [showModal, setShowModal] = useState(false)

  if (newService.duration >= 60) {
    var durationView = Math.trunc(newService.duration / 60) + 'h. '
    if (newService.duration % 60 != 0) {
      durationView += newService.duration % 60 + 'm.'
    }
  }
  else {
    var durationView = newService.duration % 60 + 'm.'
  }
  
  const updateByName = (e) => {
    const newState = {
      ...newService,
    }
    newState[e.target.name] = e.target.value
    setNewService(newState)

  }

  const createServiceWindow = (
    <Modal show={showModal} onClose={setShowModal}>
      <div>
        <span className="text-big"><b>New service</b></span>

        <form className="mt-3">
          <div className="settings-block">
            <Input 
              className="middle"
              placeholder="service name"
              name="name"
              value={newService.name}
              onChange={e => updateByName(e)}
              required
            />
          </div>

          <div className="settings-block">
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
                value={newService.price}
                onChange={e => updateByName(e)}
                required
              />

              <Select 
                className="little"
                name="currency"
                value={newService.currency}
                onChange={e => updateByName(e)}
                required
              >
                <option value="UAN">UAN</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </Select>
            </div>
          </div>

          <div className="settings-block">
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
              value={newService.duration}
              onChange={e => updateByName(e)}
              required
            />
          </div>
        </form>
      </div>
      <div>
        <Button
          className="muted middle br-1"
        >
          cancel
        </Button>
        <Button
          className="primary middle br-1"
        >
          create
        </Button>
      </div>
    </Modal>
  )

  return (
    <>
      {createServiceWindow}
        <Button
          className="little sceleton br-3"
          onClick={e => setShowModal(true)}
        >
          create +
        </Button> 
    </>
  )
}


export default CreateService
