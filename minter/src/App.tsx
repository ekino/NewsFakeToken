import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useWallet, useBeaconWallet } from '@tezos-contrib/react-wallet-provider';
// eslint-disable-next-line import/no-extraneous-dependencies
import CONTRACT_ADDRESS from '@newsfaketoken/contracts/deployments/NFTS_contract';
import NavBarComponent from './components/NavBar';
import AllTokens from './components/AllTokens';
import MyTokens from './components/MyTokens';
import Metadata from './components/Metadata';
import { initTezos, initMinterContract, setWalletProvider } from './services/contract';

const RPC_URL = process.env.REACT_APP_RPC_URL || 'https://florencenet.smartpy.io/';

function App(): JSX.Element {
    const { connected, activeAccount } = useWallet();

    const beaconWallet = useBeaconWallet();
    useEffect(() => {
        initTezos(RPC_URL);
        initMinterContract(CONTRACT_ADDRESS);
    }, []);
    useEffect(() => {
        setWalletProvider(beaconWallet);
    }, [beaconWallet]);

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
                            {connected && (
                                <MyTokens activeAccountAddress={activeAccount?.address} />
                            )}
                        </Route>
                    </Switch>
                </Container>
            </main>
        </BrowserRouter>
    );
}

export default App;
