import { Container } from 'react-bootstrap';
import React from 'react';
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import NavBarComponent from './components/NavBar';
import LoginComponent from './components/Login';
import DataTable from './components/DataTable';

function App(): JSX.Element {
    const { connected } = useWallet();
    return (
        <>
            <header>
                <NavBarComponent />
            </header>
            <main>
                <Container>
                    {!connected && <LoginComponent />}
                    {connected && <DataTable />}
                </Container>
            </main>
        </>
    );
}

export default App;
