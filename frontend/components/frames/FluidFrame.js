import {useEffect} from 'react'
import NavBar from '../NavBar/NavBar'


function FludFrame({children}) {
    useEffect(() => {
        // const vh = window.innerHeight * 0.01;
        // const wrapper = document.querySelector('.wrapper')
        // vh = window.innerHeight * 0.01;
        // wrapper.style.minHeight = '0'
        // wrapper.style.height = vh * 100 + 'px'
        
        // window.addEventListener('resize', () => {
        //     vh = window.innerHeight * 0.01;
        //     wrapper.style.minHeight = '0'
        //     wrapper.style.height = vh * 100 + 'px'
        // })
    }, [])

    return (
        <>
            {/* navigation */}
            <NavBar />

            {/* content block */}
            <div className="fluid-frame">
                {children}
            </div>
        </>
    )
}


export default FludFrame
