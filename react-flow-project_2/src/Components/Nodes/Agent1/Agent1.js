import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import './Agent1.css';

function Agent1({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: data.name || '',
    value1: data.value1 || '',
    value2: data.value2 || ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="agent1-node">
      <Handle
        type="target"
        position={Position.Left}
        style={{ 
            width: '15px',
            height: '15px',
            background: 'blue'
        }}
        />
      
      <div 
        className="node-header"
        onClick={() => setExpanded(!expanded)}
      >
        Agent1 {expanded ? '▼' : '▶'}
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
        </div>
      )}
      
      <Handle
        type="source"
        position={Position.Right}
        style={{ 
            width: '15px',
            height: '15px',
            background: '#FF5722'
        }}
        />
    </div>
  );
}

export default Agent1;