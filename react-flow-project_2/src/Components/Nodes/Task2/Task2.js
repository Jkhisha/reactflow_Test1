import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import './Task2.css';

function Task2({ data }) {
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: data.name || 'Task2',
    value1: data.value1 || '',
    value2: data.value2 || ''
  });
  const [decisions, setDecisions] = useState(data.decisions || [
    { name: 'Decision 1', remark: '' }
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addDecision = () => {
    setDecisions(prev => [...prev, { 
      name: `Decision ${prev.length + 1}`, 
      remark: '' 
    }]);
  };

  const updateDecision = (index, field, value) => {
    setDecisions(prev => 
      prev.map((decision, i) => 
        i === index ? { ...decision, [field]: value } : decision
      )
    );
  };

  const removeDecision = (index) => {
    if (decisions.length > 1) {
      setDecisions(prev => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="task2-node">
      <Handle type="target" position={Position.Top} />
      
      <div 
        className="node-header"
        onClick={() => setExpanded(!expanded)}
      >
        {formData.name} {expanded ? '▼' : '▶'}
      </div>
      
      {!expanded ? (
        // Collapsed View - Show decisions with handles
        <div className="collapsed-content">
          <div className="decisions-simple">
            {decisions.map((decision, index) => (
              <div key={index} className="decision-simple">
                <span className="decision-name">{decision.name}</span>
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`decision-${index}`}
                  style={{ 
                    right: '-8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#FF5722'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Expanded View - Full editing interface
        <div className="expanded-content">
          {/* Configuration Window */}
          <div className="window">
            <h4>Configuration</h4>
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

          {/* Decisions Window */}
          <div className="window">
            <div className="decisions-header">
              <h4>Decisions</h4>
              <button onClick={addDecision} className="add-button">+</button>
            </div>
            <div className="decisions-list">
              {decisions.map((decision, index) => (
                <div key={index} className="decision-expanded">
                  <div className="input-group">
                    <label>Decision Name:</label>
                    <input
                      type="text"
                      value={decision.name}
                      onChange={(e) => updateDecision(index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Remark:</label>
                    <input
                      type="text"
                      value={decision.remark}
                      onChange={(e) => updateDecision(index, 'remark', e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => removeDecision(index)}
                    className="remove-button"
                  >
                    Remove Decision
                  </button>
                  <Handle
                    type="source"
                    position={Position.Right}
                    id={`decision-${index}`}
                    style={{ 
                      right: '-8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: '#FF5722'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task2;