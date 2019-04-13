import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import bitcoinService from '../../services/BitcoinService'
import userService from '../../services/UserService'
import MovesList from '../../components/MovesList'

import coinsImg from '../../assets/icons/coins.png'
import bitcoinImg from '../../assets/icons/bitcoin.png'
import './HomePage.css'

class HomePage extends Component {
  
  state = {
    user: userService.loadUser(),
    bitcoinRate: 0
  }

  async componentDidMount() {
    if (this.state.user) {
      const bitcoinRate = await bitcoinService.getBitcoinRate(this.state.user.coins)
      this.setState({bitcoinRate})
    }
  }

  render() {
    const {user} = this.state

    if (!user) return <Redirect to={`/signup`}/>;
    return (
      <div className="home-page">
          <div className="user-details">
            <div className="user-name">Hello {user.name}!</div>
            <div className="user-coins-count">
              <img src={coinsImg} alt="coins" width="24px" height="24px" /> Coins: {this.state.user.coins} 
            </div>
            <div className="user-coins-rate">
            <img src={bitcoinImg} alt="bitcoin" width="24px" height="24px" /> BTC: {this.state.bitcoinRate}
            </div>
          </div>
          <MovesList moves={userService.getMoves()} title='Your last 3 moves:'/>
      </div>
    );
  }
}

export default HomePage;
