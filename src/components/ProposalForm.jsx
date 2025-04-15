import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Optional: for prop type validation

function ProposalForm({
  company,
  service,
  companies,
  services,
  isResearching,
  isAnalyzing,
  isGenerating,
  onCompanyChange,
  onServiceChange,
  onResearch,
  onAnalyze,
  onGenerate
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-[80px]"> {/* Adjust top offset based on header height */}
      <div className="mb-4">
        <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
          <span>← Back to Home</span>
        </Link>
      </div>
      <h2 className="text-xl font-bold mb-4">Configuration</h2>

      {/* Company Selection */}
      <div>
        <label className="block text-gray-700 mb-1 font-medium text-sm">Target Company</label>
        <select
          value={company}
          onChange={(e) => onCompanyChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="">Select a company</option>
          {companies.map(comp => (
            <option key={comp.id} value={comp.id}>{comp.name}</option>
          ))}
        </select>
      </div>

      {/* Service Selection */}
      <div className="mt-3"> {/* Added margin top */}
        <label className="block text-gray-700 mb-1 font-medium text-sm">Service Type</label>
        <select
          value={service}
          onChange={(e) => onServiceChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="">Select a service</option>
          {services.map(serv => (
            <option key={serv.id} value={serv.id}>{serv.name}</option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-3 mt-3"> {/* Added margin top */}
        <button
          onClick={onResearch}
          disabled={isResearching || !company || isAnalyzing || isGenerating} // Disable if busy or no company
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm"
        >
          {isResearching ? 'Researching...' : 'Real-time Research'}
        </button>

        <button
          onClick={onAnalyze}
          disabled={isAnalyzing || !company || isResearching || isGenerating} // Disable if busy or no company
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isAnalyzing ? 'Analyzing...' : 'Historical Analysis'}
        </button>
      </div>

      {/* Generate Proposal Button */}
      <div className="pt-4 mt-4 border-t border-gray-200">
        <button
          onClick={onGenerate}
          disabled={isGenerating || !company || !service || isResearching || isAnalyzing} // Disable if busy or missing selections
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isGenerating ? 'Generating Proposal...' : 'Generate Full Proposal'}
        </button>
      </div>
    </div>
  );
}

// Optional: Define prop types for better component usage understanding
ProposalForm.propTypes = {
  company: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  companies: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })).isRequired,
  services: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })).isRequired,
  isResearching: PropTypes.bool.isRequired,
  isAnalyzing: PropTypes.bool.isRequired,
  isGenerating: PropTypes.bool.isRequired,
  onCompanyChange: PropTypes.func.isRequired,
  onServiceChange: PropTypes.func.isRequired,
  onResearch: PropTypes.func.isRequired,
  onAnalyze: PropTypes.func.isRequired,
  onGenerate: PropTypes.func.isRequired,
};

export default ProposalForm;
