import * as React from 'react';
import { Badge } from 'react-bootstrap';
import { useWallet } from '@tezos-contrib/react-wallet-provider';

export const AddressComponent: React.FC = () => {
    const { activeAccount } = useWallet();
    return (
        <Badge pill bg="primary">
            {activeAccount?.address}
        </Badge>
    );
};

export default AddressComponent;
