import React, { Component }  from 'react';
import { Link, Redirect }  from 'react-router-dom';

import userService from '../../services/UserService';
import contactService from '../../services/ContactService';
import TransferFund from '../../components/TransferFund';
import MovesList from '../../components/MovesList';
import imgAvatar from '../../assets/img_avatar.png'

import './ContactDetails.css'

class ContactDetails  extends Component {
  
  state =  {
    user: userService.loadUser(),
    contact: {}
  }
  
  componentDidMount() {
    var {id} = this.props.match.params;
    if (id) {
      contactService.getContactById(id).then(contact => {
        this.setState({contact})
      })
    }
  }

  transfer = (amount) => {
    userService.addMove(this.state.contact, amount);
  }

  render() {
    const {contact, user} = this.state
    const avatar = contact.picture || imgAvatar

    if (!user) return <Redirect to={`/signup`}/>;
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

        <TransferFund contactName={this.state.contact.name} maxCoins={this.state.user.coins} onTransferCoins={this.transfer}/>
        <MovesList moves={userService.getMoves(this.state.contact._id)} isDetailsPage={true}/>
      </div>
    )
  }
  
}

export default ContactDetails;
