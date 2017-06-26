import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import axios from 'axios';

import CreateErrorModal from '../components/createErrorModal';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pollTitle: "",
      isModalOpen: false,
      inputFieldCount: 2,
      inputFields: [1, 2],
      inputValues: {
        "1": "",
        "2": ""
      }
    }

    this.addTextField = this.addTextField.bind(this);
    this.removeTextField = this.removeTextField.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.submitPoll = this.submitPoll.bind(this);
    this.validateSubmit = this.validateSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  addTextField() {
    const newCount = this.state.inputFieldCount + 1;
    const newInputFields = this.state.inputFields;
    const newInputValues = this.state.inputValues;

    newInputFields.push(newCount);
    newInputValues[newCount] = "";

    this.setState({
      inputFieldCount: newCount,
      inputFields: newInputFields,
      inputValues: newInputValues
    });
  }

  removeTextField() {
    if (this.state.inputFieldCount > 2) {
      const newCount = this.state.inputFieldCount - 1;
      const newInputFields = this.state.inputFields;
      const newInputValues = this.state.inputValues;

      newInputFields.pop(newCount);
      delete newInputValues[this.state.inputFieldCount];

      this.setState({
        inputFieldCount: newCount,
        inputFields: newInputFields,
        inputValues: newInputValues
      });
    }
  }

  handleInputChange(event) {
    const newInputValues = this.state.inputValues;

    newInputValues[event.target.id] = event.target.value.replace(/^[$.]/, '').replace(/[.]/g, ' ');

    this.setState( { inputValues: newInputValues });
  }

  handleTitleChange(event) {
    this.setState({ pollTitle: event.target.value });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  validateSubmit() {
    if (this.state.pollTitle === "") return false;

    for (let i in this.state.inputValues) {
      if (this.state.inputValues[i] === "") return false;
    }

    return true;
  }

  submitPoll() {
    if (!this.validateSubmit()) {
      this.setState({ isModalOpen: true });
      return false;
    }

    const url = '/polls/add';
    const instance = axios.create({
      baseURL: 'https://thekholm80-voting.herokuapp.com/',
      headers: { type: 'application/x-www-form-urlencoded'}
    });
    const timestamp = Date.now();
    const postData = {
      "created": timestamp,
      "user": this.props.user.username,
      "poll": {
        "title": this.state.pollTitle,
        "responses": {}
      }
    }
    for (let i in this.state.inputValues) {
      postData.poll.responses[this.state.inputValues[i]] = 0;
    }

    instance({
                method: 'post',
                url: url,
                data: postData
              })
              .then( (response) => {
                  this.props.history.push(`/poll/${ response.data._id }`);
              })
              .catch( (error) => {
                  console.warn("axios post error on submit");
              });
  }

  componentDidMount() {
    if (!this.props.user) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className='create'>
        { this.state.isModalOpen
          && <CreateErrorModal close={ this.closeModal }/> }
        <div>Title</div>
        <div id='poll-title'>
          <input type='text'
            maxLength='80'
            onChange={ this.handleTitleChange }
          placeholder='Enter a title for you poll' />
        </div>
        <div>Responses</div>
        <div className='responses-container'>
          { this.state.inputFields.map( (field) => {
            return (
              <div key={ field }>
                <input type='text'
                  id={ field }
                  maxLength='80'
                  value={ this.state.inputValues[field] }
                  onChange={ this.handleInputChange }
                  placeholder={ 'Enter response ' + field } />
              </div>
            )
          })}
        </div>
        <div className='create-button-row'>
          <div className='create-add-delete-button'
            onClick={ this.addTextField }>
            +
          </div>
          { this.state.inputFieldCount > 2
                && (<div className='create-add-delete-button'
                      onClick={ this.removeTextField }>
                      -
                    </div>) }
        </div>
        <div className='create-submit-button'
          onClick={ this.submitPoll }>
          Submit
        </div>
      </div>
    )
  }
}

Create.propTypes = {
  user: PropTypes.object.isRequired
}

function mapStateToProps({ user }) {
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  });
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Create)
);
