import React, { Component }  from 'react';
import { Redirect }  from 'react-router-dom';
import contactService from '../../services/ContactService'
import imgAvatar from '../../assets/img_avatar.png'
import './ContactEditPage.css'

class ContactEditPage extends Component {
  state =  {
      contact: {},
      nameIsValid: true,
      emailIsValid: true,
      phoneIsValid: true,
      redirect: false
    }

  componentDidMount() {
    const {id} = this.props.match.params;
    if (id) {
        contactService.getContactById(id).then(contact => {
            this.setState({contact})
        })
    } else {
        let emptyContact = contactService.getEmptyContact();
        this.setState({contact: emptyContact});
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
            this.setState({redirect: true});
        })
    }
  }

  handleChange = (field) => {
    const validationKey = `${field}IsValid`
    return ev => {
        const contact = {...this.state.contact, [field]: ev.target.value }
        this.setState({contact, [validationKey]: true});
    }
  }

  render() {
    const { contact, redirect } = this.state
    const avatar = contact.picture || imgAvatar

    if (redirect) {
      return <Redirect to={`/contact/${contact._id}`}/>;
    }
    return (
        <div className="contact-edit">
        
            <div className="contact-edit-body">
                <img src={avatar} alt="Person" width="96" height="96" /><br/>
                <form onSubmit={this.handleSubmit}>
                    {!this.state.nameIsValid && <div>Name is too short</div>}
                    <label>Name:</label>
                    <input className="contact-edit-row" name={'name'} value={contact.name || ''} onChange={this.handleChange('name')}/><br/>
                    
                    {!this.state.phoneIsValid && <div>The phone number is not valid</div>}
                    <label>Phone:</label>
                    <input className="contact-edit-row" value={contact.phone || ''} onChange={this.handleChange('phone')}/><br/>
                    
                    {!this.state.emailIsValid && <div>The email address is not valid</div>}
                    <label>Email:</label>
                    <input className="contact-edit-row" value={contact.email || ''} onChange={this.handleChange('email')}/><br/>

                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
  }
}

export default ContactEditPage;