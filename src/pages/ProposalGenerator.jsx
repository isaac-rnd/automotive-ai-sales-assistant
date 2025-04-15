import React, { useState, useCallback } from 'react';
// Removed Link import as it's now only in ProposalForm
import { conductCompanyResearch, runHistoricalAnalysis as fetchHistoricalAnalysisText } from '../services/openaiservice';
import { COMPANIES, SERVICES } from '../utils/constants';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProposalForm from '../components/ProposalForm';
import ProposalOutput from '../components/ProposalOutput';
import GeneratedProposalDisplay from '../components/GeneratedProposalDisplay'; // Import the new component

function ProposalGenerator() {
  const [company, setCompany] = useState('');
  const [service, setService] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [proposal, setProposal] = useState('');

  // State for Real-time Research
  const [isResearching, setIsResearching] = useState(false);
  const [researchResult, setResearchResult] = useState('');
  const [researchError, setResearchError] = useState('');

  // State for Historical Analysis
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [historicalChartData, setHistoricalChartData] = useState(null);
  const [historicalAnalysisText, setHistoricalAnalysisText] = useState('');
  const [analysisError, setAnalysisError] = useState('');

  // --- Helper Functions to get names ---
  const getCompanyName = useCallback((id) => COMPANIES.find(c => c.id === id)?.name || 'Selected Company', []);
  const getServiceName = useCallback((id) => SERVICES.find(s => s.id === id)?.name || 'Selected Service', []);

  // --- Handlers (Remain the same) ---
  const handleCompanyChange = useCallback((newCompanyId) => {
    setCompany(newCompanyId);
    setResearchResult(''); setResearchError('');
    setHistoricalChartData(null); setHistoricalAnalysisText(''); setAnalysisError('');
    setProposal('');
  }, []);

  const handleServiceChange = useCallback((newServiceId) => {
    setService(newServiceId);
    setProposal('');
  }, []);

  const handleConductResearch = useCallback(async () => {
    // ... (implementation remains the same)
    if (!company) {
      setResearchError('Please select a company first.');
      return;
    }
    const companyName = getCompanyName(company);
    setIsResearching(true);
    setResearchResult('');
    setResearchError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      const result = `Simulated real-time research for ${companyName}: Key focus areas identified are [Area 1] and [Area 2]. Recent news suggests [Recent Development]. Competitor landscape includes [Competitor A] and [Competitor B].`;
      setResearchResult(result);
    } catch (error) {
      console.error('Error conducting research:', error);
      setResearchError('Failed to conduct research. Please try again.');
    } finally {
      setIsResearching(false);
    }
  }, [company, getCompanyName]);

  const handleRunHistoricalAnalysis = useCallback(async () => {
    // ... (implementation remains the same)
     if (!company) {
      setAnalysisError('Please select a company first.');
      return;
    }
    const companyName = getCompanyName(company);
    setIsAnalyzing(true);
    setHistoricalChartData(null);
    setHistoricalAnalysisText('');
    setAnalysisError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      const demoExcelData = {
        labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024'],
        datasets: [
          {
            label: `${companyName} - Unit Sales (Simulated)`,
            data: [1500, 1800, 1650, 2100, 2000, 2350].map(d => d + Math.random() * 100),
            borderColor: 'rgb(138, 43, 226)',
            backgroundColor: 'rgba(138, 43, 226, 0.5)',
            tension: 0.1,
          },
        ],
      };
      const analysisText = `Simulated historical analysis for ${companyName}:
- The data covers the period from Q1 2023 to Q2 2024.
- An upward trend in simulated unit sales is observed, peaking in the latest quarter.
- Q4 2023 showed significant growth compared to Q3 2023.
- Further analysis could explore factors driving these simulated trends.`;

      setHistoricalChartData(demoExcelData);
      setHistoricalAnalysisText(analysisText);

    } catch (error) {
      console.error('Error running analysis:', error);
      setAnalysisError('Failed to run historical analysis simulation.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [company, getCompanyName]);

  const handleGenerateProposal = useCallback(async () => {
    // ... (implementation remains the same)
    if (!company || !service) {
      alert('Please select both a company and a service');
      return;
    }
    setIsGenerating(true);
    setProposal('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const companyName = getCompanyName(company);
      const serviceName = getServiceName(service);
      let researchIntegration = researchResult ? `\n\n### Insights from Research:\n${researchResult.substring(0, 150)}...\n` : '';
      let analysisIntegration = historicalAnalysisText ? `\n### Insights from Analysis:\n${historicalAnalysisText.substring(0, 150)}...\n` : '';

      const proposalText = `
# AI Solution Proposal for ${companyName}
## ${serviceName} Implementation Plan
### Executive Summary
This proposal outlines a comprehensive ${serviceName.toLowerCase()} solution tailored specifically for ${companyName}'s unique requirements and challenges in the automotive industry.
${researchIntegration}${analysisIntegration}
### Proposed Solution
Our AI-powered ${serviceName.toLowerCase()} platform leverages cutting-edge machine learning algorithms and real-time data analytics to provide ${companyName} with actionable insights and operational improvements.
### Implementation Timeline
- Phase 1: Initial Assessment and Setup (4 weeks)
- Phase 2: Data Integration and Model Training (6 weeks)
- Phase 3: Pilot Deployment and Testing (4 weeks)
- Phase 4: Full Implementation and Staff Training (6 weeks)
### Expected Benefits
- Potential reduction in operational costs
- Anticipated improvement in efficiency metrics
- Faster issue resolution time
- ROI projection available upon detailed assessment
### Investment Details
The total investment for this solution is structured to provide maximum value with flexible implementation options to align with ${companyName}'s budgetary requirements.
### Next Steps
We recommend scheduling a technical demonstration with your team to showcase the platform's capabilities.
      `;
      setProposal(proposalText);
    } catch (error) {
      console.error('Error generating proposal:', error);
      alert('Failed to generate proposal. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [company, service, getCompanyName, getServiceName, researchResult, historicalAnalysisText]);


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Changed main layout: flex-col to stack sections vertically */}
      <main className="flex-grow bg-gray-100 p-6 flex flex-col">

        {/* Top Section: Two Columns (Form | Research/Analysis) */}
        <div className="flex w-full mb-6"> {/* Added mb-6 for spacing */}
          {/* Left Column: Controls */}
          <div className="w-1/2 pr-4"> {/* Removed flex flex-col space-y-4 */}
            <ProposalForm
              company={company}
              service={service}
              companies={COMPANIES}
              services={SERVICES}
              isResearching={isResearching}
              isAnalyzing={isAnalyzing}
              isGenerating={isGenerating} // Still needed for disabling buttons
              onCompanyChange={handleCompanyChange}
              onServiceChange={handleServiceChange}
              onResearch={handleConductResearch}
              onAnalyze={handleRunHistoricalAnalysis}
              onGenerate={handleGenerateProposal}
            />
          </div>

          {/* Right Column: Research & Analysis Results */}
          <div className="w-1/2 pl-4 flex flex-col space-y-6 overflow-y-auto">
            {/* Pass only relevant props to ProposalOutput */}
            <ProposalOutput
              isResearching={isResearching}
              researchResult={researchResult}
              researchError={researchError}
              isAnalyzing={isAnalyzing}
              analysisError={analysisError}
              historicalChartData={historicalChartData}
              historicalAnalysisText={historicalAnalysisText}
              // Removed props related to proposal
            />
          </div>
        </div> {/* End of two-column flex container */}

        {/* Bottom Section: Full Width Generated Proposal */}
        <div className="w-full"> {/* Container for the full-width component */}
          <GeneratedProposalDisplay
            proposal={proposal}
            isGenerating={isGenerating}
            companyName={company ? getCompanyName(company) : ''}
            serviceName={service ? getServiceName(service) : ''}
            companyId={company}
            serviceId={service}
          />
        </div>

      </main>
      <Footer />
    </div>
  );
}

export default ProposalGenerator;
