import { useContext } from 'react';
import UserContext from '../context/UserContext';

const labelStyle = {
  fontSize: '14px',
  fontWeight: '600',
  marginBottom: '4px',
  color: '#374151', // text-gray-700
};

const inputStyle = {
  border: '1px solid #ccc',
  padding: '8px',
  borderRadius: '4px',
  fontSize: '14px',
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '16px',
};

const wrapperStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '16px',
  marginBottom: '20px',
};

const responsiveWrapperStyle = {
  ...wrapperStyle,
  '@media(min-width: 768px)': {
    gridTemplateColumns: '1fr 1fr',
  },
};

const ClientInfo = () => {
  const { state, dispatch } = useContext(UserContext);

  return (
    <div style={wrapperStyle}>
      <div style={fieldStyle}>
        <label htmlFor="clientName" style={labelStyle}>
          Client Name
        </label>
        <input
          id="clientName"
          name="clientName"
          type="text"
          autoComplete="name"
          placeholder="Client Name"
          value={state.name}
          onChange={(e) =>
            dispatch({ type: 'SET_NAME', payload: e.target.value })
          }
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="address" style={labelStyle}>
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          autoComplete="street-address"
          placeholder="Address"
          value={state.address}
          onChange={(e) =>
            dispatch({ type: 'SET_ADDRESS', payload: e.target.value })
          }
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="invoiceNumber" style={labelStyle}>
          Invoice Number
        </label>
        <input
          id="invoiceNumber"
          name="invoiceNumber"
          type="text"
          autoComplete="off"
          placeholder="Invoice Number"
          value={state.invoiceNumber}
          onChange={(e) =>
            dispatch({ type: 'SET_INVOICENUMBER', payload: e.target.value })
          }
          style={inputStyle}
        />
      </div>

      <div style={fieldStyle}>
        <label htmlFor="invoiceDate" style={labelStyle}>
          Date
        </label>
        <input
          id="invoiceDate"
          name="invoiceDate"
          type="date"
          autoComplete="off"
          value={state.date}
          onChange={(e) =>
            dispatch({ type: 'SET_DATE', payload: e.target.value })
          }
          style={inputStyle}
        />
      </div>
    </div>
  );
};

export default ClientInfo;
