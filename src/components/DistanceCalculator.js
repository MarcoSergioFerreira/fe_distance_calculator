import React, { useState } from 'react';
import api from '../api/config';
import './DistanceCalculator.css';

const DistanceCalculator = () => {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [formattedFrom, setFormattedFrom] = useState('');
  const [formattedTo, setFormattedTo] = useState('');
  const [distance, setDistance] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const response = await api.post('/api/calculate-distance/', {
        origin: fromAddress,
        destination: toAddress
      });

      // Update state with the formatted addresses and distance
      setFormattedFrom(response.data.origin.formatted_address);
      setFormattedTo(response.data.destination.formatted_address);
      setDistance(response.data.distance_km);
    } catch (err) {
      if (err.response) {
        // Server responded with an error
        setError(err.response.data.message || 'Error calculating distance. Please try again.');
      } else if (err.request) {
        // Request was made but no response received
        setError('Unable to connect to the server. Please check your connection and try again.');
      } else {
        // Something else happened
        setError('An unexpected error occurred. Please try again.');
      }
      console.error('Error details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDistance = (distance) => {
    const km = distance.toFixed(2);
    const miles = (distance * 0.621371).toFixed(2);
    return { km, miles };
  };

  return (
    <div className="distance-calculator">
      <div className="calculator-header">
        <h1>Distance Calculator</h1>
        <p className="subtitle">Calculate the distance between any two locations</p>
      </div>
      
      <form onSubmit={handleSubmit} className="calculator-form">
        <div className="input-group">
          <label htmlFor="from-address">
            <span className="label-icon">📍</span>
            Starting Location
          </label>
          <input
            id="from-address"
            type="text"
            value={fromAddress}
            onChange={(e) => setFromAddress(e.target.value)}
            placeholder="e.g., Beverly Centre, Los Angeles"
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="to-address">
            <span className="label-icon">🏁</span>
            Destination
          </label>
          <input
            id="to-address"
            type="text"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            placeholder="e.g., Hollywood Walk of Fame"
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="loading-spinner">Calculating...</span>
          ) : (
            'Calculate Distance'
          )}
        </button>
      </form>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {(formattedFrom || formattedTo || distance) && (
        <div className="results-container">
          <h2>Results</h2>
          <div className="results">
            {formattedFrom && (
              <div className="result-item">
                <div className="result-label">Starting Point</div>
                <div className="result-value">{formattedFrom}</div>
              </div>
            )}
            {formattedTo && (
              <div className="result-item">
                <div className="result-label">Destination</div>
                <div className="result-value">{formattedTo}</div>
              </div>
            )}
            {distance && (
              <div className="result-item distance">
                <div className="distance-header">
                  <span className="distance-icon">📏</span>
                  <h3>Distance Between Locations</h3>
                </div>
                <div className="distance-values">
                  <div className="distance-unit">
                    <span className="unit-value">{formatDistance(distance).km}</span>
                    <span className="unit-label">kilometers</span>
                  </div>
                  <div className="distance-unit">
                    <span className="unit-value">{formatDistance(distance).miles}</span>
                    <span className="unit-label">miles</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DistanceCalculator; 