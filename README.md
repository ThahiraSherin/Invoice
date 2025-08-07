📄 Invoice Builder - React App
A simple and responsive invoice generation app built using React JS. It allows users to:

Enter client information

Add multiple line items

Auto-calculate subtotal, tax, and total

Export the invoice as a PDF using jsPDF and html2canvas

🔧 Tech Stack
React JS

TailwindCSS

React Hooks

jsPDF (jspdf)

html2canvas

📁 Project Structure
pgsql
Copy
Edit
src/
├── components/
│   ├── ClientInfo.jsx         # Client name, address, invoice number, date
│   ├── LineItem.jsx           # Add, update, delete line items
│   ├── TotalSummary.jsx       # Calculates subtotal, tax, total
│   └── ExportPDF.jsx          # Export invoice as PDF
├── context/
│   └── UserContext.jsx        # Global state using useReducer + Context API
├── App.jsx                    # Main app entry
└── index.css                  # TailwindCSS styles
🚀 How to Run the Project
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/invoice-builder.git
cd invoice-builder
2. Install Dependencies
bash
Copy
Edit
npm install
or

bash
Copy
Edit
yarn install
3. Run the App
bash
Copy
Edit
npm run dev
or

bash
Copy
Edit
yarn dev
Open http://localhost:5173/ in your browser (for Vite) or default port if using CRA.

📦 PDF Export Feature
This app uses:

html2canvas

jsPDF

to convert the DOM into a high-quality PDF.

✅ Install PDF Tools
bash
Copy
Edit
npm install jspdf html2canvas
Or yarn add jspdf html2canvas

🧠 Features
🧾 Enter Client Name, Address, Invoice Number, Date

➕ Add/Update/Delete items with description, quantity, rate

💰 Auto-calculated Subtotal, Tax (18%), and Grand Total

📄 Export invoice as printable/downloadable PDF

💾 Invoice data is stored in LocalStorage

📱 Fully responsive with TailwindCSS

✨ Example Invoice Flow
Fill in client info

Add line items like services or products

Edit quantities and rates as needed

Totals update automatically

Click "Export as PDF" to save/download

📌 Future Improvements (Optional Ideas)
Add logo upload

Add currency selector

Save multiple invoices

Email/share PDF

Dark mode

🙌 Author
Made with ❤️ using React & Tailwind by [Thahira Sherin]

