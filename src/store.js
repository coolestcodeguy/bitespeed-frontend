// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  handles: [],
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges
      ),
    });
  },
  getNodeField: (nodeId, fieldName) => {
    const node = get().nodes.find((node) => node.id === nodeId);
    return node?.data?.[fieldName];
  },
  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set((state) => {
      const nodes = state.nodes.map((node) => {
        if (node.id === nodeId) {
          if (node.data?.[fieldName] === fieldValue) return node; // No change
          return { ...node, data: { ...node.data, [fieldName]: fieldValue } };
        }
        return node;
      });
      return { nodes };
    });
  },
  getHandleCount: () => {
    return get().handles.length;
  },
  getHandles: () => {
    return get().handles;
  },
  addHandle: (handle) => {
    console.log("Adding handle:", handle);
    set({ handles: [...get().handles, handle] });
  },
  getTargetHandleCount: () => {
    return get().handles.filter((handle) => handle.type === "target").length;
  },
}));
