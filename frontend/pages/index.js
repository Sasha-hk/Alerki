import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import profileActions from '../store/actions/profileActions'
import FluidFrame from '../components/frames/FluidFrame'
import Button from '../components/UI/Button/Button'
import Input from '../components/UI/Input/Input'
import Modal from '../components/Modal/Modal.jsx'
import useFixHydrate from '../hooks/useFixHydrate'


const Home = () => {
  const {theme, setTheme} = useTheme()
  const [modal, setModal] = useState(false)

  const hydratedTheme = useFixHydrate(theme)

  return (
    <FluidFrame navigation={true}>
      <div className="container">
        <Button
          className="middle primary br-1"
          onClick={e => setModal(true)}
        >show modal</Button>

        <Modal show={modal} onClose={setModal}>
          <div>
            <span className="text-big">Monday 12.12.2022</span>
          </div>
          <div>
            <Button className="middle muted br-1 mr-2">close</Button>
            <Button className="middle primary br-1">confirm</Button>
          </div>
        </Modal>
      </div>
    </FluidFrame>
  )
}


export default Home
