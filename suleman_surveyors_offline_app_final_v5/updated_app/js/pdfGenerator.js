// PDF Generator for Suleman Surveyors AI App
// Uses jsPDF library for PDF generation

// Function to load the jsPDF library dynamically
function loadJsPDF() {
    return new Promise((resolve, reject) => {
        if (window.jspdf) {
            resolve(window.jspdf);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        script.integrity = 'sha512-qZvrmS2ekKPF2mSznTQsxqPgnpkI4DNTlrdUmTzrDgektczlKNRRhy5X5AAOnx5S09ydFYWWNSfcEqDTTHgtNA==';
        script.crossOrigin = 'anonymous';
        script.onload = () => resolve(window.jspdf);
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Generate PDF for issue diagnosis
async function generateDiagnosisPDF() {
    try {
        const { jsPDF } = await loadJsPDF();
        const doc = new jsPDF();
        
        // Add header
        doc.setFontSize(22);
        doc.setTextColor(33, 150, 243); // Primary color
        doc.text('Suleman Surveyors AI', 105, 20, { align: 'center' });
        
        doc.setFontSize(16);
        doc.text('Property Issue Diagnosis Report', 105, 30, { align: 'center' });
        
        // Add date
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        const date = new Date().toLocaleDateString();
        doc.text(`Generated on: ${date}`, 105, 40, { align: 'center' });
        
        // Add horizontal line
        doc.setDrawColor(33, 150, 243);
        doc.setLineWidth(0.5);
        doc.line(20, 45, 190, 45);
        
        // Issue details
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('Issue Details', 20, 60);
        
        const issueCategory = document.getElementById('issue-category').value || 'Not specified';
        const issueDescription = document.getElementById('issue-description').value || 'No description provided';
        
        doc.setFontSize(12);
        doc.text(`Category: ${issueCategory}`, 20, 70);
        
        // Description text with wrapping
        const splitDescription = doc.splitTextToSize(
            `Description: ${issueDescription}`, 
            170
        );
        doc.text(splitDescription, 20, 80);
        
        // Diagnosis section
        let yPos = 80 + (splitDescription.length * 7);
        
        doc.setFontSize(14);
        doc.setTextColor(33, 150, 243);
        doc.text('AI Diagnosis', 20, yPos);
        
        // Get diagnosis text
        const diagnosisText = document.getElementById('diagnosis-text').innerText;
        const splitDiagnosis = doc.splitTextToSize(diagnosisText, 170);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(splitDiagnosis, 20, yPos + 10);
        
        yPos += 10 + (splitDiagnosis.length * 7);
        
        // Severity
        const severity = document.getElementById('severity-value').innerText;
        doc.setFontSize(12);
        doc.text(`Severity: ${severity}`, 20, yPos);
        
        yPos += 10;
        
        // Potential causes
        doc.setFontSize(14);
        doc.setTextColor(33, 150, 243);
        doc.text('Potential Causes', 20, yPos);
        
        const causes = document.getElementById('potential-causes');
        if (causes) {
            const causeItems = causes.getElementsByTagName('li');
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            
            for (let i = 0; i < causeItems.length; i++) {
                yPos += 7;
                doc.text(`• ${causeItems[i].innerText}`, 25, yPos);
            }
        }
        
        yPos += 15;
        
        // Recommended actions
        doc.setFontSize(14);
        doc.setTextColor(33, 150, 243);
        doc.text('Recommended Actions', 20, yPos);
        
        const actions = document.getElementById('recommended-actions');
        if (actions) {
            const actionItems = actions.getElementsByTagName('li');
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            
            for (let i = 0; i < actionItems.length; i++) {
                yPos += 7;
                doc.text(`• ${actionItems[i].innerText}`, 25, yPos);
            }
        }
        
        // Footer
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Suleman Surveyors AI - Offline Version', 105, 280, { align: 'center' });
        doc.text('This is an AI-generated report and should be verified by a professional.', 105, 285, { align: 'center' });
        
        // Save the PDF
        doc.save('Suleman_Surveyors_Diagnosis_Report.pdf');
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
    }
}

// Generate PDF for feasibility report
async function generateFeasibilityPDF() {
    try {
        const { jsPDF } = await loadJsPDF();
        const doc = new jsPDF();
        
        // Add header
        doc.setFontSize(22);
        doc.setTextColor(33, 150, 243); // Primary color
        doc.text('Suleman Surveyors AI', 105, 20, { align: 'center' });
        
        doc.setFontSize(16);
        doc.text('Project Feasibility Report', 105, 30, { align: 'center' });
        
        // Add date
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        const date = new Date().toLocaleDateString();
        doc.text(`Generated on: ${date}`, 105, 40, { align: 'center' });
        
        // Add horizontal line
        doc.setDrawColor(33, 150, 243);
        doc.setLineWidth(0.5);
        doc.line(20, 45, 190, 45);
        
        // Project details
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('Project Details', 20, 60);
        
        const projectType = document.getElementById('project-type').value || 'Not specified';
        const propertyType = document.getElementById('property-type').value || 'Not specified';
        const projectPurpose = document.getElementById('project-purpose').value || 'Not specified';
        const budgetValue = document.getElementById('budget-value').innerText || '£50,000';
        const planningStatus = document.getElementById('planning-status').value || 'Not specified';
        
        doc.setFontSize(12);
        doc.text(`Project Type: ${projectType}`, 20, 70);
        doc.text(`Property Type: ${propertyType}`, 20, 80);
        doc.text(`Project Purpose: ${projectPurpose}`, 20, 90);
        doc.text(`Budget: ${budgetValue}`, 20, 100);
        doc.text(`Planning Permission Status: ${planningStatus}`, 20, 110);
        
        // Feasibility section
        let yPos = 130;
        
        doc.setFontSize(14);
        doc.setTextColor(33, 150, 243);
        doc.text('Feasibility Analysis', 20, yPos);
        
        // Get feasibility text
        const feasibilityText = document.getElementById('feasibility-text').innerText;
        const splitFeasibility = doc.splitTextToSize(feasibilityText, 170);
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(splitFeasibility, 20, yPos + 10);
        
        yPos += 10 + (splitFeasibility.length * 7);
        
        // Viability
        const viability = document.getElementById('viability-value').innerText;
        doc.setFontSize(12);
        doc.text(`Project Viability: ${viability}`, 20, yPos);
        
        yPos += 15;
        
        // Planning Requirements
        doc.setFontSize(14);
        doc.setTextColor(33, 150, 243);
        doc.text('Planning Requirements', 20, yPos);
        
        const planningReqs = document.getElementById('planning-requirements');
        if (planningReqs) {
            const planningText = planningReqs.innerText;
            const splitPlanning = doc.splitTextToSize(planningText, 170);
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(splitPlanning, 20, yPos + 10);
            
            yPos += 10 + (splitPlanning.length * 7);
        }
        
        // Check if we need a new page
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
        
        // Budget Analysis
        doc.setFontSize(14);
        doc.setTextColor(33, 150, 243);
        doc.text('Budget Analysis', 20, yPos);
        
        const budgetAnalysis = document.getElementById('budget-analysis');
        if (budgetAnalysis) {
            const budgetText = budgetAnalysis.innerText;
            const splitBudget = doc.splitTextToSize(budgetText, 170);
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(splitBudget, 20, yPos + 10);
            
            yPos += 10 + (splitBudget.length * 7);
        }
        
        // Check if we need a new page
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
        
        // Timeline Estimate
        doc.setFontSize(14);
        doc.setTextColor(33, 150, 243);
        doc.text('Timeline Estimate', 20, yPos);
        
        const timelineEstimate = document.getElementById('timeline-estimate');
        if (timelineEstimate) {
            const timelineText = timelineEstimate.innerText;
            const splitTimeline = doc.splitTextToSize(timelineText, 170);
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(splitTimeline, 20, yPos + 10);
            
            yPos += 10 + (splitTimeline.length * 7);
        }
        
        // Check if we need a new page
        if (yPos > 250) {
            doc.addPage();
            yPos = 20;
        }
        
        // Procurement Advice
        doc.setFontSize(14);
        doc.setTextColor(33, 150, 243);
        doc.text('Recommended Procurement Route', 20, yPos);
        
        const procurementAdvice = document.getElementById('procurement-advice');
        if (procurementAdvice) {
            const procurementText = procurementAdvice.innerText;
            const splitProcurement = doc.splitTextToSize(procurementText, 170);
            
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.text(splitProcurement, 20, yPos + 10);
        }
        
        // Footer on last page
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Suleman Surveyors AI - Offline Version', 105, 280, { align: 'center' });
        doc.text('This is an AI-generated report and should be verified by a professional.', 105, 285, { align: 'center' });
        
        // Save the PDF
        doc.save('Suleman_Surveyors_Feasibility_Report.pdf');
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Failed to generate PDF. Please try again.');
    }
}
