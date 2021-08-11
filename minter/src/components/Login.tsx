import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import useBeacon from '../hooks/useBeacon';
import { DEFAULT_NETWORK } from '../defaults';

export const LoginComponent: React.FC = () => {
    const { connect } = useBeacon();
    return (
        <>
            <h2 className="mt-5">Welcome to NewsFakeToken!</h2>
            <p className="lead">
                This service will allow you to generate NFTs for your news, track sources and manage
                the validity of the news, hence avoiding you to relay fake news.
            </p>
            <p>To access it, you must first login with your wallet.</p>
            <Button variant="primary" onClick={() => connect(DEFAULT_NETWORK).catch(console.log)}>
                <FontAwesomeIcon icon={faSignInAlt} /> Sign in
            </Button>
        </>
    );
};

export default LoginComponent;
