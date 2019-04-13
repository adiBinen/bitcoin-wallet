import React, { Component } from 'react';
import { Link, Redirect }  from 'react-router-dom';

import userService from '../../services/UserService';
import contactService from '../../services/ContactService';
import ContactList from '../../components/ContactList';

import addNewImg from '../../assets/icons/plus.png';
import './ContactPage.css'

class ContactPage extends Component {
  state = {
    user: userService.loadUser(),
    contacts: []
  }

  componentDidMount() {
    contactService.getContacts().then(contacts => {
      this.setState({contacts})
    })
  }

  
  render() {
    const {user} = this.state;
    
    if (!user) return <Redirect to={`/signup`}/>;
    return (
      <div className="contacts-page">
        <div className="contacts-container">
            <ContactList contacts={this.state.contacts} />
        </div>
        <Link to="/contact/edit">
          <img className="add-new-img" src={addNewImg} alt="add new contant" title="add new contant"/>
        </Link>
      </div>
    );
  }
}

export default ContactPage;
