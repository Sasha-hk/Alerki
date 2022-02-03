import { useState } from 'react'
import profileActions from '../store/actions/profileActions'
import { useDispatch, useSelector } from 'react-redux'
import Router from 'next/router'
import FluidFrame from '../components/frames/FluidFrame'
import Button from '../components/UI/Button/Button'
import WithGoogle from '../components/UI/Button/WithGoogle.jsx'
import Input from '../components/UI/Input/Input'
import classes from '../styles/pages/register.module.css'
import Cookies from 'js-cookie'


const Register = () => {
    const dispatch = useDispatch()
    const profile = useSelector(store => store.profile)

    const [form, setForm] = useState({
        username: null,
        email: null,
        password: null,
        profileType: null
    })
    const register = (e) => {
        e.preventDefault()
        dispatch(profileActions.register(form))

        if (Cookies.get('accessToken') || Cookies.get('refreshToken')) {
            Router.push('/')
        }
    }

    return (
        <FluidFrame>
            <div className={classes.form_wrapper}>
                <form onSubmit={register}>
                    <span className="text-big text-center text-500 mb-4">Register</span>
                    <Input
                        className="big stratch mb-2"
                        id="username"
                        placeholder="username"
                        required
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                    />
                    <Input
                        className="big stratch mb-2"
                        id="email"
                        type="email"
                        placeholder="email"
                        required
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    <Input
                        className="big stratch mb-3"
                        id="password"
                        type="password"
                        placeholder="password"
                        minLength="6"
                        required
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />

                    <div className={[classes.profile_type, 'mb-4'].join(' ')}>
                        <span className="mb-2 text-middle">Profile type:</span>
                        <label>
                            <Input
                                type="radio"
                                name="profileType"
                                id="worker"
                                onChange={(e) => setForm({ ...form, profileType: e.target.id })}
                            />
                            worker
                        </label>

                        <label>
                            <Input
                                type="radio"
                                name="profileType"
                                id="client"
                                onChange={(e) => setForm({ ...form, profileType: e.target.id })}
                            />
                            client
                        </label>
                    </div>


                    <Button className="big primary stratch mb-2" type="submit">register</Button>

                    <div className={['mb-4', 'mt-4', classes.or_wrapper].join(' ')}>
                        <hr className={classes.hr} />
                        <span className={classes.or_panel}>or</span>
                    </div>

                </form>
                <WithGoogle />
            </div>
        </FluidFrame>
    )
}

export default Register
