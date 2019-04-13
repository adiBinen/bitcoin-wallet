import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './TransferFund.css';

class TransferFund extends PureComponent {
    state = {
        amount: null,
        amountIsValid: true
    };

    handleChange = (ev) => {
        this.setState({amount: ev.target.value, amountIsValid: true});
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        const amountIsValid = (this.state.amount <= this.props.maxCoins && this.state.amount > 0);
        this.setState({amountIsValid});
        if (amountIsValid) {
            this.props.onTransferCoins(this.state.amount)
            this.setState({amount: null});
        }
    }

    render() {
        const {amountIsValid} = this.state;
        return (
            <section className="transfer-fund">
            <form onSubmit={this.handleSubmit}>
                <p>Transfer coins to {this.props.contactName}</p>
                {!amountIsValid && <div>Amount is not valid</div>}
                Amount: <input type="number" value={this.state.amount || ''} onChange={this.handleChange}/>
                <input type="submit" value="Transfer"/>
            </form>    
            </section>
        )
    }
}

export default TransferFund;

TransferFund.propTypes = {
    contactName: PropTypes.string,
    maxCoins: PropTypes.number,
    onTransferCoins: PropTypes.func
}