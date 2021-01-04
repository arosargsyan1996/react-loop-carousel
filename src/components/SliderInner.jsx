import { memo, useState, useEffect } from 'react'
import { useSContext } from '../context/SliderContext'


function loopedItems(items, visibleSlides) {
    return [
        ...items.slice(items.length - visibleSlides),
        ...items,
        ...items.slice(0, visibleSlides)
    ]
} 

export const SliderInner = memo(({items}) => {
    const sc = useSContext()
    const [ sliderItems, setSliderItems ] = useState(items)
    const [ readyToRender, setReadyToRender ] = useState(false)

    useEffect(() => {
        if ( sc.loop ) { 
            setSliderItems(loopedItems(items, sc.visibleSlides))
        }
        setReadyToRender(true)
    }, [sc, items]);

    const slideStyles  = {
        width: `${sc.slideWidth}px`,
    }
    if (sc.innerPadding) {
        slideStyles.margin = `0 ${sc.innerPadding/2}px`
    }

    if (!readyToRender) {
        return (
            null
        )
    }

    console.log("RENDER: SLIDER_INNER", sc.prev)
    return (
        <div className="trc__slider">
            {sliderItems.map((item, i) => (
                
                <div
                    key={i}
                    style={slideStyles}
                    className="trc__slide"
                >
                    {item}
                </div>
            ))}
        </div>
    )
})