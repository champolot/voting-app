import React from 'react';
import PropTypes from 'prop-types';

const ShareModal = (props) => {
  const fullUrl = `https://thekholm80-voting.herokuapp.com/poll/${ props.url }`; // production
  // const fullUrl = `http://localhost:8000/poll/${ props.url }`; // production - test

  return (
    <div className='share-modal'>
      <div className='share-container'>
        <div className='share-text'>
          Share this poll with your friends!
        </div>
        <input
          type='text'
          value={ fullUrl }
          size='30'
          readOnly='true'
        />
        <div className='share-submit-button'
          onClick={ props.close }>
          Close
        </div>
      </div>
    </div>
  )
}

ShareModal.propTypes = {
  url: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
}

export default ShareModal;
