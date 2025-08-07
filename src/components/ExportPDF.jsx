import html2pdf from "html2pdf.js";
import { useState } from 'react';

const ExportPDF = ({ contentRef }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);

  const generateStyles = () => `
    /* Reset and basics */
    #invoice-for-pdf {
      font-family: Arial, sans-serif !important;
      background-color: #ffffff !important;
      color: #1a202c !important;
      padding: 40px !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 10px !important;
      max-width: 900px !important;
      width: 100% !important;
      margin: 0 auto !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      position: relative !important;
    }

    /* Invoice Heading */
    #invoice-for-pdf::before {
      content: 'INVOICE' !important;
      display: block !important;
      text-align: center !important;
      font-size: 28px !important;
      font-weight: bold !important;
      color: #1a202c !important;
      margin-top: -20px !important;
      margin-bottom: 20px !important;
      padding-bottom: 8px !important;
      border-bottom: 2px solid #e2e8f0 !important;
      text-transform: uppercase !important;
      letter-spacing: 2px !important;
    }

    #invoice-for-pdf * {
      box-sizing: border-box !important;
      color: #1a202c !important;
      font-family: Arial, sans-serif !important;
    }

    /* Remove all buttons */
    #invoice-for-pdf button,
    #invoice-for-pdf .delete-btn,
    #invoice-for-pdf .add-item-btn {
      display: none !important;
    }

    /* Client Info Section */
    #invoice-for-pdf > div:first-child {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 20px !important;
      margin-bottom: 30px !important;
    }

    #invoice-for-pdf input {
      width: 100% !important;
      min-height: 24px !important;
      font-size: 14px !important;
      padding: 2px 8px !important;
      border: none !important;
      background: transparent !important;
      color: #1a202c !important;
    }

    #invoice-for-pdf label {
      display: block !important;
      font-weight: 600 !important;
      margin-bottom: 4px !important;
      color: #4a5568 !important;
    }

    /* Table styling */
    #invoice-for-pdf table {
      width: 100% !important;
      border-collapse: collapse !important;
      margin: 20px 0 !important;
      font-size: 14px !important;
    }

    #invoice-for-pdf th,
    #invoice-for-pdf td {
      border: 1px solid #e2e8f0 !important;
      padding: 12px 16px !important;
      font: bold 14px Arial, sans-serif !important;
      text-align: left !important;
    }

    #invoice-for-pdf th {
      background-color: #f8fafc !important;
      color: #1a202c !important;
      font-weight: 600 !important;
    }

    /* Amount columns right-aligned */
    #invoice-for-pdf td:last-child,
    #invoice-for-pdf th:last-child {
      text-align: right !important;
    }

    /* Totals section */
    #invoice-for-pdf .total-section {
      margin-top: 30px !important;
      padding: 20px !important;
      background-color: #f8fafc !important;
      border-radius: 8px !important;
    }

    #invoice-for-pdf .total-section > div {
      display: flex !important;
      justify-content: flex-end !important;
      gap: 20px !important;
      margin-bottom: 8px !important;
      font-size: 14px !important;
    }

    #invoice-for-pdf .total-section > div:last-child {
      margin-top: 12px !important;
      padding-top: 12px !important;
      border-top: 2px solid #e2e8f0 !important;
      font-weight: bold !important;
      font-size: 16px !important;
    }
  `;

  const handlePreview = () => {
    const element = contentRef.current;
    if (!element) {
      alert("Invoice not found!");
      return;
    }
    
    // Create preview content
    const clone = element.cloneNode(true);
    const wrapper = document.createElement('div');
    wrapper.id = 'invoice-for-pdf';
    wrapper.appendChild(clone);

    // Add styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = generateStyles();
    wrapper.prepend(styleSheet);
    
    setPreviewContent(wrapper);
    setShowPreview(true);
  };

  const handleDownload = async () => {
    try {
      setIsExporting(true);
      const element = contentRef.current;

      if (!element) {
        throw new Error("Invoice element not found!");
      }

      console.log("📄 Export triggered", element);

      // Clone the content so original DOM remains untouched
      const clone = element.cloneNode(true);

      // Wrap with PDF-specific container
      const wrapper = document.createElement('div');
      wrapper.id = 'invoice-for-pdf';
      wrapper.appendChild(clone);

      // Add PDF-specific styles
      const styleSheet = document.createElement('style');
      styleSheet.textContent = generateStyles() + `
  /* Additional PDF-specific styles */
  #invoice-for-pdf {
    position: relative !important;
  }

  /* Client Info Section */
  #invoice-for-pdf > div:first-child {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 20px !important;
    margin-bottom: 30px !important;
  }

  #invoice-for-pdf input {
    width: 100% !important;
    height: 32px !important;
    font-size: 14px !important;
    padding: 2px 8px !important;
    margin: 2px 0 !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 4px !important;
    background-color: #f8fafc !important;
    color: #1a202c !important;
    line-height: 1.2 !important;
  }

  #invoice-for-pdf label {
    display: block !important;
    font-weight: 600 !important;
    margin-bottom: 4px !important;
    color: #4a5568 !important;
  }

  /* Additional heading styles for PDF */
  #invoice-for-pdf::before {
    margin-top: -20px !important;
    margin-bottom: 20px !important;
    font-family: Arial, sans-serif !important;
  }

  /* Table styling */
  #invoice-for-pdf table {
    width: 100% !important;
    border-collapse: collapse !important;
    margin: 20px 0 !important;
    font-size: 14px !important;
  }

  #invoice-for-pdf th,
  #invoice-for-pdf td {
    border: 1px solid #e2e8f0 !important;
    padding: 12px 16px !important;
    text-align: left !important;
    vertical-align: middle !important;
  }

  #invoice-for-pdf th {
    background-color: #f8fafc !important;
    color: #1a202c !important;
    font-weight: 600 !important;
    white-space: nowrap !important;
  }

  #invoice-for-pdf td {
    color: #1a202c !important;
    background-color: #ffffff !important;
  }

  /* Ensure amounts are right-aligned */
  #invoice-for-pdf td:last-child,
  #invoice-for-pdf th:last-child {
    text-align: right !important;
  }

  /* Hide delete buttons and add item button */
  #invoice-for-pdf .delete-btn,
  #invoice-for-pdf button:not(.export-btn) {
    display: none !important;
  }

  /* Totals section */
  #invoice-for-pdf .total-section {
    margin-top: 30px !important;
    padding: 20px !important;
    background-color: #f8fafc !important;
    border-radius: 8px !important;
  }

  #invoice-for-pdf .total-section > div {
    display: flex !important;
    justify-content: flex-end !important;
    gap: 20px !important;
    margin-bottom: 8px !important;
    font-size: 14px !important;
  }

  #invoice-for-pdf .total-section > div:last-child {
    margin-top: 12px !important;
    padding-top: 12px !important;
    border-top: 2px solid #e2e8f0 !important;
    font-weight: bold !important;
    font-size: 16px !important;
  }

  /* Delete button styling */
  #invoice-for-pdf .delete-btn {
    display: inline-block !important;
    padding: 4px 8px !important;
    font-size: 11px !important;
    background-color: #ef4444 !important; /* red-500 */
    color: white !important;
    border: none !important;
    border-radius: 4px !important;
    text-align: center !important;
    cursor: default !important;
  }

  #invoice-for-pdf .delete-btn::before {
    content: "🗑️ " !important;
  }

  /* Avoid any weird background */
  #invoice-for-pdf * {
    color: #1a202c !important;
    background: transparent !important;
  }

  /* Preview specific styles */
  .preview-container {
    background: white !important;
    padding: 2rem !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
  }

  .preview-container #invoice-for-pdf {
    transform: scale(0.9) !important;
    transform-origin: top center !important;
  }
`;

      document.head.appendChild(styleSheet);
      document.body.appendChild(wrapper);

      // PDF options
      const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `invoice_${Date.now()}.pdf`,
        image: { type: "jpeg", quality: 1.0 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
        },
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait"
        }
      };

      // Generate and save PDF
      await html2pdf().set(options).from(wrapper).save();
    } catch (error) {
      console.error("❌ Error generating PDF:", error);
      alert("Something went wrong while generating the PDF.");
    } finally {
      // Cleanup
      const elements = document.querySelectorAll('#invoice-for-pdf, style');
      elements.forEach(el => el.parentNode?.removeChild(el));
      setIsExporting(false);
    }
  };

  return (
    <>
      {!showPreview ? (
        <div className="text-right my-4">
          <button
            onClick={handlePreview}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Preview Invoice
          </button>
        </div>
      ) : (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Preview content */}
            <div className="preview-wrapper p-4" style={{ background: '#f8fafc' }} dangerouslySetInnerHTML={{ __html: previewContent?.outerHTML }} />
            
            {/* Action buttons */}
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setShowPreview(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Close Preview
              </button>
              <button
                onClick={handleDownload}
                disabled={isExporting}
                className={`px-4 py-2 rounded ${
                  isExporting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white`}
              >
                {isExporting ? "Generating PDF..." : "Download PDF"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExportPDF;
