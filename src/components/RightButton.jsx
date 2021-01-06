import { useSContext } from './../context/SliderContext'
import { useBContext } from './../context/ButtonContext';
//import { useState, useEffect } from 'react'

export const RightButton = () => {
    const sc = useSContext()
    const bc = useBContext()

    // const [disabled, setDisabled] = useState(false)
    // const [isMoving, setIsMoving] = useState(false)

    // useEffect(() => {
    //     if(isMoving) {
    //         !disabled ? setDisabled(true) : setIsMoving(false)
    //     }
    //     !sc.prev.current.isMoving && disabled && setDisabled(false)
    // }, [disabled, sc, isMoving])
    
    const clickHandler = () => {
        if (sc.prev.current) {
            console.log(sc.prev.current)
            if (sc.prev.current.currentSlide === sc.itemsCount - 1) {
                sc.setCurrentSlide('+', sc.prev.current.currentSlide,  0)      
                bc.setIsMoving(true)
                //return setIsMoving(true)
            } else if (sc.prev.current.currentSlide === null && sc.startSlide === sc.itemsCount) {
                sc.setCurrentSlide('+', sc.prev.current.currentSlide,  0)     
                bc.setIsMoving(true)
                //return setIsMoving(true)
            } else {    
                sc.setCurrentSlide("+", sc.prev.current.currentSlide)
            }
        }
    }

    console.log("RENDER: RightButton", sc.prev.current)
    return (
        <button
            disabled={bc.isMoving}
            onClick={() => !bc.isMoving && clickHandler()}
        >
            Right
        </button>  
    )
}