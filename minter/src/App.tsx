import {
    Navbar,
    Nav,
    Container,
    Row,
    Col,
    Button,
    Badge,
    ButtonGroup,
    Modal,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlusCircle,
    faSignInAlt,
    faSignOutAlt,
    faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import Datatable from 'react-data-table-component';
// eslint-disable-next-line import/no-extraneous-dependencies
import contractAddress from '@newsfaketoken/contracts/deployments/NFTS_contract';
import React, { useState } from 'react';
import MintForm from './MintForm';
import UpdateForm from './RemintForm';

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

// TODO
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
    const { connected } = useWallet();
    const [invalid, SetInvalid] = useState(false);
    const headers = [
        { name: 'Token ID', selector: 'tokenId', grow: 0 },
        { name: 'Token Name', selector: 'tokenName', grow: 1 },
        { name: 'Url of the article', selector: 'url', grow: 2 },
        { name: 'Sources', selector: 'sourcesNames', grow: 3 },
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
        { tokenId: 1, tokenName: 'folll', url: 'http://url1.com', sourcesNames: ['a', 'b'] },
        { tokenId: 2, tokenName: 'folo', sourcesNames: ['cd', 'ef'] },
        { tokenId: 3, tokenName: 'fowo', sourcesNames: ['NFT1', 'NFT2'] },
        { tokenId: 11, tokenName: 'foao', sourcesNames: ['NFT1', 'NFT2'] },
        { tokenId: 12, tokenName: 'fozo', sourcesNames: ['NFT1', 'NFT2'] },
        { tokenId: 13, tokenName: 'foyo', sourcesNames: ['NFT1', 'NFT2'] },
        { tokenId: 21, tokenName: 'fobo', sourcesNames: ['NFT1', 'NFT2'] },
        { tokenId: 22, tokenName: 'foqo', sourcesNames: ['NFT1', 'NFT2'] },
        { tokenId: 23, tokenName: 'foso', sourcesNames: ['NFT1', 'NFT2'] },
        { tokenId: 31, tokenName: 'fogo', sourcesNames: ['NFT1', 'NFT2'] },
        { tokenId: 32, tokenName: 'foro', sourcesNames: ['NFT1', 'NFT2'] },
        { tokenId: 33, tokenName: 'foeo', sourcesNames: ['NFT1', 'NFT2'] },
        { tokenId: 41, tokenName: 'foto', sourcesNames: ['NFT1', 'NFT2'] },
        { tokenId: 42, tokenName: 'fopo', sourcesNames: ['NFT1', 'NFT2'] },
        { tokenId: 43, tokenName: 'follo', sourcesNames: ['NFT1', 'NFT2'] },
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
