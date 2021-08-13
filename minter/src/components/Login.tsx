import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { useWallet } from '@tezos-contrib/react-wallet-provider';

export const LoginComponent: React.FC = () => {
    const { connect } = useWallet();
    return (
        <Button variant="primary" onClick={() => connect()}>
            <FontAwesomeIcon icon={faSignInAlt} /> Sign in
        </Button>
    );
};

export default LoginComponent;
