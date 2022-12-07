import React from 'react';
import './Error.css'
const Error = ({ error }) => {
  return (
    <h2 className='error-message'>
      {error}
    </h2>
  )
}

export default Error;