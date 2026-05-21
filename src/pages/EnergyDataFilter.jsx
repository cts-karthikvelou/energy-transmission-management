import React, { useState } from 'react';

const EnergyDataFilter = () => {
  const [region, setRegion] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = () => {
    // Placeholder for filtering logic
    const filtered = historicalEnergyData.filter(data => {
      return (
        (region === '' || data.region === region) &&
        (timeOfDay === '' || data.timeOfDay === timeOfDay)
      );
    });
    setFilteredData(filtered);
  };

  return (
    <div>
      <h2>Filter Historical Energy Data</h2>
      <div>
        <label>Region:</label>
        <input
          type="text"
          value={region}
          onChange={e => setRegion(e.target.value)}
        />
      </div>
      <div>
        <label>Time of Day:</label>
        <input
          type="text"
          value={timeOfDay}
          onChange={e => setTimeOfDay(e.target.value)}
        />
      </div>
      <button onClick={handleFilter}>Filter</button>
      <div>
        <h3>Filtered Data</h3>
        <ul>
          {filteredData.map((data, index) => (
            <li key={index}>
              {data.region} - {data.timeOfDay} - {data.energyUsage}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EnergyDataFilter;
