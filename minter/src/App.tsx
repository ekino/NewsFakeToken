import { Navbar, Nav, Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useWallet } from '@tezos-contrib/react-wallet-provider';

const AddressComponent: React.FC = () => {
  const { activeAccount } = useWallet();
  return <Badge pill bg="primary">{activeAccount?.address}</Badge>;
};

const MintFormComponent: React.FC = () => {
  const { activeAccount } = useWallet();
  return <form>
    <label>
      Article URL:
    <input type="text" name="articleUrl"></input>
    </label>
  </form>;
}

function App() {
  const { connected, connect, disconnect } = useWallet();
  return (
    <>
    <header>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>NewsFakeToken</Navbar.Brand>
          <Nav className="justify-content-end">
            {connected && (
              <Nav>
                <Navbar.Text>
                  Connected as <AddressComponent />
                </Navbar.Text>
                <Nav.Link onClick={disconnect}><FontAwesomeIcon icon={faSignOutAlt} /> Disconnect</Nav.Link>
              </Nav>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
    <main>
      <Container>
        <h1 className="mt-5">Welcome to NewsFakeToken!</h1>
        {!connected && (
          <>
            <p className="lead">This service will allow you to generate NFTs for your news, track sources and manage the validity of the news, hence avoiding you to relay fake news.</p>
            <p>To access it, you must first login with your wallet.</p>
            <Button variant="primary" onClick={connect}><FontAwesomeIcon icon={faSignInAlt} /> Sign in</Button>
          </>
        )}
      </Container>
    </main>
    </>
  );
}

export default App;
