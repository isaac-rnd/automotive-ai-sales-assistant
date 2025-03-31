import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../src/msg.png'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proposal" element={<ProposalGenerator />} />
      </Routes>
    </Router>
  );
}


function Header() {
  return (
    <header className="sticky top-0 bg-blue-500 text-white p-4 shadow-md flex items-center justify-between">
    <div className="flex items-center">
      <img src={logo} alt="Logo" className="h-12 w-20 mr-4" /> {/* Removed bg-white and rounded-full */}
    </div>
    <h1 className="text-2xl font-bold text-center flex-grow">AI Sales Assistant</h1>
    <div className="font-semibold text-lg text-yellow-300 italic">
      BTS for Automotive - India
    </div>
  </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
      <p>Made with love ❤️ for Automotive Camps</p>
    </footer>
  );
}

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-100 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full"> {/* Grid for side-by-side layout */}
          {/* AI Proposal Generator Block */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-6">AI Proposal Generator</h2>
            <p className="mb-8 text-gray-600">Generate tailored proposals for automotive companies using advanced AI</p>
            <button
              onClick={() => navigate('/proposal')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Create New Proposal
            </button>
          </div>

          {/* AI Market Analysis Block (Disabled) */}
          <div className="bg-gray-200 rounded-lg shadow-lg p-8 text-center opacity-50 cursor-not-allowed">
            <h2 className="text-2xl font-bold mb-6">AI Market Analysis</h2>
            <p className="mb-8 text-gray-600">Analyze market trends and competitor strategies using AI.</p>
            <button
              disabled
              className="bg-gray-400 text-white font-bold py-3 px-6 rounded-lg"
            >
              Coming Soon
            </button>
          </div>

          {/* AI Customer Insights Block (Disabled) */}
          <div className="bg-gray-200 rounded-lg shadow-lg p-8 text-center opacity-50 cursor-not-allowed">
            <h2 className="text-2xl font-bold mb-6">AI Customer Insights</h2>
            <p className="mb-8 text-gray-600">Gain deep insights into customer behavior and preferences.</p>
            <button
              disabled
              className="bg-gray-400 text-white font-bold py-3 px-6 rounded-lg"
            >
              Under Development
            </button>
          </div>

          {/* AI Lead Generation Block (Disabled) */}
          <div className="bg-gray-200 rounded-lg shadow-lg p-8 text-center opacity-50 cursor-not-allowed">
            <h2 className="text-2xl font-bold mb-6">AI Lead Generation</h2>
            <p className="mb-8 text-gray-600">Identify and qualify potential leads using AI-driven algorithms.</p>
            <button
              disabled
              className="bg-gray-400 text-white font-bold py-3 px-6 rounded-lg"
            >
              Future Release
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ProposalGenerator() {
  const [company, setCompany] = useState('');
  const [service, setService] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [proposal, setProposal] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const companies = [
    { id: 'mercedes', name: 'Mercedes-Benz' },
    { id: 'bmw', name: 'BMW' },
    { id: 'volkswagen', name: 'Volkswagen' }
  ];
  
  const services = [
    { id: 'predictive', name: 'Predictive Maintenance' },
    { id: 'rd', name: 'R&D Support' },
    { id: 'infra', name: 'Infrastructure Solutions' }
  ];
  
  const generateProposal = async () => {
    if (!company || !service) {
      alert('Please select both a company and a service');
      return;
    }
    
    setIsGenerating(true);
    
    // Mock API call - in a real app, this would call the OpenAI API via LangGraph
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedCompany = companies.find(c => c.id === company);
      const selectedService = services.find(s => s.id === service);
      
      // Generate mock proposal
      const proposalText = `
# AI Solution Proposal for ${selectedCompany.name}

## ${selectedService.name} Implementation Plan

### Executive Summary
This proposal outlines a comprehensive ${selectedService.name.toLowerCase()} solution tailored specifically for ${selectedCompany.name}'s unique requirements and challenges in the automotive industry.

### Proposed Solution
Our AI-powered ${selectedService.name.toLowerCase()} platform leverages cutting-edge machine learning algorithms and real-time data analytics to provide ${selectedCompany.name} with actionable insights and operational improvements.

### Implementation Timeline
- Phase 1: Initial Assessment and Setup (4 weeks)
- Phase 2: Data Integration and Model Training (6 weeks)
- Phase 3: Pilot Deployment and Testing (4 weeks)
- Phase 4: Full Implementation and Staff Training (6 weeks)

### Expected Benefits
- 30% reduction in operational costs
- 25% improvement in efficiency metrics
- 40% faster issue resolution time
- ROI expected within 8 months of full deployment

### Investment Details
The total investment for this solution is structured to provide maximum value with flexible implementation options to align with ${selectedCompany.name}'s budgetary requirements.

### Next Steps
We recommend scheduling a technical demonstration with your team to showcase the platform's capabilities using your actual operational data.
      `;
      
      setProposal(proposalText);
    } catch (error) {
      console.error('Error generating proposal:', error);
      alert('Failed to generate proposal. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const conductResearch = async () => {
    if (!company) {
      alert('Please select a company first');
      return;
    }
    
    setIsResearching(true);
    
    // Mock research function
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert(`Real-time research completed for ${companies.find(c => c.id === company).name}`);
    } catch (error) {
      console.error('Error conducting research:', error);
    } finally {
      setIsResearching(false);
    }
  };
  
  const runHistoricalAnalysis = async () => {
    if (!company) {
      alert('Please select a company first');
      return;
    }
    
    setIsAnalyzing(true);
    
    // Mock analysis function
    try {
      await new Promise(resolve => setTimeout(resolve, 1800));
      alert(`Historical analysis completed for ${companies.find(c => c.id === company).name}`);
    } catch (error) {
      console.error('Error running analysis:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const downloadPdf = () => {
    // In a real app, this would generate a PDF using a library like jsPDF
    alert('PDF download functionality would be implemented here');
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(proposal)
      .then(() => alert('Proposal copied to clipboard'))
      .catch(err => console.error('Failed to copy: ', err));
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center">
              <span>← Back to Home</span>
            </Link>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Generate AI Proposal</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Target Company</label>
              <select 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a company</option>
                {companies.map(comp => (
                  <option key={comp.id} value={comp.id}>{comp.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Service Type</label>
              <select 
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a service</option>
                {services.map(serv => (
                  <option key={serv.id} value={serv.id}>{serv.name}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={conductResearch}
                disabled={isResearching || !company}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg disabled:bg-gray-400 flex items-center"
              >
                {isResearching ? 'Researching...' : 'Real-time Research'}
              </button>
              
              <button
                onClick={runHistoricalAnalysis}
                disabled={isAnalyzing || !company}
                className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg disabled:bg-gray-400"
              >
                {isAnalyzing ? 'Analyzing...' : 'Historical Analysis'}
              </button>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={generateProposal}
                disabled={isGenerating || !company || !service}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-400"
              >
                {isGenerating ? 'Generating...' : 'Generate Proposal'}
              </button>
            </div>
            
            {proposal && (
              <div className="mt-8">
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
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;

