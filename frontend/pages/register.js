import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import FluidFrame from '../components/frames/FluidFrame'
import Button from '../components/UI/Button/Button'
import WithGoogle from '../components/UI/Button/WithGoogle.jsx'
import Input from '../components/UI/Input/Input'
import cls from '../styles/pages/register.module.css'
import ErrorView from '../components/UI/ErrorView/ErrorView.jsx'
import { useAuth } from '../provider/AuthProvider'


const Register = () => {
  const {t} = useTranslation('register')
  const {isAuthenticated, register, authData} = useAuth()
  
  const [form, setForm] = useState({
    username: null,
    email: null,
    password: null,
    profileType: null,
    error: null,
  })
  
  const registerWrapper = async (e) => {
    e.preventDefault()
    setForm({...form, error: await register(form)})
  }
  
  return (
    <FluidFrame>
      <div 
        className={cls.form_wrapper}
      >
        <form onSubmit={registerWrapper}>
          <span className="text-big text-center text-500 mb-4">{t('Register')}</span>
          
          <ErrorView
            error={form.error ? 'username' in form.error ? form.error.username : null : null}
            className="mb-2"
          >
            <Input
              className="big stratch"
              id="username"
              placeholder={t('username')}
              required
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </ErrorView>

          <ErrorView
            error={form.error ? 'email' in form.error ? form.error.email : null : null}
            className="mb-2"
          >
            <Input
              className="big stratch"
              id="email"
              type="email"
              placeholder={t('email')}
              required
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </ErrorView>

          <ErrorView
            error={form.error ? 'password' in form.error ? form.error.password : null : null}
            className="mb-3"
          >
            <Input
              className="big stratch"
              id="password"
              type="password"
              placeholder={t('password')}
              minLength="6"
              required
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </ErrorView>

          <div className={[cls.profile_type, 'mb-4'].join(' ')}>
            <span className="mb-2 text-normal">{t('Profile_type')}</span>
            <label>
              <Input
                type="radio"
                name="profileType"
                id="master"
                onChange={(e) => setForm({ ...form, profileType: e.target.id })}
                required
              />
              {t('master')}
            </label>

            <label>
              <Input
                type="radio"
                name="profileType"
                id="client"
                onChange={(e) => setForm({ ...form, profileType: e.target.id })}
                required
              />
              {t('client')}
            </label>
          </div>

          <Button className="big primary stratch" type="submit">{t('register')}</Button>
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

export default Register
