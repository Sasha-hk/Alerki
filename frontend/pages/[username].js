import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import FluidFrame from '../components/frames/FluidFrame.jsx'
import {useAuth} from '../provider/AuthProvider'
import profileActions from '../store/actions/profileActions'
import { useDispatch, useSelector } from 'react-redux'


const API_URL = process.env.API_URL

const Profile = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const profileStore = useSelector(store => store.profile)
    const profile = profileStore.profile

    useEffect(() => {
        if (router.isReady) {
            const username = router.query.username
            
            dispatch(profileActions.upload({username}))
        }
    }, [router.isReady])

    // console.log(profile)

    const profileView = <div>
        {
            profile.pictureID
                ? <img src={API_URL + '/profle/picture/' + profile.pictureID} alt="" />
                : null
        }

        <b>{profile.username}</b>

        {
            profile.profileType == 'worker'
                ? <p>{profile.worker.shordBiograpy}</p>
                : null
        } 
    </div>
    
    return (
        <FluidFrame navigation={true}>
            <div className="container">
                {
                    profileStore.loading
                        ? <b>loading</b>
                        : profileView
                }
            </div>
        </FluidFrame>
    )
}


export default Profile
