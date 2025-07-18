import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import './CustomNode.css';

const CustomNode = ({ data, type }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [nodeData, setNodeData] = useState(data.config || {});

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (key, value) => {
    setNodeData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getNodeConfig = () => {
    switch (data.nodeType) {
      case 'task1':
        return {
          title: 'Task 1',
          color: '#2196f3',
          defaultConfig: {
            'Input Type': 'Text',
            'Decision Points': 'Yes/No',
            'Timeout': '30s',
            'Priority': 'High'
          }
        };
      case 'task2':
        return {
          title: 'Task 2',
          color: '#2196f3',
          defaultConfig: {
            'Input Type': 'File',
            'Decision Points': 'Approve/Reject/Modify',
            'Timeout': '60s',
            'Priority': 'Medium'
          }
        };
      case 'agent1':
        return {
          title: 'Agent 1',
          color: '#9c27b0',
          defaultConfig: {
            'Capabilities': 'Text Processing',
            'Status': 'Active',
            'Response Time': '2s',
            'Memory': '512MB'
          }
        };
      case 'agent2':
        return {
          title: 'Agent 2',
          color: '#9c27b0',
          defaultConfig: {
            'Capabilities': 'Image Analysis',
            'Status': 'Active',
            'Response Time': '5s',
            'Memory': '1GB'
          }
        };
      case 'agent3':
        return {
          title: 'Agent 3',
          color: '#9c27b0',
          defaultConfig: {
            'Capabilities': 'Data Processing',
            'Status': 'Idle',
            'Response Time': '1s',
            'Memory': '256MB'
          }
        };
      default:
        return {
          title: 'Unknown Node',
          color: '#666',
          defaultConfig: {}
        };
    }
  };

  const nodeConfig = getNodeConfig();
  
  // Merge default config with current node data
  const currentConfig = { ...nodeConfig.defaultConfig, ...nodeData };

  const getInputType = (key, value) => {
    if (key === 'Status') {
      return 'select';
    }
    if (key === 'Priority') {
      return 'select';
    }
    if (key === 'Decision Points') {
      return 'text';
    }
    return 'text';
  };

  const getSelectOptions = (key) => {
    if (key === 'Status') {
      return ['Active', 'Idle', 'Offline'];
    }
    if (key === 'Priority') {
      return ['High', 'Medium', 'Low'];
    }
    return [];
  };

  const renderConfigInput = (key, value) => {
    const inputType = getInputType(key, value);
    
    if (inputType === 'select') {
      return (
        <select
          value={value || ''}
          onChange={(e) => handleInputChange(key, e.target.value)}
          className="config-input config-select"
        >
          {getSelectOptions(key).map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }
    
    return (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => handleInputChange(key, e.target.value)}
        className="config-input"
        placeholder={`Enter ${key.toLowerCase()}`}
      />
    );
  };

  return (
    <div className={`custom-node ${data.nodeType}`}>
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        className="custom-handle input-handle"
      />
      
      {/* Node Header */}
      <div 
        className="node-header"
        style={{ backgroundColor: nodeConfig.color }}
        onClick={toggleExpanded}
      >
        <span className="node-title">{nodeConfig.title}</span>
        <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
          ▼
        </span>
      </div>

      {/* Node Configuration View */}
      {isExpanded && (
        <div className="node-config">
          <h4>Configuration</h4>
          <div className="config-items">
            {Object.entries(currentConfig).map(([key, value]) => (
              <div key={key} className="config-item">
                <label className="config-key">{key}:</label>
                <div className="config-value">
                  {renderConfigInput(key, value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Right}
        className="custom-handle output-handle"
      />
    </div>
  );
};

export default CustomNode;