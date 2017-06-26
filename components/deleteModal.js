import React from 'react';
import PropTypes from 'prop-types';

const DeleteModal = (props) => {
  return (
    <div className='delete-modal'>
      <div className='delete-container'>
        <div className='delete-text'>
          <div>Delete</div>
          <div>{ props.title }</div>
          <div>Are you sure?</div>
        </div>
        <div className='delete-button-row'>
          <div className='delete-button'
            onClick={ () => props.confirm(props.id) }>
            Confirm
          </div>
          <div className='delete-button'
            onClick={ props.cancel }>
            Cancel
          </div>
        </div>
      </div>
    </div>
  )
}

DeleteModal.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired
}

export default DeleteModal;
