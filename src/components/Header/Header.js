import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import './Header.css'

const Header = () => {
    return (
        <HashRouter>
            <nav>
                <ul>
                    <NavLink className="nav-link" activeClassName="active-route" to="/">Home</NavLink>
                    <NavLink className="nav-link" activeClassName="active-route" to="/contact">Contacts</NavLink>
                    <NavLink className="nav-link" activeClassName="active-route" to="/statistic">Statistic</NavLink>
                </ul>
            </nav>
        </HashRouter>
    )
}

export default Header;