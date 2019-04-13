import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import homePageImg from '../../assets/icons/home.png';
import contactPageImg from '../../assets/icons/users.png';
import statisticPageImg from '../../assets/icons/increase.png';
import './Header.css'

const Header = () => {
    return (
        <HashRouter>
            <nav>
                <NavLink className="nav-link" activeClassName="active-route" exact to="/">
                    <img src={homePageImg} alt="homepage" />
                </NavLink>
                <NavLink className="nav-link" activeClassName="active-route" to="/contact">
                    <img src={contactPageImg} alt="contacts" />
                </NavLink>
                <NavLink className="nav-link" activeClassName="active-route" to="/statistic">
                    <img src={statisticPageImg} alt="statistic" />
                </NavLink>
            </nav>
        </HashRouter>
    )
}

export default Header;