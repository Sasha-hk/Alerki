import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'

import ScrollFrame from '../../components/frames/ScrollFrame.jsx'
import SettingsWrapper from '../../components/pages/settings'
import Input from '../../components/UI/Input/Input.jsx'
import Button from '../../components/UI/Button/Button.jsx'
import RadioButton from '../../components/UI/RadioButton/RadioButton.jsx'
import Checkbox from '../../components/UI/Checkbox/Checkbox.jsx'


const Settings = () => {
  const {t} = useTranslation('settings')

  const dispatch = useDispatch()
  const userStore = useSelector(store => store.user)
  const user = userStore.user


  return (
    <ScrollFrame navigation={true}>
      <SettingsWrapper>
        <span className="text-big">{t('Master_settigns')}</span>

        <form className="space-above">
          <div>
            <label>Work time:</label>

            <Input
              className="middle"
              placeholder="form"
              type="time"
            />

            <Input
              className="middle"
              placeholder="to"
              type="time"
            />
          </div>

          <div>
            <label>Weekend days:</label>

            <Checkbox>
              <label>
                <Input 
                  type="checkbox"
                />
                monday
              </label>

              <label>
                <Input 
                  type="checkbox"
                />
                thuesday
              </label>

              <label>
                <Input 
                  type="checkbox"
                />
                wednesday
              </label>

              <label>
                <Input 
                  type="checkbox"
                />
                thursday
              </label>

              <label>
                <Input 
                  type="checkbox"
                />
                friday
              </label>

              <label>
                <Input 
                  type="checkbox"
                />
                sunday
              </label>

              <label>
                <Input 
                  type="checkbox"
                />
                saturday
              </label>
            </Checkbox>

          </div>
        </form>
      </SettingsWrapper>
    </ScrollFrame>
  )
}


export default Settings
