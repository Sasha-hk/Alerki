import { useState } from 'react'
import axios from 'axios'
import FluidFrame from '../components/frames/FluidFrame'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import classes from '../styles/pages/register.module.css'


const Register = () => {
    const [form, setForm] = useState({
        username: null,
        email: null,
        password: null,
        profileType: null
    })
    const register = (e) => {
        e.preventDefault()
        
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
                        onChange={(e) => setForm({...form, username: e.target.value})}
                    />
                    <Input 
                        className="big stratch mb-2" 
                        id="email" 
                        type="email" 
                        placeholder="email" 
                        required
                        onChange={(e) => setForm({...form, email: e.target.value})}
                    />
                    <Input 
                        className="big stratch mb-3" 
                        id="password" 
                        type="password" 
                        placeholder="password" 
                        minlength="6" 
                        required
                        onChange={(e) => setForm({...form, password: e.target.value})}
                    />

                    <div className={[classes.profile_type, 'mb-4'].join(' ')}>
                        <span className="mb-2 text-middle">Profile type:</span>
                        <label>
                            <Input 
                                type="radio" 
                                name="profileType" 
                                id="worker"
                                onChange={(e) => setForm({...form, profileType: e.target.id})}
                            />
                            worker
                        </label>

                        <label>
                            <Input 
                                type="radio" 
                                name="profileType" 
                                id="client"
                                onChange={(e) => setForm({...form, profileType: e.target.id})}
                            />
                            client
                        </label>
                    </div>


                    <Button className="big primary stratch mb-2" type="submit">register</Button>

                    <div className={['mb-4', 'mt-4', classes.or_wrapper].join(' ')}>
                        <hr className={classes.hr} />
                        <span className={classes.or_panel}>or</span>
                    </div>

                    <Button className="big google compact stratch">
                        <svg className="mr-1" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.46519 8.19866V10.9307H13.2589C12.9058 12.6668 11.4277 13.6643 9.46519 13.6643C7.17929 13.6329 5.34271 11.7708 5.34271 9.48472C5.34271 7.1986 7.17929 5.33658 9.46519 5.30511C10.4154 5.30398 11.3363 5.63371 12.0698 6.2377L14.1281 4.17936C11.767 2.10367 8.31886 1.83669 5.66642 3.52422C3.01398 5.21174 1.79475 8.4482 2.67447 11.4664C3.55419 14.4845 6.32144 16.559 9.46519 16.5571C13.0016 16.5571 16.2173 13.9849 16.2173 9.48432C16.2119 9.051 16.1588 8.61958 16.059 8.19786L9.46519 8.19866Z" fill="white"/>
                        </svg>

                        continue with Google
                    </Button>
                </form>
            </div>
        </FluidFrame>
    )
}

export default Register
