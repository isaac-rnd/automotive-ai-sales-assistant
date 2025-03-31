import { jsPDF } from 'jspdf';

/**
 * Generates a PDF from proposal text
 * @param {string} proposal - Proposal content
 * @param {string} company - Company name
 * @param {string} service - Service type
 */
export const generatePDF = (proposal, company, service) => {
  try {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.text(`AI Proposal for ${company}`, 20, 20);
    
    // Add subtitle
    doc.setFontSize(16);
    doc.text(`${service} Solution`, 20, 30);
    
    // Add date
    doc.setFontSize(12);
    doc.text(`Generated: April 1, 2025`, 20, 40);
    
    // Add content with word wrapping
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(proposal, 170);
    doc.text(splitText, 20, 50);
    
    // Save the PDF
    doc.save(`${company}-${service}-proposal.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
