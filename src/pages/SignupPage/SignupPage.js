import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import userService from '../../services/UserService';
import bitcoinImg from '../../assets/icons/bitcoin.png';
import './SignupPage.css';

class SignupPage extends Component {
    state = {
        name: '',
        nameIsValid: true,
        redirect: false
    }

    handleChange = (field) => {
        const validationKey = `${field}IsValid`;
        return ev => {
            this.setState({ [field]: ev.target.value, [validationKey]: true });
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        const nameIsValid = this.state.name.length > 2;
        this.setState({ nameIsValid })
        if (nameIsValid) {
            userService.signup(this.state.name)
            this.setState({ redirect: true });
        }
    }

    render() {
        const { redirect } = this.state;
        if (redirect) return <Redirect to={'/'} />;
        return (
            <div className="signup-page">
                <img src={bitcoinImg} alt="bitcoin"/>
                <form onSubmit={this.handleSubmit}>
                    <label>Please enter your name:</label>
                    {!this.state.nameIsValid && <div>Name is too short</div>}
                    <input type="text" onChange={this.handleChange('name')} />
                    <input type="submit" value="Signup" />
                </form>
            </div>
        );
    }
}

export default SignupPage;
