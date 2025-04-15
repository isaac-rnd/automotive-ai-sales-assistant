import React from 'react';
import PropTypes from 'prop-types';
import { generatePDF } from '../services/pdfService'; // Import PDF service

function GeneratedProposalDisplay({
  proposal,
  isGenerating,
  companyName,
  serviceName,
  companyId,
  serviceId
}) {

  // --- Handlers specific to this component ---
  const copyToClipboard = () => {
    if (!proposal) return;
    navigator.clipboard.writeText(proposal)
      .then(() => alert('Proposal copied to clipboard'))
      .catch(err => {
          console.error('Failed to copy: ', err);
          alert('Failed to copy proposal.');
      });
  };

  const downloadPdf = () => {
    if (!proposal || !companyName || !serviceName) {
        alert('Cannot generate PDF. Proposal data is missing.');
        return;
    }
    try {
        generatePDF(proposal, companyName, serviceName);
    } catch (error) {
        alert('Failed to generate PDF. See console for details.');
        console.error("PDF Generation Error:", error);
    }
  };

  // --- Conditional Rendering Logic ---

  // Show the actual proposal
  if (proposal && !isGenerating) {
    return (
      <div className="bg-white p-4 shadow rounded w-full"> {/* Ensure full width */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">Generated Proposal</h3>
          <div className="space-x-2">
            <button
              onClick={copyToClipboard}
              className="bg-gray-500 hover:bg-gray-600 text-white py-1 px-3 rounded text-xs"
            >
              Copy Text
            </button>
            <button
              onClick={downloadPdf}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xs"
            >
              Download PDF
            </button>
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded border border-gray-200 whitespace-pre-line text-sm max-h-96 overflow-y-auto">
          {proposal}
        </div>
      </div>
    );
  }

  // Show loading state
  if (isGenerating) {
    return (
      <div className="bg-white p-4 shadow rounded mt-6 min-h-[100px] flex items-center justify-center w-full">
        <p className="text-gray-500 text-sm">Generating proposal document...</p>
      </div>
    );
  }

  // Show placeholder if company/service selected but no proposal yet
  if (!proposal && !isGenerating && companyId && serviceId) {
    return (
      <div className="bg-white p-4 shadow rounded mt-6 min-h-[100px] flex items-center justify-center w-full">
        <p className="text-gray-400 text-sm">Click 'Generate Full Proposal' in the configuration panel to create the document.</p>
      </div>
    );
  }

  // Render nothing if no proposal is expected yet (e.g., company/service not selected)
  return null;
}

GeneratedProposalDisplay.propTypes = {
  proposal: PropTypes.string.isRequired,
  isGenerating: PropTypes.bool.isRequired,
  companyName: PropTypes.string.isRequired,
  serviceName: PropTypes.string.isRequired,
  companyId: PropTypes.string.isRequired,
  serviceId: PropTypes.string.isRequired,
};

export default GeneratedProposalDisplay;
