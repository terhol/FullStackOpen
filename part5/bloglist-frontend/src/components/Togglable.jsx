import { useState } from 'react'
import PropTypes from 'prop-types'

export const Togglable = ({ buttonLabelOpen, buttonLabelClose, toggle, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible((previous) => !previous)
  }

  const handleToggle = toggle !== undefined ? toggle.toggle : toggleVisibility
  const isOpened = toggle !== undefined ? toggle.isVisible : visible

  // const hideWhenVisible = { display: isOpened ? 'none' : '' }
  // const showWhenVisible = { display: isOpened ? '' : 'none' }

  return (
    <div>
      {isOpened ? (
        <div>
          {children}
          <button className="pure-button pure-button-primary" onClick={() => handleToggle()}>
            {buttonLabelClose}
          </button>
        </div>
      ) : (
        <div>
          <button className="pure-button pure-button-primary" onClick={() => handleToggle()}>
            {buttonLabelOpen}
          </button>
        </div>
      )}
    </div>
  )
}

Togglable.propTypes = {
  buttonLabelOpen: PropTypes.string.isRequired,
  buttonLabelClose: PropTypes.string.isRequired,
}
