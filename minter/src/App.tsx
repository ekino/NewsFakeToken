import { Navbar, Nav, Container, Row, Col, Button, Badge, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlusCircle,
    faSignInAlt,
    faSignOutAlt,
    faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useWallet, WalletProvider } from '@tezos-contrib/react-wallet-provider';
import Datatable from 'react-data-table-component';
// eslint-disable-next-line import/no-extraneous-dependencies
import contractAddress from '@newsfaketoken/contracts/deployments/NFTS_contract';
import React, { useState } from 'react';
import MintForm from './MintForm';
import UpdateForm from './RemintForm';
import { TezosToolkit } from '@taquito/taquito';

const Tezos = new TezosToolkit('http://52.47.113.94:8732');
const balance = Tezos.tz.getBalance('tz1MwYuP8c6DGxrbJAiY1Vdt1kcW2j9o5EmP');

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

function MintButtonComponent(): JSX.Element {
    const [show, setShow] = useState(false);

    function handleClose(): void {
        setShow(false);
    }

    function handleShow(): void {
        setShow(true);
    }

    return (
        <>
            <Button variant="success" size="sm" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlusCircle} /> Mint news
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Mint your news</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MintForm />
                </Modal.Body>
            </Modal>
        </>
    );
}

function InvalidModal(props: any): JSX.Element {
    const [show, setShow] = useState(false);
    const [nft, setnft] = useState([] as any);
    function handleClose(): void {
        setShow(false);
    }
    function handleShow(): void {
        setShow(true);
    }
    return (
        <>
            <Button variant="outline-warning" size="sm" onClick={handleShow}>
                <FontAwesomeIcon icon={faTimesCircle} /> Set Invalid
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Update your news </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateForm
                        NftName={props.nftName}
                        NftSources={props.nftSource}
                        Url={props.Url}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}

function App(): JSX.Element {
    const { connected, activeAccount, client } = useWallet();
    const [invalid, SetInvalid] = useState(false);
    const headers = [
        { name: 'Token ID', selector: 'tokenId', grow: 0 },
        { name: 'Token Name', selector: 'tokenName', grow: 1 },
        { name: 'Url of the article', selector: 'url', grow: 3 },
        { name: 'Sources', selector: 'sourcesNames', grow: 2 },
        { name: 'Status', selector: 'status', grow: 1 },
        {
            name: 'Actions',
            button: true,
            minWidth: '150px',
            cell: (row: any) => (
                <InvalidModal nftName={row.tokenName} nftSource={row.sourcesNames} Url={row.url} />
            ),
        },
    ];
    const data = [
        { tokenId: 1, tokenName: 'fomo', url: 'http://url1.com', sourcesNames: ['a', 'b'] },
        { tokenId: 2, tokenName: 'folo', url: 'http://url1.com', sourcesNames: ['cd', 'ef'] },
        { tokenId: 3, tokenName: 'fowo', url: 'http://url1.com', sourcesNames: ['NFT1', 'NFT2'] },
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
                            <p>The address of the smart contract is : {contractAddress}</p>
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
