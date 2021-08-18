import { FC } from 'react';
import { useWallet, WalletProviderProps } from '@tezos-contrib/react-wallet-provider';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const network = process.env.REACT_APP_NETWORK || 'FLORENCENET';
const NETWORK: WalletProviderProps['network'] =
    network.toUpperCase() as WalletProviderProps['network'];
const RPC_URL = process.env.REACT_APP_RPC_URL || 'https://florencenet.smartpy.io/';

export const LoginComponent: FC = () => {
    const { connect } = useWallet(NETWORK, RPC_URL);
    return (
        <Button variant="primary" onClick={() => connect()}>
            <FontAwesomeIcon icon={faSignInAlt} /> Sign in
        </Button>
    );
};

export default LoginComponent;
