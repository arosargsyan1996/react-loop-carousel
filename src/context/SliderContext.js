import { createContext, useContext } from 'react';

export const initSContext = {
    visibleSlides: 1,
    loop: false,
    innerPadding: 0,
    sliderWidth: 0,
    itemWidth: 0,
    slideHeightCoeff: 16/9,
    prev: null
}
export const SliderContext = createContext(initSContext)
export const useSContext = () => useContext(SliderContext)