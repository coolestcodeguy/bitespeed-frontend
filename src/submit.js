export const SubmitButton = ({ onPress, isLoading = false, style = {} }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "12px",
        ...style,
      }}
    >
      <button
        type="button"
        disabled={isLoading}
        style={{
          padding: "10px 20px",
          backgroundColor: isLoading ? "#ccc" : "#1C2536",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontSize: "24px",
          fontWeight: "500",
          cursor: isLoading ? "not-allowed" : "pointer",
          opacity: isLoading ? 0.6 : 1,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          transition: "background-color 0.2s ease, transform 0.2s ease",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundColor = "#2E3B52";
            e.currentTarget.style.transform = "translateY(-1px)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundColor = "#1C2536";
            e.currentTarget.style.transform = "translateY(0)";
          }
        }}
        onClick={onPress}
      >
        {isLoading ? (
          <>
            <span
              className="spinner"
              style={{
                width: "18px",
                height: "18px",
                border: "3px solid #fff",
                borderTop: "3px solid transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            Loading...
          </>
        ) : (
          "Save"
        )}
      </button>

      {/* Inline spinner CSS */}
      <style>
        {`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}
      </style>
    </div>
  );
};
