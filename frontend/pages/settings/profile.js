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
import api from '../../http'
import cls from '../../styles/pages/settings/profile.module.css'


const API_URL = process.env.API_URL

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
  const [updatePicturePreview, setUpdatePicturePreview] = useState(null)

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
    const formData = new FormData()
    const picture = e.target['0']?.files[0]

    formData.append('picture', picture)
    formData.append('username', updateUserData.username)
    formData.append('firstName', updateUserData.firstName)
    formData.append('lastName', updateUserData.lastName)

    dispatch(userActions.update(formData))
  }

  const handleUpdalodPictureClick = (e) => {
    document.querySelector('input[name="picture"]').click()
  }

  const makePicturePreview = (e) => {
    const reader = new FileReader()
    reader.onload = function(e) {
      setUpdatePicturePreview(e.target.result)
    }
    reader.readAsDataURL(e.target.files[0])
  }

  return (
    <ScrollFrame navigation={true}>
      <SettingsWrapper>
        <span className="text-big mb-3">Profile</span>

        <div>
          <form
            className={cls.form}
            onSubmit={updateProfile}
          >
            <div className={cls.settings_block}>
              <label>Picture:</label>
              {
                updatePicturePreview 
                  ? <img
                  className={cls.user_picture_preview}
                  src={updatePicturePreview} 
                  alt="user picture"
                />
                  : user.pictureID
                    ? <img
                      className={cls.user_picture_preview}
                      src={`${API_URL}/profile/picture/${updateUserData.picture}`} 
                      alt="user picture"
                    />
                    : null
              }

              <Input
                type="file"
                name="picture"
                className="none"
                onChange={e => makePicturePreview(e)}
              />
              <Button
                className="middle sceleton br-1 mt-4"
                onClick={e => handleUpdalodPictureClick(e)}
              >select photo</Button>
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
        </div>
      </SettingsWrapper>
    </ScrollFrame>
  )
}


export default Settings
