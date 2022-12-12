import React from 'react'
import './Error.css'
import errorImage from '../images/error-image.png'
import PropTypes from 'prop-types'

const Error = ({ error }) => {
  return (
    <h2 className='error-message'>
      {error}
      <img
        className='error-image'
        src={errorImage} alt='sad pink tomatillo image'
      />
    </h2>
  )
} 

Error.propTypes = {
  error: PropTypes.string.isRequired,
}

export default Error