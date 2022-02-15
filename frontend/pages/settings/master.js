import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import ScrollFrame from '../../components/frames/ScrollFrame.jsx'
import SettingsWrapper from '../../components/pages/settings'


const Settings = () => {
  const {t} = useTranslation('settings')

  return (
    <ScrollFrame navigation={true}>
      <SettingsWrapper>
        <span className="text-big">{t('Master_settigns')}</span>

        <div className="mt-3">
          In process...
        </div>
      </SettingsWrapper>
    </ScrollFrame>
  )
}


export default Settings
