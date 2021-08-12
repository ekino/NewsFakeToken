import { Container } from 'react-bootstrap';
import React from 'react';
import useBeacon from './hooks/useBeacon';
import NavBarComponent from './components/NavBar';
import LoginComponent from './components/Login';
import DataTable from './components/DataTable';

function App(): JSX.Element {
    const { pkh } = useBeacon();
    return (
        <>
            <header>
                <NavBarComponent />
            </header>
            <main>
                <Container>
                    {!pkh && <LoginComponent />}
                    {pkh && <DataTable />}
                </Container>
            </main>
        </>
    );
}

export default App;
