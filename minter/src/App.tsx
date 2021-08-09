import { Navbar, Nav, Container, Row, Col, Button, Badge, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlusCircle,
    faSignInAlt,
    faSignOutAlt,
    faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import Datatable from 'react-data-table-component';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import contractAddress from '@newsfaketoken/contracts/deployments/NFTS_contract';

const AddressComponent: React.FC = () => {
    const { activeAccount } = useWallet();
    return (
        <Badge pill bg="primary">
            {activeAccount?.address}
        </Badge>
    );
};

const NavBarComponent: React.FC = () => {
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

const LoginComponent: React.FC = () => {
    const { connect } = useWallet();
    return (
        <>
            <h2 className="mt-5">Welcome to NewsFakeToken!</h2>
            <p className="lead">
                This service will allow you to generate NFTs for your news, track sources and manage
                the validity of the news, hence avoiding you to relay fake news.
            </p>
            <p>To access it, you must first login with your wallet.</p>
            <Button variant="primary" onClick={connect}>
                <FontAwesomeIcon icon={faSignInAlt} /> Sign in
            </Button>
        </>
    );
};

const MintButtonComponent: React.FC = () => (
    <Button variant="success" size="sm">
        <FontAwesomeIcon icon={faPlusCircle} /> Mint news
    </Button>
);

// TODO
const setInvalid = (tokenId: string): void => {
    console.log(tokenId);
};

function App(): JSX.Element {
    const { connected } = useWallet();
    const headers = [
        { name: 'Token ID', selector: 'tokenId', grow: 0 },
        { name: 'Token Name', selector: 'tokenName', grow: 1 },
        {
            name: 'Actions',
            button: true,
            minWidth: '150px',
            cell: (row: any) => (
                <ButtonGroup size="sm">
                    <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => setInvalid(row.tokenId)}
                    >
                        <FontAwesomeIcon icon={faTimesCircle} /> Set Invalid
                    </Button>
                </ButtonGroup>
            ),
        },
    ];
    const data = [
        { tokenId: 1, tokenName: 'foo' },
        { tokenId: 2, tokenName: 'foo' },
        { tokenId: 3, tokenName: 'foo' },
        { tokenId: 11, tokenName: 'foo' },
        { tokenId: 12, tokenName: 'foo' },
        { tokenId: 13, tokenName: 'foo' },
        { tokenId: 21, tokenName: 'foo' },
        { tokenId: 22, tokenName: 'foo' },
        { tokenId: 23, tokenName: 'foo' },
        { tokenId: 31, tokenName: 'foo' },
        { tokenId: 32, tokenName: 'foo' },
        { tokenId: 33, tokenName: 'foo' },
        { tokenId: 41, tokenName: 'foo' },
        { tokenId: 42, tokenName: 'foo' },
        { tokenId: 43, tokenName: 'foo' },
    ];

    const actionsMemo = React.useMemo(() => <MintButtonComponent />, []);

    return (
        <>
            <header>
                <NavBarComponent />
            </header>
            <main>
                <Container>
                    {!connected && <LoginComponent />}
                    {connected && (
                        <>
                            <h2 className="mt-5">Minted NewsFT</h2>
                            <h3>{contractAddress}</h3>
                            <p className="lead">
                                Those are your minted NewsFT. You can see their status, and invalid
                                them here if need be. Click on &quot;Mint&quot; to create a new
                                NewsFT.
                            </p>
                            <Row>
                                <Col md={{ span: 10, offset: 1 }}>
                                    <Datatable
                                        title="My NFTs"
                                        columns={headers}
                                        data={data}
                                        pagination
                                        actions={actionsMemo}
                                    />
                                </Col>
                            </Row>
                        </>
                    )}
                </Container>
            </main>
        </>
    );
}

export default App;
