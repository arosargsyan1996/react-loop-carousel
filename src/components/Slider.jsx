import { useSContext } from './../context/SliderContext'
import { useCContext } from './../context/CarouselContext'

export const Slider = ({children}) => {
    const sc = useSContext()
    const cc = useCContext()
    
    const sliderStyles = {
            transform: `translateX(calc(-100% - ${cc.currentSlide * (sc.slideWidth + sc.innerPadding)}px))`,
            height: `${sc.slideWidth / sc.slideHeightCoeff}px`
    }
    
    if (sc.innerPadding) {
        sliderStyles.margin =`0 -${sc.innerPadding/2}px`
    }

    if (sc.prev.current.isMoving) {
        sliderStyles.transition = "none"
    }
    
    console.log("Render: SLIDER", sc.prev.current)
    return (
        <div
            style={sliderStyles}
            className='trc__slider-wrap'
        >
            {children}
        </div>
    )
}