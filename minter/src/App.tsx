import { Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import NavBarComponent from './components/NavBar';
import AllTokens from './components/AllTokens';
import MyTokens from './components/MyTokens';
import Metadata from './components/Metadata';

function App(): JSX.Element {
    const { connected, activeAccount } = useWallet();

    return (
        <BrowserRouter>
            <header>
                <NavBarComponent />
            </header>
            <main>
                <Container>
                    <Switch>
                        <Route exact path="/">
                            <h2 className="mt-5">Welcome to NewsFakeToken!</h2>
                            <p className="lead">
                                This service will allow you to generate NFTs for your news, track
                                sources and manage the validity of the news, hence avoiding you to
                                relay fake news.
                            </p>
                            {!connected && (
                                <p>
                                    To interact with the smart contract, please sign in with your
                                    wallet.
                                </p>
                            )}
                            <AllTokens />
                        </Route>
                        <Route path="/about">
                            <Metadata />
                        </Route>
                        <Route path="/my-tokens">
                            {connected && activeAccount && (
                                <MyTokens activeAccountAddress={activeAccount.address} />
                            )}
                        </Route>
                    </Switch>
                </Container>
            </main>
        </BrowserRouter>
    );
}

export default App;
