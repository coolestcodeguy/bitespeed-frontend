import React, { useState, useEffect } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./baseNode";
import { AutoTextArea } from "react-textarea-auto-witdth-height";

export const EnhancedTextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "Hello, {{name}}!");
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    const variableRegex = /{{\s*([a-zA-Z0-9_]+)\s*}}/g;
    const matches = [...currText.matchAll(variableRegex)];
    const uniqueVariables = new Set(matches.map((match) => match[1]));
    setVariables(Array.from(uniqueVariables));
  }, [currText]);

  const inputHandles = variables.map((variable, index) => ({
    type: "target",
    position: Position.Left,
    id: `${id}-var-${variable}`,
    style: { top: `${((index + 1) * 100) / (variables.length + 1)}%` },
  }));

  const outputHandle = {
    type: "source",
    position: Position.Right,
    id: `${id}-output`,
  };

  const allHandles = [...inputHandles, outputHandle];

  return (
    <BaseNode id={id} title="Text" handles={allHandles}>
      <AutoTextArea
        className="nodrag"
        onChange={(e) => setCurrText(e.target.value)}
        value={currText}
        style={{
          minWidth: 60,
          maxWidth: "100%",
          borderWidth: 2,
        }}
      />
    </BaseNode>
  );
};
