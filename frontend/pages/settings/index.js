// import { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import Router, { useRouter } from 'next/router'
import ScrollFrame from '../../components/frames/ScrollFrame.jsx'
// import profileActions from '../store/actions/profileActions'
// import Button from '../components/UI/Button/Button.jsx'
// import Input from '../components/UI/Input/Input.jsx'
// import {useAuth} from '../provider/AuthProvider'
// import api from '../http'

import cls from '../../styles/pages/settings/base.module.css'


const Settings = () => {
    return (
        <ScrollFrame navigation={true}>
            <div className="container">
                <span className="text-big">Settings</span>
            </div>
        </ScrollFrame>
    )
}


export default Settings
