import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'

import ScrollFrame from '../../components/frames/ScrollFrame.jsx'
import SettingsWrapper from '../../components/pages/settings'
import Input from '../../components/UI/Input/Input.jsx'
import Button from '../../components/UI/Button/Button.jsx'
import RadioButton from '../../components/UI/RadioButton/RadioButton.jsx'
import Checkbox from '../../components/UI/Checkbox/Checkbox.jsx'

import userActions from '../../store/actions/userActions'


const Settings = () => {
  const {t} = useTranslation('settings')
  const weekDays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ]

  const dispatch = useDispatch()
  const userStore = useSelector(store => store.user)
  const user = userStore.user

  const [updateMasterData, setUpdateMasterData] = useState({
    workingStartTime: null,
    workingEndTime: null,
    shortBiography: null,
    instagramProfile: null,
    weekendDays: {},
  })
  const convertTimeToMilliseconds = (time) => {
    const parsed = time.split(':')
    return parsed[0] * 60 * 60 * 1000 + parsed[1] * 60 * 1000
  }

  const convertMillisecondsToTime = (milliseconds) => {
    const hours = String(Math.floor(milliseconds / 60 / 60 / 1000))
    const seconds = String(milliseconds % 60 / 1000)
    
    return `${hours.length == 1 ? '0' + hours : hours}:${seconds.length == 1 ? '0' + seconds : seconds}` 
  }

  useEffect(() => {
    if (user.master) {
      setUpdateMasterData({
        workingStartTime: user?.master?.workingStartTime
          ? convertMillisecondsToTime(user?.master?.workingStartTime)
          : null,
        workingEndTime: user?.master?.workingEndTime
          ? convertMillisecondsToTime(user?.master?.workingEndTime)
          : null,
        shortBiography: user?.master?.shortBiography,
        instagramProfile: user?.master?.instagramProfile,
        weekendDays: user?.master?.weekendDays,
      })
    }
  }, [user])

  const onUpdateWeekendDays = (e) => {
    const updatedDays = {
      ...updateMasterData,
      weekendDays: {
        ...updateMasterData.weekendDays,
      }
    }
    
    updatedDays['weekendDays'][e.target.name] = e.target.checked
    setUpdateMasterData(updatedDays)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (updateMasterData.weekendDays) {
      dispatch(userActions.updateMasterWeekendDays(updateMasterData.weekendDays))
    }
    if (updateMasterData.workingStartTime || 
        updateMasterData.workingEndTime || 
        updateMasterData.shortBiography || 
        updateMasterData.instagramProfile
      ) {
      dispatch(userActions.updateMaster({
        ...updateMasterData,
        workingStartTime: updateMasterData.workingStartTime
          ? convertTimeToMilliseconds(updateMasterData.workingStartTime)
          : null,
        workingEndTime: updateMasterData.workingEndTime 
          ? convertTimeToMilliseconds(updateMasterData.workingEndTime)
          : null,
      }))
    }
  }

  return (
    <ScrollFrame navigation={true}>
      <SettingsWrapper>
        <span className="text-big">{t('Master_settigns')}</span>

        <form 
          className="space-above"
          onSubmit={e => handleSubmit(e)}
        >
          <div>
            <label>About: </label>

            <textarea 
              cols="30" 
              rows="10"
              value={updateMasterData.shortBiography}
              onChange={e => setUpdateMasterData({...updateMasterData, shortBiography: e.target.value})}
              placeholder="About you..."
            >

            </textarea>
          </div>
          <div>
            <label>Work time:</label>

            <label>from</label>
            <Input
              className="middle"
              placeholder="form"
              value={updateMasterData.workingStartTime || ""}
              onChange={e => setUpdateMasterData({
                ...updateMasterData,
                workingStartTime: e.target.value,
              })}
              type="time"
            />

            <label>to</label>
            <Input
              className="middle"
              placeholder="to"
              value={updateMasterData.workingEndTime || ""}
              onChange={e => setUpdateMasterData({
                ...updateMasterData,
                workingEndTime: e.target.value,
              })}
              type="time"
            />
          </div>

          <div>
            <label>Weekend days:</label>

            <Checkbox>
              {
                weekDays.map(e => {
                  return (
                    <label key={e}>
                      <Input
                        type="checkbox"
                        name={e}
                        checked={updateMasterData?.weekendDays?.[e] || false}
                        onChange={e => onUpdateWeekendDays(e)}
                      />
                      {e}
                    </label>
                  )
                })
              }
            </Checkbox>
          </div>

          <Button
            className="middle primary stratch br-1"
          >submit</Button>
        </form>
      </SettingsWrapper>
    </ScrollFrame>
  )
}


export default Settings
