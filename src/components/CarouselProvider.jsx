import { useState, useMemo, useEffect, useRef } from 'react'
import { initCContext, CarouselContext } from './../context/CarouselContext'
import { initSContext, SliderContext } from './../context/SliderContext'
import { ButtonContext } from './../context/ButtonContext'



export const CarouselProvider = ({ children, visibleSlides, loop, innerPadding, currentSlide, slideHeightCoeff, itemsCount }) => {
    const localVisibleSlides = visibleSlides ? visibleSlides : initSContext.visibleSlides
    const startSlide = currentSlide ? currentSlide : initCContext.currentSlide
    const prev = useRef({
        currentSlide: null,
        dir: null,
        isMoving: false
    })

    const [sliderWidth, setSliderWidth] = useState(0)
    const [localCurrentSlide, setLocalCurrentSlide] = useState(currentSlide ? currentSlide : initCContext.currentSlide)
    const [isMoving, setIsMoving] = useState(false)

    useEffect(() => {
        if (prev.current) {
            if (prev.current.isMoving) {
                if (prev.current.dir === 'Left' && localCurrentSlide === itemsCount - localVisibleSlides) {
                    console.log("useEffect", prev.current.currentSlide, localCurrentSlide)
                    prev.current.currentSlide = localCurrentSlide
                    prev.current.isMoving = false
                    return setLocalCurrentSlide(localCurrentSlide - 1)
                } else if (prev.current.dir === 'Right' && localCurrentSlide === 0) {
                    console.log("useEffect", prev.current.currentSlide, localCurrentSlide)
                    prev.current.currentSlide = localCurrentSlide
                    prev.current.isMoving = false
                    return setLocalCurrentSlide(1)  
                }
            } else {
                isMoving && console.log('USE_EFFECT: LAST')   
                isMoving && setIsMoving(false)
            }
        }
        
    }, [localCurrentSlide, itemsCount, localVisibleSlides, isMoving])

    const setSlideWidth = (width, padding, count) => {
        if (width) {
            const slidesSpace = padding ? padding : initSContext.innerPadding
            const visSlides = count ? count : initSContext.visibleSlides
    
            return (width + slidesSpace)/visSlides - slidesSpace
        } else {
            return initSContext.itemWidth
        }
    }

    const SValues = useMemo(()=>({
        itemsCount: itemsCount, //required
        startSlide,
        visibleSlides: localVisibleSlides,
        loop: loop ? loop : initSContext.loop,
        innerPadding: innerPadding ? innerPadding : initSContext.innerPadding,
        sliderWidth: sliderWidth ? sliderWidth : initSContext.sliderWidth,
        slideWidth: setSlideWidth(sliderWidth, innerPadding, visibleSlides),
        slideHeightCoeff: slideHeightCoeff ? slideHeightCoeff : initSContext.slideHeightCoeff,
        prev, //??
        setCurrentSlide: (op, prevCurrent, goTo=null) => {     
            console.log(3333, 'beforClick',prev.current.currentSlide, prevCurrent)

            const getCurrentSlide = (dir, prevCurrent) => {
                let current;

                if (prevCurrent === null) {
                    current = startSlide
                } else if (dir === 'Left') {
                    current = prev.current.dir === 'Right' ? prev.current.currentSlide + 1 : prev.current.currentSlide - 1
                } else if (dir === 'Right') {
                    current = prev.current.dir === 'Left' ? prev.current.currentSlide - 1 : prev.current.currentSlide + 1
                }
                
                return current
            }
            const setPrev = (dir, current, goto) => {
                if (dir === 'Left') {        
                    prev.current.dir = 'Left'
                    prev.current.currentSlide = current
                } else if (dir === 'Right') {          
                    prev.current.dir = 'Right'
                    prev.current.currentSlide = current
                }
                if (goto !== null) prev.current.isMoving = true
            }

            let next
            let dir = op === '-' ? 'Left' : op === '+' && 'Right'
            let current = getCurrentSlide(dir, prevCurrent)

            setPrev(dir, current, goTo)
            next = goTo === null ? (dir === 'Right' ? current + 1 : current - 1) : goTo

            return setLocalCurrentSlide(next) 
        },
        //getValues: (val = 'ALL') => val === 'ALL' ? values.current : values.current[val],
    }), [visibleSlides, localVisibleSlides, sliderWidth, loop, innerPadding, slideHeightCoeff, itemsCount, startSlide])

    const CValues = {
        currentSlide: localCurrentSlide,
    }
    const BValues = useMemo(()=>({
        isMoving: isMoving,
        setIsMoving
    }),[isMoving])

    console.log("RENDER: CarouselProvider")
    return (
        <CarouselContext.Provider value={CValues}>
            <SliderContext.Provider value={SValues}>
                <ButtonContext.Provider value={BValues}>
                    <div
                        ref={(el) => el && !sliderWidth && setSliderWidth(el.offsetWidth)}
                        className="trc__carousel"
                    >
                        {sliderWidth && children}
                    </div>
                </ButtonContext.Provider>
            </SliderContext.Provider>
        </CarouselContext.Provider>
    )
}