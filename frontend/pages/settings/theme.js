import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import ScrollFrame from '../../components/frames/ScrollFrame.jsx'
import SettingsWrapper from '../../components/pages/settings'
import Toggle from '../../components/UI/Toggle/Toggle.jsx'


const Settings = () => {
  const {theme, setTheme} = useTheme()
  const [toggle, setToggle] = useState(theme == 'light' ? [true, false] : [false, true])

  useEffect(() => {
    if (toggle[0]) {
      setTheme('light')
    }
    else {
      setTheme('dark')
    }
  }, [toggle])


  return (
    <ScrollFrame navigation={true}>
      <SettingsWrapper>
        <span className="text-big">Profile type</span>

        <div className="mt-3">
          <Toggle variants={['light', 'dark']} state={{state: toggle, set: setToggle}} />
        </div>
      </SettingsWrapper>
    </ScrollFrame>
  )
}


export default Settings
