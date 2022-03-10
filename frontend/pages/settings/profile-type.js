import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import ScrollFrame from '../../components/frames/ScrollFrame.jsx'
import SettingsWrapper from '../../components/pages/settings'
import Button from '../../components/UI/Button/Button.jsx'
import Input from '../../components/UI/Input/Input.jsx'
import Toggle from '../../components/UI/Toggle/Toggle.jsx'
import userActions from '../../store/actions/userActions'
import profileActions from '../../store/actions/profileActions'


const Settings = () => {
  const {t} = useTranslation('settings')
  const userState = useSelector(store => store.user)
  const user = userState.user
  const [profileType, setProfileType] = useState(
    user.profileType
      ? user.profileType == 'master' ? true : undefined
      : user.profileType == 'client' ? false : undefined,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (user.profileType == 'master') {
      if (!profileType) {
        setProfileType(true)
      }
    }
    dispatch(profileActions.upload({username: user.username}))
  }, [user.profileType])

  useEffect(async () => {
    if (user.profileType && profileType != undefined) {
      if (profileType && user.profileType == 'client') {
        setProfileType(true)
        dispatch(userActions.becomeMaster())
      }
      else if (!profileType && user.profileType == 'master') {
        setProfileType(false)
        dispatch(userActions.becomeClient())
      }
    }
  }, [profileType])

  return (
    <ScrollFrame navigation={true}>
      <SettingsWrapper>
        <span className="text-big">{t('Profile_type')}</span>

        <div className="mt-3">
          <Toggle variants={[t('master'), t('client')]} state={{state: profileType, set: setProfileType}} />

          <div className="mt-3">
            <span className="text-regular">{t('profile_type_description')}</span>
          </div>
        </div>
      </SettingsWrapper>
    </ScrollFrame>
  )
}


export default Settings
