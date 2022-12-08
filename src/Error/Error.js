import React from 'react'
import './Error.css'
import errorImage from '../images/error-image.png'

const Error = ({ error }) => {
  return (
    <h2 className='error-message'>
      {error}
      <img
        className='error-image'
        src={errorImage} alt="sad pink tomatillo image"
      />
    </h2>
  )
}

export default Error