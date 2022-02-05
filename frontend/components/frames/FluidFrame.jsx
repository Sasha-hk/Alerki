import {useEffect} from 'react'
import NavBar from '../NavBar/NavBar'


function FludFrame({children, navigation}) {
    useEffect(() => {
        let vh = window.innerHeight * 0.01;
        const fluidFrame = document.querySelector('.fluid-frame')
        vh = window.innerHeight * 0.01;
        fluidFrame.style.minHeight = '0'
        fluidFrame.style.height = vh * 100 + 'px'
        
        window.addEventListener('resize', () => {
            vh = window.innerHeight * 0.01;
            fluidFrame.style.minHeight = '0'
            fluidFrame.style.height = vh * 100 + 'px'
        })

    }, [])

    return (
        <div>
            {/* navigation */}
            {
                navigation
                    ? <NavBar />
                    : null
            }

            {/* content block */}
            <div className="fluid-frame">
                {children}
            </div>
        </div>
    )
}


export default FludFrame
