import {useRouter} from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import HomeIcon from '../../public/icons/home.svg'
import BellIcon from '../../public/icons/bell.svg'
import ProfileIcon from '../../public/icons/temporary-profile.svg'


const NavBar = () => {
    const router = useRouter()
    console.log(HomeIcon)
    return (
        <div className="nav-bar">
            <span className="nav-bat-logo">Alerki</span>
            <nav>
                <Link href="/">
                    <a>
                        <img src={HomeIcon.src} decoded="sync" />
                    </a>
                </Link>
            </nav>
        </div>
    )
}

export default NavBar
