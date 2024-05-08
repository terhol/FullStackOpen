import { useState } from 'react'

export const Togglable = ({ buttonLabel, toggle, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible((previous) => !previous)
  }

  const handleToggle = toggle !== undefined ? toggle.toggle : toggleVisibility
  const isOpened = toggle !== undefined ? toggle.isVisible : visible

  const hideWhenVisible = { display: isOpened ? 'none' : '' }
  const showWhenVisible = { display: isOpened ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="pure-button pure-button-primary" onClick={() => handleToggle()}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button className="pure-button pure-button-primary" onClick={() => handleToggle()}>
          Cancel
        </button>
      </div>
    </div>
  )
}