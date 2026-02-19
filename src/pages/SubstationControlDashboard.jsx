import React, { useState, useEffect } from 'react';

const SubstationControlDashboard = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch real-time data from SCADA Interface
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.scada.com/data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard">
            <h1>Substation Control Dashboard</h1>
            {error ? (
                <div className="error">{error}</div>
            ) : (
                <div className="data-display">
                    {data.map((item, index) => (
                        <div key={index} className="data-item">
                            <h2>{item.name}</h2>
                            <p>{item.value}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SubstationControlDashboard;