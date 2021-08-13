import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import { AddressComponent } from './Address';

export const NavBarComponent: React.FC = () => {
    const { connected, disconnect } = useWallet();
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand>NewsFakeToken</Navbar.Brand>
                <Nav className="justify-content-end">
                    {connected && (
                        <Nav>
                            <Navbar.Text>
                                Connected as <AddressComponent />
                            </Navbar.Text>
                            <Nav.Link onClick={disconnect}>
                                <FontAwesomeIcon icon={faSignOutAlt} /> Disconnect
                            </Nav.Link>
                        </Nav>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBarComponent;
