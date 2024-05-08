/* eslint-disable react/display-name */
import { forwardRef, useImperativeHandle, useState } from 'react'

export const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return toggleVisibility
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button className="pure-button pure-button-primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="pure-button pure-button-primary" onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </div>
  )
})
