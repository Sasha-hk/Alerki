import { useState } from 'react'
import FluidFrame from '../components/frames/FluidFrame'
import profileActions from '../store/actions/profileActions'
import { useDispatch, useSelector } from 'react-redux'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import Button from '../components/UI/Button/Button'
import WithGoogle from '../components/UI/Button/WithGoogle.jsx'
import Input from '../components/UI/Input/Input'
import ErrorView from '../components/UI/ErrorView/ErrorView.jsx'
import { useAuth } from '../provider/AuthProvider'
import cls from '../styles/pages/sign-in.module.css'


const Continue = () => {
  const {t} = useTranslation('sign-in')
  const {authData, login} = useAuth()
  
  const [form, setForm] = useState({
    email: null,
    username: null,
    password: null,
    error: null,
  })
  
  const signInWrapper = async (e) => {
    e.preventDefault()
    setForm({...form, error: await login(form)})
  }

  return (
    <FluidFrame>
      <div
        className={cls.form_wrapper}
      >
        <form onSubmit={signInWrapper}>
          <span className="text-big text-center text-500 mb-4">{t('Sign-in')}</span>

          <ErrorView
            error={form.error ? 'usernameOrEmail' in form.error ? form.error.usernameOrEmail : null : null}
            className="mb-2" 
          >
            <Input
              className="big stratch" 
              placeholder={t('email_or_username')}
              name="usernameOrEmail"
              onChange={e => setForm({...form, email: e.target.value, username: e.target.value})}
              required
            />
          </ErrorView>

          <ErrorView
            error={form.error ? 'password' in form.error ? form.error.password : null : null}
            className="mb-4"
          >
            <Input 
              className="big stratch" 
              placeholder={t('password')}
              name="password"
              type="password"
              minLength="6"
              onChange={e => setForm({...form, password: e.target.value})}
              required 
            />
          </ErrorView>

          <Button 
            className="big primary stratch mb-2"
            type="submit"
          >
            {t('sign-in')}
          </Button>

          <span className="text-little text-muted">{t("Don't_have_an_account?")} </span>
          <Link href="/register">
            <a className="text-little">Create a new one</a>
          </Link>
        </form>

        <div className={['mb-4', 'mt-4', cls.or_wrapper].join(' ')}>
          <hr className={cls.hr} />
          <span className={cls.or_panel}>{t('common:or')}</span>
        </div>

        <WithGoogle /> 
      </div>
    </FluidFrame>
  )
}

export default Continue
