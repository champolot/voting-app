import React from 'react';
import PropTypes from 'prop-types';

const CreateErrorModal = (props) => {
  return (
    <div className='error-modal'>
      <div className='error-container'>
        <div>Please complete all fields</div>
        <div
          onClick={ props.close }
          className='error-submit-button'>
          back
        </div>
      </div>
    </div>
  )
}

CreateErrorModal.propTypes = {
  close: PropTypes.func.isRequired
}

export default CreateErrorModal;
