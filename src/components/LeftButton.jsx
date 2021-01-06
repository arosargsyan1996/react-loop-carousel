import { useSContext } from './../context/SliderContext'
import { useBContext } from './../context/ButtonContext'

export const LeftButton = () => {
    const sc = useSContext()
    const bc = useBContext()

    const clickHandler = () => {
        if (sc.prev.current) {   

            if (sc.prev.current.currentSlide === -sc.visibleSlides + 1) {
                sc.setCurrentSlide('-', sc.prev.current.currentSlide,  sc.itemsCount - sc.visibleSlides)
                bc.setIsMoving(true)
            } else {    
                sc.setCurrentSlide("-", sc.prev.current.currentSlide)
            }
        }
    }

    console.log("RENDER: LeftButton", bc)
    return (
        <button
            disabled={bc.isMoving}
            onClick={() => !bc.isMoving && clickHandler()}
        >
            Left
        </button>  
    )
}