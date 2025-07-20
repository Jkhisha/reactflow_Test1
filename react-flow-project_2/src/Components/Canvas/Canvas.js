import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  addEdge, 
  Controls, 
  Background,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import './Canvas.css';

import Agent1 from '../Nodes/Agent1/Agent1';
import Agent2 from '../Nodes/Agent2/Agent2';
import Task1 from '../Nodes/Task1/Task1';
import Task2 from '../Nodes/Task2/Task2';

const nodeTypes = {
  agent1: Agent1,
  agent2: Agent2,
  task1: Task1,
  task2: Task2
};

function Canvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeId, setNodeId] = useState(1);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      const newNode = {
        id: `${type}-${nodeId}`,
        type,
        position,
        data: { 
          label: `${type} ${nodeId}`,
          name: '',
          value1: '',
          value2: '',
          value3: '',
          decisions: ['Decision 1']
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setNodeId((id) => id + 1);
    },
    [nodeId, setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div className="canvas">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default Canvas;