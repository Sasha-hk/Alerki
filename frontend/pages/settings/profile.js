import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Rotuer, { useRouter } from 'next/router'
import { io } from 'socket.io-client'
import ScrollFrame from '../../components/frames/ScrollFrame.jsx'
import SettingsWrapper from '../../components/pages/settings'
import Button from '../../components/UI/Button/Button.jsx'
import Input from '../../components/UI/Input/Input.jsx'
import profileActions from '../../store/actions/profileActions'
import { useAuth } from '../../provider/AuthProvider'
import cls from '../../styles/pages/settings/profile.module.css'


const socket = io('http://192.168.1.11:3001')
const Settings = () => {
  const {authData, refresh} = useAuth()
  const profileData = useSelector(store => store.profile) 
  const dispatch = useDispatch()
  const profile = profileData.profile

  const [updateProfileData, setUpdateProfileData] = useState({
    username: profile.username,
    firstName: profile.firstName,
    lastName: profile.lastName,
    picture: profile.pictureID,
  })

  useEffect(() => {
    if (authData.username) {
      dispatch(profileActions.upload({
          username: authData.username,
      }))
    }
  }, [authData])

  useEffect(() => {
    if (!profileData.loading) {
      setUpdateProfileData({
        username: profile.username,
        firstName: profile.firstName,
        lastName: profile.lastName,
        picture: profile.pictureID,
      })
    }
  }, [profileData])

  const updateProfile = async (e) => {
    e.preventDefault()
    
    if (updateProfileData.picture) {
      socket.io.emit("e", () => {
        console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      });
    }
    await dispatch(profileActions.update(updateProfileData))
    refresh()
  }

 return (
    <ScrollFrame navigation={true}>
      <SettingsWrapper>
        <span className="text-big mb-3">Profile</span>
        
        <form
          onSubmit={updateProfile}
        >
          <div className={cls.settings_block}>
            <label>Picture:</label>
            <Input 
              type="file"
              className="middle"
              onChange={e => { 
                const file = new FileReader()

                file.onload = (e) => {
                  setUpdateProfileData({...updateProfileData, picture: e.target.result})
                }

                file.readAsDataURL(e.target.files[0])
              }}
            />
          </div>
          
          <div className={cls.settings_block}>
            <label>Username:</label>
            <Input 
              className="middle"
              value={updateProfileData.username || ''}
              onChange={e => setUpdateProfileData({...updateProfileData, username: e.target.value})}
              placeholder="username"
            />
          </div>

          <div className={cls.settings_block}>
            <label>First name:</label>
            <Input 
              className="middle"
              value={updateProfileData.firstName || ''}
              onChange={e => setUpdateProfileData({...updateProfileData, firstName: e.target.value})}
              placeholder="username"
            />
          </div>

          <div className={cls.settings_block}>
            <label>Last name:</label>
            <Input 
              className="middle"
              value={updateProfileData.lastName || ''}
              onChange={e => setUpdateProfileData({...updateProfileData, lastName: e.target.value})}
              placeholder="username"
            />
          </div>

          <Button type="submit" className="middle primary stratch mt-3">Submit</Button>
        </form>
      </SettingsWrapper>
    </ScrollFrame>
  )
}


export default Settings
