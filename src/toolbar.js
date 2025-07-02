import { useStore } from "./store";
import {
  CommentNode,
  SliderNode,
  ImageNode,
  ConcatenateNode,
  ConditionNode,
} from "./nodes/demonstrationNodes";
import { DraggableNode } from "./draggableNode";

const nodeTypeMap = {
  comment: CommentNode,
  slider: SliderNode,
  imagePreview: ImageNode,
  concatenate: ConcatenateNode,
  condition: ConditionNode,
};

export const PipelineToolbar = ({
  selectedNode = null,
  onBack,
  style = {},
}) => {
  const ToolbarFields = () => {
    const nodeData = useStore(
      (state) => state.nodes.find((n) => n.id === selectedNode.id)?.data
    );
    if (!selectedNode) return null;
    const NodeComponent = nodeTypeMap[selectedNode.type];
    if (!NodeComponent || !NodeComponent.getToolbarFields) {
      return <div>No editable fields for this node.</div>;
    }

    return NodeComponent.getToolbarFields(selectedNode.id, nodeData);
  };

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "White",
        width: 256,
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.12)",
        overflowY: "auto",
        maxHeight: "100%",
        ...style,
      }}
    >
      <div
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {selectedNode ? (
          <>
            <button
              onClick={() => {
                if (onBack) onBack();
              }}
            >
              Back
            </button>

            <h2>Selected Node</h2>
            <ToolbarFields />
          </>
        ) : (
          <>
            <h2>Nodes</h2>
            <DraggableNode type="comment" label="Comment" />
            <DraggableNode type="concatenate" label="Concatenate" />
            <DraggableNode type="slider" label="Slider" />
            <DraggableNode type="condition" label="Condition" />
            <DraggableNode type="imagePreview" label="Image Preview" />
            {/* <DraggableNode type="enhancedText" label="Enhanced Text" /> */}
          </>
        )}
      </div>
    </div>
  );
};
