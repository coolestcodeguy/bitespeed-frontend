import React, { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./baseNode"; // Import our new abstraction
import ReactTextareaAutosize from "react-textarea-autosize";
import { useStore } from "../store";

const CommentNodeRenderer = ({ id, data }) => {
  const { getNodeField, updateNodeField } = useStore();
  return (
    <div style={{ width: "100%", height: "100%" }} className="nodrag">
      <ReactTextareaAutosize
        className="nodrag"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        style={{ borderWidth: 0, maxWidth: "100%" }}
        onChange={(e) => updateNodeField(id, "text", e.target.value)}
        value={
          getNodeField(id, "text") || "This is a comment node, no handles."
        }
      />
    </div>
  );
};

export const CommentNode = ({ id, data }) => {
  return (
    <BaseNode title="Comment">
      <CommentNodeRenderer id={id} data={data} />
    </BaseNode>
  );
};

CommentNode.getToolbarFields = (id, data) => {
  return <CommentNodeRenderer id={id} data={data} />;
};

export const ConcatenateNode = ({ id }) => (
  <BaseNode
    title="Concatenate Text"
    handles={[
      {
        type: "target",
        position: Position.Left,
        id: `${id}-str1`,
        style: { top: "35%" },
      },
      {
        type: "target",
        position: Position.Left,
        id: `${id}-str2`,
        style: { top: "65%" },
      },
      { type: "source", position: Position.Right, id: `${id}-output` },
    ]}
  >
    <div style={{ textAlign: "left", fontSize: "12px" }}>
      <div>Input A</div>
      <div style={{ marginTop: "15px" }}>Input B</div>
    </div>
  </BaseNode>
);

const SliderNodeRenderer = ({ id, data }) => {
  const { getNodeField, updateNodeField } = useStore();
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <input
        className="nodrag"
        type="range"
        min="0"
        max="100"
        value={getNodeField(id, "value") || 0}
        onChange={(e) => updateNodeField(id, "value", Number(e.target.value))}
      />
    </div>
  );
};

export const SliderNode = ({ id, data }) => {
  return (
    <BaseNode
      handles={[
        { type: "source", position: Position.Right, id: `${id}-value` }, // This is a source handle
      ]}
      title="Number Slider"
    >
      <SliderNodeRenderer id={id} data={data} />
    </BaseNode>
  );
};

SliderNode.getToolbarFields = (id, data) => {
  return <SliderNodeRenderer id={id} data={data} />;
};
export const ConditionNode = ({ id }) => (
  <BaseNode
    title="Condition: If/Else"
    handles={[
      { type: "target", position: Position.Left, id: `${id}-condition` },
      {
        type: "source",
        position: Position.Right,
        id: `${id}-true`,
        style: { top: "35%" },
      },
      {
        type: "source",
        position: Position.Right,
        id: `${id}-false`,
        style: { top: "65%" },
      },
    ]}
  >
    <div style={{ fontSize: "12px", textAlign: "right" }}>
      <div>True</div>
      <div style={{ marginTop: "15px" }}>False</div>
    </div>
  </BaseNode>
);

const ImageNodeRenderer = ({ id, data }) => {
  const { getNodeField, updateNodeField } = useStore();

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <input
        type="text"
        value={getNodeField(id, "imageUrl") || ""}
        onChange={(e) => updateNodeField(id, "imageUrl", e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
        placeholder="https://..."
      />
      {data.imageUrl && (
        <img
          src={data.imageUrl}
          alt="preview"
          style={{ width: "100%", borderRadius: "4px" }}
          onError={(e) => (e.target.style.display = "none")}
        />
      )}
    </div>
  );
};

export const ImageNode = ({ id, data }) => {
  const { updateNodeField } = useStore();

  return (
    <BaseNode
      handles={[
        {
          type: "source",
          position: Position.Right,
          id: `${id}-image-output`,
          style: { top: "35%" },
        },
      ]}
      title="Image Preview"
    >
      <ImageNodeRenderer id={id} data={data} />
    </BaseNode>
  );
};

ImageNode.getToolbarFields = (id, data) => {
  return <ImageNodeRenderer id={id} data={data} />;
};
