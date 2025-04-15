import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
// Removed generatePDF import

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Removed props related to proposal generation: proposal, isGenerating, companyName, serviceName, companyId, serviceId
function ProposalOutput({
  isResearching,
  researchResult,
  researchError,
  isAnalyzing,
  analysisError,
  historicalChartData,
  historicalAnalysisText,
}) {

  // Removed copyToClipboard and downloadPdf handlers

  return (
    <>
      {/* Real-time Research Results */}
      <div className="bg-white p-4 shadow rounded min-h-[150px]">
        <h3 className="font-medium mb-2 border-b pb-1 text-base">Real-time Research Insights</h3>
        {isResearching && <p className="text-gray-500 text-sm">Loading research data...</p>}
        {researchError && !isResearching && <p className="text-red-500 text-sm">{researchError}</p>}
        {researchResult && !isResearching && (
          <div className="prose prose-sm max-w-none text-gray-800">
            <p className="whitespace-pre-line">{researchResult}</p>
          </div>
        )}
        {!researchResult && !isResearching && !researchError && <p className="text-gray-400 text-sm">Select a company and click 'Real-time Research' in the configuration panel.</p>}
      </div>

      {/* Historical Analysis Results */}
      <div className="bg-white p-4 shadow rounded min-h-[250px]">
        <h3 className="font-medium mb-2 border-b pb-1 text-base">Historical Analysis (Simulated)</h3>
        {isAnalyzing && <p className="text-gray-500 text-sm">Generating analysis and graph...</p>}
        {analysisError && !isAnalyzing && <p className="text-red-500 text-sm">{analysisError}</p>}
        {historicalChartData && historicalAnalysisText && !isAnalyzing && (
          <div className="space-y-3">
            <div className="h-48 md:h-56">
              <Line
                data={historicalChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'top' }, title: { display: true, text: 'Simulated Data Trend' } }
                }}
              />
            </div>
            <div className="prose prose-sm max-w-none text-gray-800">
              <h4 className="text-sm font-semibold">Analysis Summary:</h4>
              <p className="whitespace-pre-line">{historicalAnalysisText}</p>
            </div>
          </div>
        )}
        {!historicalChartData && !isAnalyzing && !analysisError && <p className="text-gray-400 text-sm">Select a company and click 'Historical Analysis' in the configuration panel.</p>}
      </div>

      {/* --- REMOVED Proposal Display Section --- */}
    </>
  );
}

// Updated PropTypes
ProposalOutput.propTypes = {
  isResearching: PropTypes.bool.isRequired,
  researchResult: PropTypes.string.isRequired,
  researchError: PropTypes.string.isRequired,
  isAnalyzing: PropTypes.bool.isRequired,
  analysisError: PropTypes.string.isRequired,
  historicalChartData: PropTypes.object,
  historicalAnalysisText: PropTypes.string.isRequired,
};

export default ProposalOutput;
