import React from 'react';
import ContactPreview from '../ContactPreview'

import './ContactList.css';

const ContactList = (props) => {
  const contactsPreview = props.contacts.map( (contact, i) => {
      return (
          <li key={contact._id} className="contacts-list-item">
            <ContactPreview contact={contact} />
          </li>
      )
  });
    
  return (
    <div className="contacts-list">
      <ul>
          {contactsPreview}
      </ul>
    </div>
  );
}

export default ContactList;
