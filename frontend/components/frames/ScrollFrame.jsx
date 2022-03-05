import NavBar from '../NavBar/NavBar'


function ScrollFrame({children, navigation}) {
    return (
        <div>
            <>
                {/* navigation */}
                {
                    navigation
                        ? <NavBar />
                        : null
                }

                {/* content block */}
                <div className="scroll-frame">
                    {children}
                </div>
            </>
        </div>
    )
}


export default ScrollFrame
