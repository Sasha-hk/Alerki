import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import profileActions from '../store/actions/profileActions'
import FluidFrame from '../components/frames/FluidFrame'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import Modal from '../components/Modal/Modal.jsx'
import useFixHydrate from '../hooks/useFixHydrate'
import ClientView from '../components/pages/home/ClientView.jsx'
import MasterView from '../components/pages/home/MasterClient.jsx'
import i18nConfig from '../i18n.js'


const Home = () => {
  const [modal, setModal] = useState(false)
  const { t, lang } = useTranslation()
  const { locales } = i18nConfig
  const userStore = useSelector(store => store.user)
  const user = userStore.user
  
  return (
    <FluidFrame navigation={true}>
      {/* <div className="container"> */}
        {
          user.profileType == 'client'
            ? <ClientView></ClientView>
            : <MasterView></MasterView>
        }



        {/* <Button
          className="middle primary br-1"
          onClick={e => setModal(true)}
        >modal</Button> */}
        {/* <Modal show={modal} onClose={setModal}>
          <div>
            <span className="text-big">Monday 12.12.2022</span>
          </div>
          <div>
            <Button className="middle muted br-1 mr-2">close</Button>
            <Button className="middle primary br-1">confirm</Button>
          </div>
        </Modal> */}
        {/* {
          locales.map((lng) => {
            return (
              <div key={lng}>
                <Link href="/" locale={lng}>
                  <a
                    className={lng === lang ? "language_active" : null}
                  >
                    {t(`common:languages.${lng}`)}
                  </a>
                </Link>
              </div>
            )
          })
        } */}
      {/* </div> */}
    </FluidFrame>
  )
}


export default Home
