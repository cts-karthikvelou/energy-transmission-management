import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EnergyDataFilter from './EnergyDataFilter';

// Mock historical energy data
const historicalEnergyData = [
  { region: 'North', timeOfDay: 'Morning', energyUsage: 100 },
  { region: 'South', timeOfDay: 'Evening', energyUsage: 150 },
  { region: 'North', timeOfDay: 'Evening', energyUsage: 200 },
  { region: 'South', timeOfDay: 'Morning', energyUsage: 250 },
];

// Mock the EnergyDataFilter component to include the historical data
const MockEnergyDataFilter = () => {
  const [region, setRegion] = React.useState('');
  const [timeOfDay, setTimeOfDay] = React.useState('');
  const [filteredData, setFilteredData] = React.useState([]);

  const handleFilter = () => {
    const filtered = historicalEnergyData.filter(data => {
      return (
        (region === '' || data.region === region) &&
        (timeOfDay === '' || data.timeOfDay === timeOfDay)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <EnergyDataFilter
      region={region}
      setRegion={setRegion}
      timeOfDay={timeOfDay}
      setTimeOfDay={setTimeOfDay}
      filteredData={filteredData}
      setFilteredData={setFilteredData}
      handleFilter={handleFilter}
    />
  );
};

describe('EnergyDataFilter Component', () => {
  it('renders initial state', () => {
    render(<MockEnergyDataFilter />);
    expect(screen.getByText('Filter Historical Energy Data')).toBeInTheDocument();
    expect(screen.getByText('Region:')).toBeInTheDocument();
    expect(screen.getByText('Time of Day:')).toBeInTheDocument();
    expect(screen.getByText('Filtered Data')).toBeInTheDocument();
    expect(screen.queryByText('North - Morning - 100')).not.toBeInTheDocument();
  });

  it('filters data with valid inputs', () => {
    render(<MockEnergyDataFilter />);
    fireEvent.change(screen.getByLabelText('Region:'), { target: { value: 'North' } });
    fireEvent.change(screen.getByLabelText('Time of Day:'), { target: { value: 'Morning' } });
    fireEvent.click(screen.getByText('Filter'));
    expect(screen.getByText('North - Morning - 100')).toBeInTheDocument();
    expect(screen.getByText('South - Morning - 250')).not.toBeInTheDocument();
  });

  it('filters data with empty inputs', () => {
    render(<MockEnergyDataFilter />);
    fireEvent.click(screen.getByText('Filter'));
    expect(screen.getByText('North - Morning - 100')).toBeInTheDocument();
    expect(screen.getByText('South - Evening - 150')).toBeInTheDocument();
    expect(screen
