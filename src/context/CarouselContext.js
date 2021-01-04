import { createContext, useContext } from 'react';

export const initCContext = {
    currentSlide: 0
}
export const CarouselContext = createContext(initCContext)
export const useCContext = () => useContext(CarouselContext)