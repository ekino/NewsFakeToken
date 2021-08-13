import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { WalletProvider, WalletProviderProps } from '@tezos-contrib/react-wallet-provider';
import App from './App';
import reportWebVitals from './reportWebVitals';

const network = process.env.REACT_APP_NETWORK || 'FLORENCENET';
const NETWORK: WalletProviderProps['network'] =
    network.toUpperCase() as WalletProviderProps['network'];

ReactDOM.render(
    <React.StrictMode>
        <WalletProvider name="newsfaketoken" clientType="beacon" network={NETWORK}>
            <App />
        </WalletProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
