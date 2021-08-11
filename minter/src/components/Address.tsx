import React from 'react';
import { Badge } from 'react-bootstrap';
import useBeacon from '../hooks/useBeacon';

export const AddressComponent: React.FC = () => {
    const { pkh } = useBeacon();
    return (
        <Badge pill bg="primary">
            {pkh}
        </Badge>
    );
};

export default AddressComponent;
