import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// Removed chart imports as they are now in ProposalOutput
// Removed service imports as they are now in ProposalGenerator
import Header from './components/Header'; // Keep Header/Footer if Home uses them
import Footer from './components/Footer';
import ProposalGenerator from './pages/ProposalGenerator'; // Import the refactored component

// ChartJS registration is moved to ProposalOutput.jsx

function App() {
  return (
    <Router basename="/automotive-ai-sales-assistant">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Use the refactored ProposalGenerator component */}
        <Route path="/proposal" element={<ProposalGenerator />} />
      </Routes>
    </Router>
  );
}

// Home component remains the same
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


export default App;

