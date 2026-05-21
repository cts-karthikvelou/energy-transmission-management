import React, { useState } from 'react';

const EquipmentControlLogic = () => {
  const [equipmentStatus, setEquipmentStatus] = useState('off');

  const toggleEquipment = () => {
    setEquipmentStatus(equipmentStatus === 'off'? 'on' : 'off');
  };

  return (
    <div>
      <h1>Equipment Control Logic</h1>
      <p>Current Status: {equipmentStatus}</p>
      <button onClick={toggleEquipment}>
        Toggle Equipment
      </button>
    </div>
  );
};

export default EquipmentControlLogic;
