// /frontend/src/nodes/BaseNode.js

import React, { useEffect } from "react";
import { Handle, useUpdateNodeInternals } from "reactflow";
import { useStore } from "../store";

export const BaseNode = ({ id, title, children, handles = [] }) => {
  const updateNodeInternals = useUpdateNodeInternals();

  const nodeStyle = {
    // m: 200,
    minHeight: 80,
    minWidth: 120,
    maxWidth: 300,
    border: "1px solid #aaa",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
  };

  const headerStyle = {
    padding: "8px",
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
    borderBottom: "1px solid #ddd",
    textAlign: "center",
  };

  const contentStyle = {
    padding: "10px",
    flexGrow: 1,
  };

  useEffect(() => {
    updateNodeInternals(id);
  }, [handles, updateNodeInternals, id]);

  useEffect(() => {
    const { handles: existingHandles, addHandle } = useStore.getState();
    const existingHandleIds = existingHandles.map((handle) => handle.id);

    handles.forEach((handle) => {
      if (!existingHandleIds.includes(handle.id)) {
        addHandle(handle);
      }
    });
  }, [handles]);

  return (
    <div style={nodeStyle}>
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}

      <div style={headerStyle}>{title}</div>

      <div style={contentStyle}>{children}</div>
    </div>
  );
};
