import useTranslation from 'next-translate/useTranslation'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import ScrollFrame from '../../components/frames/ScrollFrame.jsx'
import SettingsWrapper from '../../components/pages/settings'
import Toggle from '../../components/UI/Toggle/Toggle.jsx'


const Settings = () => {
  const {t} = useTranslation('settings')
  const {theme, setTheme} = useTheme()
  const [toggle, setToggle] = useState(theme == 'light')

  useEffect(() => {
    if (toggle) {
      setTheme('light')
    }
    else {
      setTheme('dark')
    }
  }, [toggle])


  return (
    <ScrollFrame navigation={true}>
      <SettingsWrapper>
        <span className="text-big">{t('Theme')}</span>

        <div className="mt-3">
          <Toggle variants={[t('theme_light'), t('theme_dark')]} state={{state: toggle, set: setToggle}} />
        </div>
      </SettingsWrapper>
    </ScrollFrame>
  )
}


export default Settings
