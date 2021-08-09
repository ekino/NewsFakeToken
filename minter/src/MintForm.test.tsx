import React from 'react';
import { render, screen } from '@testing-library/react';
import MintForm from './MintForm';

test('renders learn react link', () => {
    render(<MintForm />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
