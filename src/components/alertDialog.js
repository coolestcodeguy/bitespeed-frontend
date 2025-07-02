import { useState, useEffect } from "react";

export const AlertDialog = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  onConfirm,
  showCancel = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to ensure the element is rendered before animation starts
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      // Wait for animation to complete before removing from DOM
      setTimeout(() => setShouldRender(false), 200);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `rgba(0, 0, 0, ${isVisible ? 0.5 : 0})`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    transition: "background-color 0.2s ease-in-out",
  };

  const dialogStyle = {
    minWidth: 320,
    maxWidth: 400,
    border: "1px solid #aaa",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    transform: `scale(${isVisible ? 1 : 0.9}) translateY(${
      isVisible ? 0 : -20
    }px)`,
    opacity: isVisible ? 1 : 0,
    transition: "all 0.2s ease-in-out",
  };

  const headerStyle = {
    padding: "12px 16px",
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
    borderBottom: "1px solid #ddd",
    textAlign: "center",
  };

  const contentStyle = {
    padding: "16px",
    color: "#333",
    lineHeight: "1.5",
  };

  const footerStyle = {
    padding: "12px 16px",
    display: "flex",
    justifyContent: "flex-end",
    gap: "8px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    borderBottomLeftRadius: "inherit",
    borderBottomRightRadius: "inherit",
  };

  const buttonStyle = {
    padding: "8px 16px",
    border: "1px solid #aaa",
    borderRadius: "4px",
    backgroundColor: "white",
    color: "#333",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.15s ease-in-out",
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#333",
    color: "white",
    border: "1px solid #333",
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 200);
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    handleClose();
  };

  return (
    <div style={overlayStyle} onClick={handleClose}>
      <div style={dialogStyle} onClick={(e) => e.stopPropagation()}>
        <div style={headerStyle}>{title}</div>
        <div style={contentStyle}>{message}</div>
        <div style={footerStyle}>
          {showCancel && (
            <button
              style={buttonStyle}
              onClick={handleClose}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#f0f0f0";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.transform = "translateY(0)";
              }}
            >
              {cancelText}
            </button>
          )}
          <button
            style={primaryButtonStyle}
            onClick={handleConfirm}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#555";
              e.target.style.transform = "translateY(-1px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#333";
              e.target.style.transform = "translateY(0)";
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
