import { jsPDF } from 'jspdf';
import logo from '../msg-logo.png';


export const generatePDF = (proposal, company, service) => {
  try {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text(`AI Proposal for ${company}`, 20, 20);
    
    doc.setFontSize(16);
    doc.text(`${service} Solution`, 20, 30);
    
    doc.setFontSize(12);
    doc.text(`Generated: April 1, 2025`, 20, 40);
    
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(proposal, 170);
    doc.text(splitText, 20, 50);

    doc.save(`${company}-${service}-proposal.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
