import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import userService from '../../services/UserService';
import contactService from '../../services/ContactService';

import imgAvatar from '../../assets/img_avatar.png';
import backBtnImg from '../../assets/icons/back.png';
import deleteBtnImg from '../../assets/icons/delete.png';
import './ContactEditPage.css';

class ContactEditPage extends Component {
  state = {
    user: userService.loadUser(),
    contact: {},
    nameIsValid: true,
    emailIsValid: true,
    phoneIsValid: true,
    redirectOnSave: false,
    redirectOnDelete: false
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      contactService.getContactById(id).then(contact => {
        this.setState({ contact })
      })
    } else {
      let emptyContact = contactService.getEmptyContact();
      this.setState({ contact: emptyContact });
    }
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
    const nameIsValid = this.state.contact.name.length > 2;
    const phoneIsValid = this.state.contact.phone.length >= 17;
    const emailIsValid = this.state.contact.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    this.setState({
      nameIsValid,
      phoneIsValid,
      emailIsValid
    })

    if (nameIsValid && phoneIsValid && emailIsValid) {
      contactService.saveContact(this.state.contact).then(updatedContact => {
        this.setState({ redirectOnSave: true });
      })
    }
  }

  handleChange = (field) => {
    const validationKey = `${field}IsValid`
    return ev => {
      const contact = { ...this.state.contact, [field]: ev.target.value }
      this.setState({ contact, [validationKey]: true });
    }
  }

  handleRemove = async () => {
    contactService.deleteContact(this.state.contact._id).then(() => {
      this.setState({ redirectOnDelete: true });
    })
  }

  render() {
    const { user, contact, redirectOnSave, redirectOnDelete } = this.state
    const avatar = contact.picture || imgAvatar

    if (!user) return <Redirect to={`/signup`} />;
    else if (redirectOnSave) return <Redirect to={`/contact/${contact._id}`} />;
    else if (redirectOnDelete) return <Redirect to={`/contact`} />;
    return (
      <div className="contact-edit">
        <button className="edit-btn">
          <img src={backBtnImg} alt="back" title="back" />
        </button>
        {
          contact._id &&
          <button className="edit-btn" onClick={this.handleRemove.bind(this)}>
            <img src={deleteBtnImg} alt="delete" title="delete" />
          </button>
        }
        <div className="contact-edit-body">
          <img src={avatar} alt="Person" width="96" height="96" />
          <form className="edit-form" onSubmit={this.handleSubmit}>
            {!this.state.nameIsValid && <div>Name is too short</div>}
            <label>Name:</label>
            <input className="contact-edit-row" value={contact.name || ''} onChange={this.handleChange('name')} />

            {!this.state.phoneIsValid && <div>The phone number is not valid</div>}
            <label>Phone:</label>
            <input className="contact-edit-row" value={contact.phone || ''} onChange={this.handleChange('phone')} />

            {!this.state.emailIsValid && <div>The email address is not valid</div>}
            <label>Email:</label>
            <input className="contact-edit-row" value={contact.email || ''} onChange={this.handleChange('email')} />

            <button className="save-btn" type="submit">Save</button>
          </form>
        </div>
      </div>
    )
  }
}

export default ContactEditPage;