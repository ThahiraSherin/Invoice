import { UserProvider } from "./context/UserContext";
import ClientInfo from "./components/ClientInfo";
import LineItem from "./components/LineItem";
import TotalSummary from "./components/TotalSummary";
import ExportPDF from "./components/ExportPDF";
import { useRef } from "react";

const App = () => {
  const invoiceRef = useRef();

  return (
    <UserProvider>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Invoice Builder</h1>

        <div 
          ref={invoiceRef} 
          id="invoice" 
          className="bg-white p-4 shadow rounded"
          style={{ backgroundColor: '#ffffff', color: '#000000' }}
        >
          <ClientInfo />
          <LineItem />
          <TotalSummary />
        </div>

        <ExportPDF contentRef={invoiceRef} />
      </div>
    </UserProvider>
  );
};

export default App;
