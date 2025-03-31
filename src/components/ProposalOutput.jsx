import React from 'react';
import { generatePDF } from '../services/pdfService';

function ProposalOutput({ proposal, company, service }) {
  // Function to copy proposal to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(proposal)
      .then(() => alert('Proposal copied to clipboard'))
      .catch(err => console.error('Failed to copy: ', err));
  };
  
  // Function to download proposal as PDF
  const downloadPdf = () => {
    generatePDF(proposal, company, service);
  };
  
  if (!proposal) return null;
  
  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <h3 className="text-xl font-bold">Generated Proposal</h3>
        <div className="space-x-3">
          <button
            onClick={copyToClipboard}
            className="bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded"
          >
            Copy
          </button>
          <button
            onClick={downloadPdf}
            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
          >
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 whitespace-pre-line">
        {proposal}
      </div>
    </div>
  );
}

export default ProposalOutput;