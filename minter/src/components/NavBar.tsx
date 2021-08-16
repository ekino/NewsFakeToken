import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import { AddressComponent } from './Address';
import LoginComponent from './Login';

export const NavBarComponent: FC = () => {
    const { connected, disconnect } = useWallet();
    const { pathname } = useLocation();

    const getNavLinkClass = (path: string): string => {
        return pathname === path ? 'is-active' : '';
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand className={getNavLinkClass('/')}>
                    <Link to="/">NewsFakeToken</Link>
                </Navbar.Brand>
                <Nav className={getNavLinkClass('/about')}>
                    <Link to="/about">About</Link>
                </Nav>
                {connected ? (
                    <>
                        <Nav className={getNavLinkClass('/my-tokens')}>
                            <Link to="/my-tokens">My Tokens</Link>
                        </Nav>
                        <Nav>
                            <Navbar.Text>
                                Connected as <AddressComponent />
                            </Navbar.Text>
                            <Nav.Link onClick={disconnect}>
                                <FontAwesomeIcon icon={faSignOutAlt} /> Disconnect
                            </Nav.Link>
                        </Nav>
                    </>
                ) : (
                    <LoginComponent />
                )}
            </Container>
        </Navbar>
    );
};

export default NavBarComponent;
