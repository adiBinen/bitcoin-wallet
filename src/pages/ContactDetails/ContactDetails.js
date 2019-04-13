import React, { Component }  from 'react';
import { Link, Redirect }  from 'react-router-dom';

import userService from '../../services/UserService';
import contactService from '../../services/ContactService';
import TransferFund from '../../components/TransferFund';
import MovesList from '../../components/MovesList';
import imgAvatar from '../../assets/img_avatar.png'
import backBtnImg from '../../assets/icons/back.png';
import editBtnImg from '../../assets/icons/edit.png';
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
    const {contact, user} = this.state;
    const avatar = contact.picture || imgAvatar;
    const userMoves = userService.getMoves(this.state.contact._id);

    if (!user) return <Redirect to={`/signup`}/>;
    return (
      <div className="contact-details">
        <div className="contact-details-body">
          <button className="datails-btn">
            <Link to="/contact">
              <img src={backBtnImg} alt="back" title="back"/>
            </Link>
          </button>
          <button className="datails-btn">
            <Link to={`/contact/edit/${contact._id}`}>
              <img src={editBtnImg} alt="edit" title="edit"/>
            </Link>
          </button>
          <img className="avatat-img" src={avatar} alt="Person"/>
          <div className="contact-details-row">Name: {contact.name}</div>
          <div className="contact-details-row">Phone: {contact.phone}</div>
          <div className="contact-details-row">Email: {contact.email}</div>
        </div>

        <TransferFund contactName={this.state.contact.name} maxCoins={this.state.user.coins} onTransferCoins={this.transfer}/>
        {userMoves.length > 0 && <MovesList moves={userMoves} isDetailsPage={true}/>}
      </div>
    )
  }
  
}

export default ContactDetails;
