import React, { Component }  from 'react';
import { Link }  from 'react-router-dom';
import contactService from '../../services/ContactService'
import imgAvatar from '../../assets/img_avatar.png'

import './ContactDetails.css'

class ContactDetails  extends Component {
  
  state =  { contact: {} }
  
  componentDidMount() {
    var {id} = this.props.match.params;
    if (id) {
      contactService.getContactById(id).then(contact => {
        this.setState({contact})
      })
    }
  }

  render() {
    const contact = this.state.contact
    const avatar = contact.picture || imgAvatar

    return (
      <div className="contact-details">
        <div className="contact-details-body">
          <button>
            <Link to="/contact">Back</Link>
          </button>
          <button>
            <Link to={`/contact/edit/${contact._id}`}>Edit</Link>
          </button>
          <img src={avatar} alt="Person" width="96" height="96" />
          <div className="contact-details-row">Name: {contact.name}</div>
          <div className="contact-details-row">Phone: {contact.phone}</div>
          <div className="contact-details-row">Email: {contact.email}</div>
        </div>
      </div>
    )
  }
  
}

export default ContactDetails;
