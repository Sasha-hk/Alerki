import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import ScrollFrame from '../../frames/ScrollFrame'
import SettingsItem from '../../pages/settings/SettingsItem'

import cls from '../../../styles/pages/settings/base.module.css'


const SettingsWrapper = ({children}) => {
  const router = useRouter()
  const userProfile = useSelector(store => store.user)
  const user = userProfile.user

  return (
    <div className="container">
      <div className={cls.settings}>
        <div className={cls.settings_items}>
          <span className="text-big"><b>Settings</b></span>

          <div className="mt-3">
            <SettingsItem 
              name="profile" 
              url="profile"
              active={router.pathname == '/settings/profile'}
            />
            <SettingsItem 
              name="profile type" 
              url="profile-type"
              active={router.pathname == '/settings/profile-type'}
            />
            <SettingsItem 
              name="theme" 
              url="theme"
              active={router.pathname == '/settings/theme'}
            />

            {
              user.profileType == 'master'
                ? <>
                  <SettingsItem 
                    name="master" 
                    url="master"
                    active={router.pathname == '/settings/master'}
                  />
                </>
                : null
            }
          </div>
        </div>

        <div className={cls.settings_view}>
          {children}
        </div>
      </div>
    </div>
  )
}


export default SettingsWrapper
