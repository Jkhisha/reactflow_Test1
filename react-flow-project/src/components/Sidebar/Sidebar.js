import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const components = [
    { id: 'task1', name: 'Task 1', type: 'task' },
    { id: 'task2', name: 'Task 2', type: 'task' },
    { id: 'agent1', name: 'Agent 1', type: 'agent' },
    { id: 'agent2', name: 'Agent 2', type: 'agent' },
    { id: 'agent3', name: 'Agent 3', type: 'agent' }
  ];

  const onDragStart = (event, component) => {
    event.dataTransfer.setData('application/reactflow', component.id);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="sidebar">
      <h3>Components</h3>
      <div className="components-list">
        {components.map((component) => (
          <div
            key={component.id}
            className={`component-item ${component.type}`}
            draggable
            onDragStart={(event) => onDragStart(event, component)}
          >
            <span className="component-name">{component.name}</span>
            <span className="component-type">{component.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;