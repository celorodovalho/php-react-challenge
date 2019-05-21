import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import logo from '../logo.svg';

/**
 * Single component to provide a header layout
 *
 * @returns {*}
 * @constructor
 */
function Header() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
                {' PHP React Challenge'}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/" className="nav-link" role="button">Home</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;