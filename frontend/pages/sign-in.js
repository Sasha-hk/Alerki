import { useState } from 'react'
import FluidFrame from '../components/frames/FluidFrame'
import profileActions from '../store/actions/profileActions'
import { useDispatch, useSelector } from 'react-redux'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import Button from '../components/UI/Button/Button'
import WithGoogle from '../components/UI/Button/WithGoogle.jsx'
import Input from '../components/UI/Input/Input'
import classes from '../styles/pages/sign-in.module.css'


const Continue = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    
    const [form, setForm] = useState({
        email: null,
        username: null,
        password: null,
    })
    
    const signIn = async (e) => {
        e.preventDefault()
        dispatch(profileActions.logIn(form))
    }

    return (
        <FluidFrame>
            <div
                className={classes.form_wrapper}
                onSubmit={signIn}
            >
                <form>
                    <span className="text-big text-center text-500 mb-4">Sign-in</span>
                    <Input 
                        className="big stratch mb-2" 
                        placeholder="email or username" 
                        onChange={e => setForm({...form, email: e.target.value, username: e.target.value})}
                        required 
                    />
                    <Input 
                        className="big stratch mb-4" 
                        placeholder="password" 
                        type="password"
                        minLength="6"
                        onChange={e => setForm({...form, password: e.target.value})}
                        required 
                    />
                    <Button 
                        className="big primary stratch mb-2"
                        type="submit"
                    >
                        sign-in
                    </Button>

                    <span className="text-little text-muted">Don't have an account? </span>
                    <Link href="/register">
                        <a className="text-little">Create a new one</a>
                    </Link>


                </form>

                <div className={['mb-4', 'mt-4', classes.or_wrapper].join(' ')}>
                    <hr className={classes.hr} />
                    <span className={classes.or_panel}>or</span>
                </div>

                <WithGoogle /> 
            </div>
        </FluidFrame>
    )
}

export default Continue
