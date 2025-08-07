import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const LineItem = () => {
  const { state, dispatch } = useContext(UserContext);

  const updateItem = (index, field, value) => {
    dispatch({
      type: "UPDATE_ITEM",
      payload: { index, field, value }
    });
  };

  const buttonStyle = {
    backgroundColor: "#3B82F6", // blue-500
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "12px"
  };

  const gridHeaderStyle = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 0.5fr",
    gap: "8px",
    fontWeight: "600",
    borderBottom: "1px solid #ccc",
    paddingBottom: "6px",
    marginBottom: "8px"
  };

  const gridRowStyle = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 0.5fr",
    gap: "8px",
    alignItems: "center",
    marginBottom: "8px"
  };

  const inputStyle = {
    border: "1px solid #ccc",
    padding: "6px",
    fontSize: "14px",
    borderRadius: "4px"
  };

  const amountBoxStyle = {
    border: "1px solid #ccc",
    padding: "6px",
    fontWeight: "bold",
    fontSize: "14px"
  };

  const deleteButtonStyle = {
    color: "red",
    background: "grey",
    padding: "6px",
    border: "2px solid black",
    fontSize: "14px",
    cursor: "pointer"
  };

  return (
    <div>
      <button
        onClick={() => dispatch({ type: "ADD_ITEM" })}
        style={buttonStyle}
      >
        Add Item
      </button>

      {state.items.length > 0 && (
        <div style={gridHeaderStyle}>
          <div>Description</div>
          <div>Quantity</div>
          <div>Rate</div>
          <div>Amount</div>
          <div></div>
        </div>
      )}

      {Array.isArray(state.items) &&
        state.items.map((item, index) => (
          <div key={index} style={gridRowStyle}>
            <input
              type="text"
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                updateItem(index, "description", e.target.value)
              }
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) =>
                updateItem(index, "quantity", Number(e.target.value))
              }
              style={inputStyle}
            />
            <input
              type="number"
              value={item.rate}
              onChange={(e) =>
                updateItem(index, "rate", Number(e.target.value))
              }
              style={inputStyle}
            />
            <div style={amountBoxStyle}>
              ₹{(item.quantity * item.rate).toFixed(2)}
            </div>
            <button
              onClick={() =>
                dispatch({ type: "DELETE_ITEM", payload: index })
              }
              style={deleteButtonStyle}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default LineItem;
