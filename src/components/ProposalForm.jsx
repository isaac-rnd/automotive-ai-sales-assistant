import React from 'react';
import { COMPANIES, SERVICES } from '../utils/constants';

function ProposalForm({ 
  company, 
  setCompany, 
  service, 
  setService, 
  onGenerate, 
  onResearch, 
  onAnalyze, 
  isGenerating, 
  isResearching, 
  isAnalyzing 
}) {
  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Generate AI Proposal</h2>
      
      {/* Company Selection */}
      <div>
        <label className="block text-gray-700 mb-2 font-medium">Target Company</label>
        <select 
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a company</option>
          {COMPANIES.map(comp => (
            <option key={comp.id} value={comp.id}>{comp.name}</option>
          ))}
        </select>
      </div>
      
      {/* Service Selection */}
      <div>
        <label className="block text-gray-700 mb-2 font-medium">Service Type</label>
        <select 
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a service</option>
          {SERVICES.map(serv => (
            <option key={serv.id} value={serv.id}>{serv.name}</option>
          ))}
        </select>
      </div>
      
      {/* Additional Research Options */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={onResearch}
          disabled={isResearching || !company}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg disabled:bg-gray-400 flex items-center"
        >
          {isResearching ? 'Researching...' : 'Real-time Research'}
        </button>
        
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing || !company}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg disabled:bg-gray-400"
        >
          {isAnalyzing ? 'Analyzing...' : 'Historical Analysis'}
        </button>
      </div>
      
      {/* Generate Button */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={onGenerate}
          disabled={isGenerating || !company || !service}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-400"
        >
          {isGenerating ? 'Generating...' : 'Generate Proposal'}
        </button>
      </div>
    </div>
  );
}

export default ProposalForm;