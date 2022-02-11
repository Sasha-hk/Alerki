import { useState } from 'react'
import ScrollFrame from '../../components/frames/ScrollFrame.jsx'
import SettingsWrapper from '../../components/pages/settings'
import Button from '../../components/UI/Button/Button.jsx'
import Input from '../../components/UI/Input/Input.jsx'
import Toggle from '../../components/UI/Toggle/Toggle.jsx'


const Settings = () => {
  const [toggle, setToggle] = useState([false, true])
  return (
    <ScrollFrame navigation={true}>
      <SettingsWrapper>
        <span className="text-big">Profile type</span>

        <div className="mt-3">
          <Toggle variants={['master', 'client']} state={{state: toggle, set: setToggle}} />
        </div>
      </SettingsWrapper>
    </ScrollFrame>
  )
}


export default Settings