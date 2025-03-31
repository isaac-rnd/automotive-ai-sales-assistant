import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-100 p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-6">AI Proposal Generator</h2>
          <p className="mb-8 text-gray-600">Generate tailored proposals for automotive companies using advanced AI and LangGraph</p>
          <button 
            onClick={() => navigate('/proposal')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Create New Proposal
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
