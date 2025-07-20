import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import './Agent2.css';

function Agent2({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: data.name || '',
    value1: data.value1 || '',
    value2: data.value2 || '',
    value3: data.value3 || ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="agent2-node">
      <Handle type="target" position={Position.Top} />
      
      <div 
        className="node-header"
        onClick={() => setExpanded(!expanded)}
      >
        Agent2 {expanded ? '▼' : '▶'}
      </div>
      
      {expanded && (
        <div className="node-content">
          <div className="input-group">
            <label>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Value 1:</label>
            <input
              type="text"
              value={formData.value1}
              onChange={(e) => handleInputChange('value1', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Value 2:</label>
            <input
              type="text"
              value={formData.value2}
              onChange={(e) => handleInputChange('value2', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Value 3:</label>
            <input
              type="text"
              value={formData.value3}
              onChange={(e) => handleInputChange('value3', e.target.value)}
            />
          </div>
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default Agent2;