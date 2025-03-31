import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProposalForm from '../components/ProposalForm';
import ProposalOutput from '../components/ProposalOutput';
import { COMPANIES, SERVICES } from '../utils/constants';
import { 
  generateProposal, 
  conductCompanyResearch, 
  runHistoricalAnalysis 
} from "../services/openaiservice";

function ProposalGenerator() {
  // State management
  const [company, setCompany] = useState('');
  const [service, setService] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [proposal, setProposal] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [researchData, setResearchData] = useState('');
  const [analysisData, setAnalysisData] = useState('');
  
  // Handler for proposal generation
  const handleGenerateProposal = async () => {
    if (!company || !service) {
      alert('Please select both a company and a service');
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Get company and service display names
      const companyName = COMPANIES.find(c => c.id === company).name;
      const serviceName = SERVICES.find(s => s.id === service).name;
      
      // Generate proposal using OpenAI through LangGraph
      const proposalText = await generateProposal(companyName, serviceName);
      
      // Additional context from research if available
      let enhancedProposal = proposalText;
      if (researchData || analysisData) {
        // In a real implementation, this data would be used to enhance the proposal
        console.log("Using research and analysis to enhance proposal");
      }
      
      setProposal(enhancedProposal);
    } catch (error) {
      console.error('Error generating proposal:', error);
      alert('Failed to generate proposal. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Handler for company research
  const handleResearch = async () => {
    if (!company) {
      alert('Please select a company first');
      return;
    }
    
    setIsResearching(true);
    
    try {
      const companyName = COMPANIES.find(c => c.id === company).name;
      const data = await conductCompanyResearch(companyName);
      setResearchData(data);
      alert(`Real-time research completed for ${companyName}`);
    } catch (error) {
      console.error('Error conducting research:', error);
      alert('Research failed. Please try again.');
    } finally {
      setIsResearching(false);
    }
  };
  
  // Handler for historical analysis
  const handleAnalysis = async () => {
    if (!company) {
      alert('Please select a company first');
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const companyName = COMPANIES.find(c => c.id === company).name;
      const data = await runHistoricalAnalysis(companyName);
      setAnalysisData(data);
      alert(`Historical analysis completed for ${companyName}`);
    } catch (error) {
      console.error('Error running analysis:', error);
      alert('Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Get selected company and service names for UI display
  const selectedCompanyName = company ? COMPANIES.find(c => c.id === company).name : '';
  const selectedServiceName = service ? SERVICES.find(s => s.id === service).name : '';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center">
              <span>← Back to Home</span>
            </Link>
          </div>
          
          {/* Proposal Form Component */}
          <ProposalForm 
            company={company}
            setCompany={setCompany}
            service={service}
            setService={setService}
            onGenerate={handleGenerateProposal}
            onResearch={handleResearch}
            onAnalyze={handleAnalysis}
            isGenerating={isGenerating}
            isResearching={isResearching}
            isAnalyzing={isAnalyzing}
          />
          
          {/* Proposal Output Component */}
          {proposal && (
            <ProposalOutput 
              proposal={proposal} 
              company={selectedCompanyName}
              service={selectedServiceName}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProposalGenerator;