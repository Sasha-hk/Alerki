import NavBar from '../NavBar/NavBar'


function ScrollFrame({children}) {
    return (
        <div>
            <>
                {/* navigation */}
                <NavBar />

                {/* content block */}
                <div className="scroll-frame">
                    {children}
                </div>
            </>
        </div>
    )
}


export default ScrollFrame
