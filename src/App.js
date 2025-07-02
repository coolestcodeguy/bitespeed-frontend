import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { useStore } from "./store";
import { useMutation } from "@tanstack/react-query";
import { AlertDialog } from "./components/alertDialog";
import { useState, useCallback } from "react";

function App() {
  // const { nodes, edges } = useStore();
  const [selectedNode, setSelectedNode] = useState(null);

  const dagQuery = useMutation({
    mutationFn: async (data) => {
      const { nodes, edges, getTargetHandleCount } = useStore.getState();
      if (nodes.length === 0) {
        return { message: "Add some nodes!" };
      } else if (nodes.length === 1) {
        return { message: "There is only 1 node so can save :)" };
      }

      if (getTargetHandleCount() !== edges.length) {
        return { message: "Connect all target handles of the nodes!" };
      }
      return { message: "saved successfully :) (not really lol)" };
    },
    onSuccess: (data) => {
      setAlertState({
        isAlertOpen: true,
        message: data.message,
      });
    },
    onError: (error) => {
      setAlertState({
        isAlertOpen: true,
        message: error.message,
      });
    },
  });

  const [alertState, setAlertState] = useState({
    isAlertOpen: false,
    message: "",
  });

  const handleNodeSelection = useCallback((node) => {
    setSelectedNode(node);
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <SubmitButton
        style={{ position: "absolute", bottom: 16, right: 16, zIndex: 10 }}
        isLoading={dagQuery.isPending}
        onPress={() => dagQuery.mutate()}
      />

      <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
        <PipelineUI onNodeSelect={handleNodeSelection} />
        <PipelineToolbar
          selectedNode={selectedNode}
          onBack={() => setSelectedNode(null)}
          style={{ width: 256, borderLeft: "1px solid #eee" }}
        />
      </div>

      <AlertDialog
        isOpen={alertState.isAlertOpen}
        onClose={() => setAlertState({ ...alertState, isAlertOpen: false })}
        title="Information"
        message={alertState.message}
        confirmText="Got it!"
      />
    </div>
  );
}

export default App;
