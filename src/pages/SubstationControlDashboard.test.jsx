import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import SubstationControlDashboard from './SubstationControlDashboard';
import '@testing-library/jest-dom';

describe('SubstationControlDashboard', () => {
    it('renders the dashboard title', () => {
        const { getByText } = render(<SubstationControlDashboard />);
        expect(getByText('Substation Control Dashboard')).toBeInTheDocument();
    });

    it('fetches and displays data from SCADA Interface', async () => {
        const mockData = [
            { name: 'Temperature', value: '25°C' },
            { name: 'Voltage', value: '220V' },
        ];

        // Mock the fetch function
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockData),
            })
        );

        render(<SubstationControlDashboard />);

        // Wait for the data to be fetched and rendered
        await waitFor(() => {
            expect(screen.getByText('Temperature')).toBeInTheDocument();
            expect(screen.getByText('25°C')).toBeInTheDocument();
            expect(screen.getByText('Voltage')).toBeInTheDocument();
            expect(screen.getByText('220V')).toBeInTheDocument();
        });
    });

    it('handles errors when fetching data', async () => {
        // Mock the fetch function to return an error
        global.fetch = jest.fn(() =>
            Promise.reject(new Error('Failed to fetch data'))
        );

        render(<SubstationControlDashboard />);

        // Wait for the error message to be displayed
        await waitFor(() => {
            expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
        });
    });

    it('handles network errors when fetching data', async () => {
        // Mock the fetch function to return a non-ok response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
            })
        );

        render(<SubstationControlDashboard />);

        await waitFor(() => {
            expect(screen.getByText('Network response was not ok')).toBeInTheDocument();
        });
    });
});