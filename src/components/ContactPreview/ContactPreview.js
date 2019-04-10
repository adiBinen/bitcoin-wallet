import React from 'react';
import { Link }  from 'react-router-dom';
import imgAvatar from '../../assets/img_avatar.png'
import './ContactPreview.css'

const ContactPreview = ({contact}) => {
  
  return (
    <Link to={`/contact/${contact._id}`}>
      <div className="contact-preview">
        <img src={imgAvatar} alt="Person" width="96" height="96" />
        <span>{contact.name}</span>
      </div>
    </Link>
  )
}

export default ContactPreview;
