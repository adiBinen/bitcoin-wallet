import React, { Component } from 'react';
import { Link }  from 'react-router-dom';
import contactService from '../../services/ContactService'
import ContactList from '../../components/ContactList'

import './ContactPage.css'

class ContactPage extends Component {
  state = {contacts: []}

  componentDidMount() {
    contactService.getContacts().then(contacts => {
      this.setState({contacts})
    })
  }

  
  render() {
    return (
      <div className="contacts-page">
        <div className="contacts-container">
            <ContactList contacts={this.state.contacts} />
        </div>
        <Link to="/contact/edit">Add New</Link>
      </div>
    );
  }
}

export default ContactPage;
