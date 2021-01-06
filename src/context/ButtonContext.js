import { createContext, useContext } from 'react';

const noop = () => {}
export const initBContext = {
    isMoving: false,
    setIsMoving: noop
}
export const ButtonContext = createContext(initBContext)
export const useBContext = () => useContext(ButtonContext)