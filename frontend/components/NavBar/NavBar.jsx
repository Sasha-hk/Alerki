import { useSelector, useDispatch } from 'react-redux'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import Link from 'next/link'
import Button from '../UI/Button/Button'
import Cookies from 'js-cookie'
import useFixHydrate from '../../hooks/useFixHydrate.js'


const NavBar = () => {
    const navigationButtons = (
        <nav>
            <Link href="/">
                <a>
                    <svg className="home" width="26" height="29" viewBox="0 0 26 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.5556 1.47613L15.5556 1.47615L15.5593 1.47943L24.2222 9.07386C24.2228 9.07439 24.2234 9.07492 24.224 9.07545C24.6274 9.43671 24.9497 9.87935 25.1696 10.3742C25.3899 10.8698 25.5025 11.4065 25.5 11.9488V11.9511V24.5899C25.5 25.6066 25.0961 26.5816 24.3772 27.3005C23.6583 28.0194 22.6833 28.4233 21.6666 28.4233H4.33344C3.31678 28.4233 2.34177 28.0194 1.62289 27.3005C0.904002 26.5816 0.500137 25.6066 0.500137 24.5899V11.9656H0.500153L0.500121 11.9616C0.495793 11.4171 0.607509 10.878 0.827832 10.3801C1.04784 9.88285 1.37109 9.43814 1.77612 9.07545L10.4408 1.47943L10.4408 1.47945L10.4445 1.47613C11.1473 0.847523 12.0571 0.5 13 0.5C13.943 0.5 14.8528 0.847524 15.5556 1.47613ZM15.8889 26.5344H16.3889V26.0344V18.8122C16.3889 18.2965 16.1841 17.8019 15.8194 17.4373C15.4548 17.0726 14.9602 16.8678 14.4445 16.8678H11.5556C11.0399 16.8678 10.5453 17.0726 10.1807 17.4373C9.81604 17.8019 9.61118 18.2965 9.61118 18.8122V26.0344V26.5344H10.1112H15.8889ZM18.2778 26.0344V26.5344H18.7778H21.6666C22.1823 26.5344 22.6769 26.3295 23.0416 25.9649C23.4062 25.6002 23.6111 25.1056 23.6111 24.5899V11.9511V11.9505C23.6107 11.6744 23.5516 11.4016 23.4376 11.1501C23.3236 10.8987 23.1574 10.6744 22.95 10.4922L22.9492 10.4915L14.2834 2.90891C14.2832 2.90881 14.2831 2.9087 14.283 2.90859C13.9282 2.59707 13.4722 2.42526 13 2.42526C12.5279 2.42526 12.0719 2.59707 11.7171 2.90859C11.717 2.9087 11.7168 2.90881 11.7167 2.90891L3.05086 10.4915L3.05011 10.4922C2.8427 10.6744 2.67647 10.8987 2.56248 11.1501C2.44849 11.4016 2.38936 11.6744 2.38901 11.9505V11.9511V24.5899C2.38901 25.1056 2.59387 25.6002 2.95852 25.9649C3.32317 26.3295 3.81774 26.5344 4.33344 26.5344H7.22231H7.72231V26.0344V18.8122C7.72231 17.7956 8.12617 16.8205 8.84505 16.1017C9.56394 15.3828 10.539 14.9789 11.5556 14.9789H14.4445C15.4611 14.9789 16.4361 15.3828 17.155 16.1017C17.8739 16.8205 18.2778 17.7956 18.2778 18.8122V26.0344Z" />
                    </svg>
                </a>
            </Link>

            <Link href="/notification">
                <a>
                    <svg className="notification" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.4998 29C15.3829 29.0003 16.2358 28.6782 16.8983 28.0942C17.5607 27.5101 17.9872 26.7043 18.0976 25.8281C18.1284 25.5798 17.9218 25.375 17.6717 25.375H11.3279C11.0778 25.375 10.8712 25.5798 10.902 25.8281C11.0124 26.7043 11.4388 27.5101 12.1013 28.0942C12.7638 28.6782 13.6166 29.0003 14.4998 29Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.4999 2.71875C12.8174 2.71875 11.2038 3.38711 10.0142 4.57679C8.82447 5.76648 8.15611 7.38003 8.15611 9.0625V14.4039C8.15611 15.0311 7.97124 15.6419 7.62324 16.1621L4.53655 20.7948C4.53299 20.8002 4.5311 20.8065 4.53111 20.8129L4.53293 20.8238C4.53293 20.8274 4.53655 20.8311 4.54018 20.8347C4.54324 20.8379 4.54695 20.8403 4.55105 20.8419L4.56374 20.8438H24.436L24.4487 20.8419C24.4528 20.8404 24.4565 20.8379 24.4596 20.8347C24.4628 20.8317 24.4652 20.8279 24.4668 20.8238L24.4686 20.8111C24.4687 20.8047 24.4668 20.7983 24.4632 20.793L21.3765 16.1639C21.0293 15.6432 20.8439 15.0315 20.8436 14.4058V9.0625C20.8436 7.38003 20.1753 5.76648 18.9856 4.57679C17.7959 3.38711 16.1823 2.71875 14.4999 2.71875ZM5.43736 9.0625C5.43736 6.65898 6.39216 4.35389 8.09171 2.65434C9.79126 0.954796 12.0963 0 14.4999 0C16.9034 0 19.2085 0.954796 20.908 2.65434C22.6076 4.35389 23.5624 6.65898 23.5624 9.0625V14.4039C23.5624 14.4946 23.5896 14.5816 23.6385 14.6559L26.7252 19.2868C27.0009 19.7011 27.1591 20.1825 27.1829 20.6796C27.2067 21.1768 27.0952 21.671 26.8602 22.1098C26.6253 22.5485 26.2758 22.9154 25.8489 23.1712C25.422 23.427 24.9337 23.5623 24.436 23.5625H4.56374C4.06576 23.5625 3.57712 23.4273 3.14993 23.1714C2.72274 22.9155 2.37301 22.5484 2.13804 22.1094C1.90307 21.6703 1.79167 21.1757 1.81571 20.6783C1.83975 20.1809 1.99833 19.6994 2.27455 19.285L5.36124 14.6559C5.41098 14.5813 5.43747 14.4936 5.43736 14.4039V9.0625Z" />
                    </svg>
                </a>
            </Link>

            <Link href="/">
                <a>
                    <svg className="profile" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="14.5" cy="14.5" r="14.5" />
                    </svg>
                </a>
            </Link>
        </nav>
    )

    const signInButton = (
        <div className="no-authorized-nav">
            <Link href="/sign-in">
                <a>
                    <Button className="middle primary">sign-in</Button>
                </a>
            </Link>
        </div>
    )

    // crutch to fix "React hydration error"
    const hydratedNavigation = useFixHydrate(
        Cookies.get('authenticated')
            ? navigationButtons
            : signInButton
    )

    return (
        <div className="nav-bar">
            <div className="container balance">
                <span className="nav-bar-logo">Alerki</span>

                {hydratedNavigation}
            </div>
        </div>
    )
}

export default NavBar
