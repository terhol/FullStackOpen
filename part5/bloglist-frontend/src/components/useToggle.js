import { useState } from 'react'

export const useToggle = ({ isOpen = false } = {}) => {
  const [isVisible, setIsVisible] = useState(isOpen)

  const toggle = () => setIsVisible((previousValue) => !previousValue)

  return { toggle, isVisible }
}
