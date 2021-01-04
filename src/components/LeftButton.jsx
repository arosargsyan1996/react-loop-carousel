import { useSContext } from './../context/SliderContext'
import { useState, useEffect } from 'react'

export const LeftButton = () => {
    const sc = useSContext()

    const [disabled, setDisabled] = useState(false)
    const [isMoving, setIsMoving] = useState(false)

    useEffect(() => {
        if(isMoving) {
            !disabled ? setDisabled(true) : setIsMoving(false)
        }
        !sc.prev.current.isMoving && disabled && setDisabled(false)
    }, [disabled, sc, isMoving])
    
    const clickHandler = () => {
        if (sc.prev.current) {   

            if (sc.prev.current.currentSlide === -sc.visibleSlides + 1) {
                sc.setCurrentSlide('-', sc.prev.current.currentSlide,  sc.itemsCount - sc.visibleSlides)
                
                return setIsMoving(true)
            } else {    
                sc.setCurrentSlide("-", sc.prev.current.currentSlide)
            }
        }
    }

    console.log("RENDER: LeftButton", sc.prev.current)
    return (
        <button
            disabled={disabled}
            onClick={() => !disabled && clickHandler()}
        >
            Left
        </button>  
    )
}