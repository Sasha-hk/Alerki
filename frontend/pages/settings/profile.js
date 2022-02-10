import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Rotuer, { useRouter } from 'next/router'
import { io } from 'socket.io-client'
import ScrollFrame from '../../components/frames/ScrollFrame.jsx'
import SettingsWrapper from '../../components/pages/settings'
import Button from '../../components/UI/Button/Button.jsx'
import Input from '../../components/UI/Input/Input.jsx'
import userActions from '../../store/actions/userActions'
import { useAuth } from '../../provider/AuthProvider'
import cls from '../../styles/pages/settings/profile.module.css'


// const socket = io('http://192.168.1.11:3001')
const Settings = () => {
  const {authData} = useAuth()
  const userData = useSelector(store => store.user) 
  const dispatch = useDispatch()
  const user = userData.user

  const [updateUserData, setUpdateUserData] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    picture: user.pictureID,
  })

  // useEffect(() => {
  //   dispatch(userActions.upload())
  // }, [user])

  useEffect(() => {
    if (!userData.loading) {
      setUpdateUserData({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.pictureID,
      })
    }
  }, [userData])

  const updateProfile = async (e) => {
    e.preventDefault()
    
    // if (updateUserData.picture) {
    //   socket.io.emit("e", () => {
    //     console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    //   });
    // }
    console.log(updateUserData)
    await dispatch(userActions.update(updateUserData))
    // refresh()
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
                  setUpdateUserData({...updateUserData, picture: e.target.result})
                }

                file.readAsDataURL(e.target.files[0])
              }}
            />
          </div>
          
          <div className={cls.settings_block}>
            <label>Username:</label>
            <Input 
              className="middle"
              value={updateUserData.username || ''}
              onChange={e => setUpdateUserData({...updateUserData, username: e.target.value})}
              placeholder="username"
            />
          </div>

          <div className={cls.settings_block}>
            <label>First name:</label>
            <Input 
              className="middle"
              value={updateUserData.firstName || ''}
              onChange={e => setUpdateUserData({...updateUserData, firstName: e.target.value})}
              placeholder="username"
            />
          </div>

          <div className={cls.settings_block}>
            <label>Last name:</label>
            <Input 
              className="middle"
              value={updateUserData.lastName || ''}
              onChange={e => setUpdateUserData({...updateUserData, lastName: e.target.value})}
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
