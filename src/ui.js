import { useRef, useState, useCallback } from "react";
import ReactFlow, { Controls, Background } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

import "reactflow/dist/style.css";
import {
  CommentNode,
  ConcatenateNode,
  ConditionNode,
  ImageNode,
  SliderNode,
} from "./nodes/demonstrationNodes";
import { EnhancedTextNode } from "./nodes/enhancedTextNode";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  comment: CommentNode,
  concatenate: ConcatenateNode,
  slider: SliderNode,
  condition: ConditionNode,
  imagePreview: ImageNode,
  enhancedText: EnhancedTextNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = ({ onNodeSelect }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: `${type}`,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const appData = JSON.parse(
        event.dataTransfer.getData("application/reactflow")
      );
      const type = appData?.nodeType;

      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      };

      addNode(newNode);
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const handleNodeClick = useCallback(
    (event, node) => {
      onNodeSelect(node);
    },
    [onNodeSelect]
  );

  return (
    <div ref={reactFlowWrapper} style={{ height: "100vh", flex: 1 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        onNodeClick={handleNodeClick}
        onPaneClick={() => onNodeSelect(null)}
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
      </ReactFlow>
    </div>
  );
};
