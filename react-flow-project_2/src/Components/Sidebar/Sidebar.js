import React from 'react';
import './Sidebar.css';

const nodeTypes = [
  { type: 'agent1', label: 'Agent1' },
  { type: 'agent2', label: 'Agent2' },
  { type: 'task1', label: 'Task1' },
  { type: 'task2', label: 'Task2' }
];

function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="sidebar">
      <h3>Nodes</h3>
      {nodeTypes.map((node) => (
        <div
          key={node.type}
          className="node-item"
          draggable
          onDragStart={(e) => onDragStart(e, node.type)}
        >
          {node.label}
        </div>
      ))}
    </div>
  );
}

export default Sidebar; 