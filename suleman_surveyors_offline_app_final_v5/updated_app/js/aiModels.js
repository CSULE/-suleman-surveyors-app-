// AI Models for Suleman Surveyors AI App
// Simplified offline AI functionality

// Constants for diagnosis categories
const SEVERITY_LEVELS = {
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low'
};

const ISSUE_CATEGORIES = {
    LEAK: 'leak',
    CRACK: 'crack',
    DAMP: 'damp',
    MOLD: 'mold',
    STRUCTURAL: 'structural',
    ELECTRICAL: 'electrical',
    PLUMBING: 'plumbing',
    OTHER: 'other'
};

const PROJECT_TYPES = {
    LOFT: 'loft',
    EXTENSION: 'extension',
    RENOVATION: 'renovation',
    KITCHEN: 'kitchen',
    BATHROOM: 'bathroom',
    OTHER: 'other'
};

const VIABILITY_LEVELS = {
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low'
};

// Simplified AI model for issue diagnosis
class IssueDiagnosisModel {
    constructor() {
        // Pre-trained responses for different issue categories
        this.responses = {
            [ISSUE_CATEGORIES.LEAK]: {
                diagnosis: "Based on the information provided, this appears to be a water leak that could be originating from plumbing connections or pipe damage. The pattern of water damage suggests an active leak rather than condensation.",
                severity: SEVERITY_LEVELS.MEDIUM,
                causes: [
                    "Damaged or corroded pipes",
                    "Loose pipe connections or fittings",
                    "Excessive water pressure",
                    "Deteriorated seals or gaskets",
                    "Freezing and thawing cycles causing pipe expansion"
                ],
                actions: [
                    "Shut off water supply to the affected area",
                    "Arrange for a professional plumber to inspect and repair the leak",
                    "Check for any hidden water damage in surrounding areas",
                    "Consider upgrading old plumbing if this is a recurring issue",
                    "Monitor the area after repair to ensure the leak doesn't return"
                ]
            },
            [ISSUE_CATEGORIES.CRACK]: {
                diagnosis: "The images and description indicate a structural crack in the wall. The pattern and width of the crack suggest it may be due to settlement or movement in the building structure rather than normal shrinkage.",
                severity: SEVERITY_LEVELS.MEDIUM,
                causes: [
                    "Foundation settlement",
                    "Structural movement",
                    "Thermal expansion and contraction",
                    "Excessive load on the structure above",
                    "Poor original construction or inadequate reinforcement"
                ],
                actions: [
                    "Monitor the crack with a crack gauge to track any movement",
                    "Consult a structural engineer for professional assessment",
                    "Check for other signs of structural issues in the property",
                    "Ensure proper drainage around the foundation",
                    "Address the underlying cause before cosmetic repairs"
                ]
            },
            [ISSUE_CATEGORIES.DAMP]: {
                diagnosis: "Based on the images and description provided, this appears to be a case of rising damp affecting the lower portion of the wall. The discoloration and deterioration of the plaster are typical signs of moisture ingress from ground level.",
                severity: SEVERITY_LEVELS.MEDIUM,
                causes: [
                    "Failed or absent damp proof course (DPC)",
                    "High external ground levels relative to internal floor",
                    "Blocked or damaged ventilation",
                    "Plumbing leaks in vicinity"
                ],
                actions: [
                    "Inspect and potentially replace the damp proof course",
                    "Check for and repair any plumbing leaks",
                    "Improve ventilation in the affected area",
                    "Consider professional damp treatment"
                ]
            },
            [ISSUE_CATEGORIES.MOLD]: {
                diagnosis: "The images show significant mold growth, likely caused by persistent moisture issues. The pattern and extent suggest this has been developing over time due to inadequate ventilation combined with moisture sources.",
                severity: SEVERITY_LEVELS.HIGH,
                causes: [
                    "Poor ventilation in high-humidity areas",
                    "Condensation on cold surfaces",
                    "Water leaks or flooding not properly dried",
                    "High indoor humidity levels",
                    "Thermal bridging in the building envelope"
                ],
                actions: [
                    "Improve ventilation with extractor fans or air circulation",
                    "Address any underlying moisture sources",
                    "Clean affected areas with appropriate mold treatments",
                    "Monitor humidity levels and use dehumidifiers if necessary",
                    "Consider professional mold remediation if extensive"
                ]
            },
            [ISSUE_CATEGORIES.STRUCTURAL]: {
                diagnosis: "The information provided indicates a potential structural issue that requires attention. The symptoms suggest possible movement or stress in load-bearing elements of the building.",
                severity: SEVERITY_LEVELS.HIGH,
                causes: [
                    "Foundation settlement or movement",
                    "Removal of load-bearing walls during renovations",
                    "Excessive loads above the affected area",
                    "Water damage weakening structural elements",
                    "Age-related deterioration of building materials"
                ],
                actions: [
                    "Arrange for immediate assessment by a structural engineer",
                    "Temporarily support any compromised areas if safe to do so",
                    "Avoid adding additional loads to the affected area",
                    "Document changes in the condition with photos and measurements",
                    "Follow professional advice for remediation"
                ]
            },
            [ISSUE_CATEGORIES.ELECTRICAL]: {
                diagnosis: "Based on the description, there appears to be an electrical issue that could pose safety risks. The symptoms indicate potential problems with wiring, connections, or electrical components.",
                severity: SEVERITY_LEVELS.HIGH,
                causes: [
                    "Damaged or deteriorated wiring insulation",
                    "Loose connections in outlets or junction boxes",
                    "Overloaded circuits",
                    "Water ingress affecting electrical components",
                    "Outdated wiring not meeting current standards"
                ],
                actions: [
                    "Turn off power to the affected circuit at the breaker box",
                    "Do not use the affected outlets or fixtures",
                    "Arrange for inspection by a qualified electrician",
                    "Consider a full electrical inspection if the property is older",
                    "Implement recommended safety upgrades"
                ]
            },
            [ISSUE_CATEGORIES.PLUMBING]: {
                diagnosis: "The information suggests a plumbing issue that needs attention. The symptoms indicate problems with water supply, drainage, or related components.",
                severity: SEVERITY_LEVELS.MEDIUM,
                causes: [
                    "Pipe blockages or restrictions",
                    "Damaged or corroded pipes",
                    "Improper pipe sizing or installation",
                    "Water pressure issues",
                    "Faulty fixtures or valves"
                ],
                actions: [
                    "Shut off water supply to the affected area if leaking",
                    "Check water pressure and flow in multiple locations",
                    "Arrange for inspection by a qualified plumber",
                    "Consider camera inspection for hidden pipe issues",
                    "Update old plumbing components as recommended"
                ]
            },
            [ISSUE_CATEGORIES.OTHER]: {
                diagnosis: "Based on the information provided, this issue requires further investigation to determine the exact cause and appropriate solution. The symptoms don't clearly align with common categories.",
                severity: SEVERITY_LEVELS.MEDIUM,
                causes: [
                    "Multiple potential factors may be contributing",
                    "Unusual combination of environmental conditions",
                    "Specific property characteristics",
                    "Previous repairs or modifications",
                    "Gradual deterioration over time"
                ],
                actions: [
                    "Document the issue with detailed photos and notes",
                    "Arrange for in-person assessment by a building surveyor",
                    "Consider specialized testing if appropriate",
                    "Gather historical information about the property",
                    "Develop a tailored solution based on professional advice"
                ]
            }
        };
    }

    // Analyze issue based on category and description
    analyzeIssue(category, description = '') {
        // Default to OTHER if category not found
        const issueCategory = this.responses[category] || this.responses[ISSUE_CATEGORIES.OTHER];
        
        // In a real AI model, we would analyze the description and images
        // For this offline version, we'll return pre-defined responses based on category
        return {
            diagnosis: issueCategory.diagnosis,
            severity: issueCategory.severity,
            causes: issueCategory.causes,
            actions: issueCategory.actions
        };
    }
}

// Simplified AI model for project feasibility
class ProjectFeasibilityModel {
    constructor() {
        // Pre-trained responses for different project types
        this.responses = {
            [PROJECT_TYPES.LOFT]: {
                overview: "Based on the information provided, your loft conversion project appears to be highly viable. The property type and budget are well-aligned with typical requirements for this kind of project.",
                viability: VIABILITY_LEVELS.HIGH,
                planning: "This project likely falls under Permitted Development Rights, meaning formal planning permission may not be required. However, you will need:\n• Building Regulations Approval\n• Party Wall Agreement (if semi-detached or terraced)\n• Structural calculations from an engineer",
                budget: "Your budget is within the typical range for a standard loft conversion. Cost breakdown:\n• Structural work: £20,000 - £25,000\n• Windows and insulation: £5,000 - £8,000\n• Plumbing and electrics: £5,000 - £7,000\n• Finishing and decoration: £8,000 - £12,000\n• Contingency (10%): £5,000",
                timeline: "Typical timeline for this project:\n• Planning and design: 4-6 weeks\n• Building Regulations approval: 2-4 weeks\n• Construction phase: 8-12 weeks\n• Total project duration: 14-22 weeks",
                procurement: "Based on your project details, we recommend the Design and Build procurement route. This approach offers:\n• Single point of responsibility\n• Potentially faster project delivery\n• Better cost certainty\n• Simplified communication"
            },
            [PROJECT_TYPES.EXTENSION]: {
                overview: "Your rear extension project appears to be moderately viable based on the information provided. The scope and budget align with typical projects of this nature, though some aspects may require further consideration.",
                viability: VIABILITY_LEVELS.MEDIUM,
                planning: "This project will likely require formal planning permission, especially if it extends beyond permitted development limits. You will need:\n• Full planning application with architectural drawings\n• Building Regulations Approval\n• Party Wall Agreements with neighbors\n• Possible site surveys",
                budget: "Your budget should be sufficient for a standard rear extension. Typical cost breakdown:\n• Foundations and structure: £25,000 - £35,000\n• Roofing: £8,000 - £12,000\n• Windows and doors: £5,000 - £10,000\n• Interior finishing: £15,000 - £25,000\n• Contingency (15%): £8,000 - £12,000",
                timeline: "Expected timeline for this project:\n• Design and planning: 8-12 weeks\n• Planning approval: 8-10 weeks\n• Building Regulations approval: 4-6 weeks\n• Construction phase: 12-16 weeks\n• Total project duration: 32-44 weeks",
                procurement: "For this extension project, we recommend the Traditional procurement route with separate design and build phases. This approach offers:\n• Greater design control\n• Competitive tender process\n• Clear separation of responsibilities\n• Better quality control"
            },
            [PROJECT_TYPES.RENOVATION]: {
                overview: "Your full renovation project has good viability based on the information provided. The scope aligns with the property type and your budget appears appropriate for the scale of work described.",
                viability: VIABILITY_LEVELS.MEDIUM,
                planning: "This renovation may not require planning permission if it doesn't alter the external appearance significantly or change the building's use. However, you will need:\n• Building Regulations Approval for structural changes\n• Possible Listed Building Consent if applicable\n• Compliance with current energy efficiency standards",
                budget: "Your budget appears appropriate for a full renovation. Typical cost breakdown:\n• Structural alterations: £15,000 - £30,000\n• Plumbing and electrics: £10,000 - £20,000\n• Kitchen and bathrooms: £15,000 - £30,000\n• Flooring and decoration: £10,000 - £20,000\n• Contingency (20%): £10,000 - £20,000",
                timeline: "Realistic timeline for this renovation:\n• Design and planning: 4-8 weeks\n• Approvals and contractor selection: 4-6 weeks\n• Construction and renovation: 16-24 weeks\n• Total project duration: 24-38 weeks",
                procurement: "For this renovation project, we recommend the Design and Build procurement route. This approach offers:\n• Simplified project management\n• Single point of responsibility\n• Potentially faster completion\n• Better coordination between design and construction"
            },
            [PROJECT_TYPES.KITCHEN]: {
                overview: "Your kitchen remodel project has high viability based on the information provided. The scope and budget are well-aligned with typical kitchen renovations for your property type.",
                viability: VIABILITY_LEVELS.HIGH,
                planning: "This kitchen remodel likely won't require planning permission unless it involves structural changes or extensions. However, you should consider:\n• Building Regulations compliance for electrical and plumbing work\n• Gas safety regulations if altering gas supply\n• Ventilation requirements",
                budget: "Your budget is appropriate for a quality kitchen remodel. Typical cost breakdown:\n• Units and worktops: £5,000 - £15,000\n• Appliances: £2,000 - £5,000\n• Plumbing and electrics: £2,000 - £4,000\n• Flooring and decoration: £1,500 - £3,000\n• Installation and labor: £3,000 - £6,000",
                timeline: "Expected timeline for this kitchen remodel:\n• Design and planning: 2-4 weeks\n• Ordering materials and appliances: 4-6 weeks\n• Construction and installation: 3-5 weeks\n• Total project duration: 9-15 weeks",
                procurement: "For this kitchen remodel, we recommend the Direct procurement route with a specialized kitchen company. This approach offers:\n• Integrated design and installation service\n• Specialist expertise\n• Potentially better warranties\n• Simplified project management"
            },
            [PROJECT_TYPES.BATHROOM]: {
                overview: "Your bathroom remodel project has high viability based on the information provided. The scope and budget align well with typical bathroom renovations for your property type.",
                viability: VIABILITY_LEVELS.HIGH,
                planning: "This bathroom remodel likely won't require planning permission unless it involves significant structural changes. However, you should consider:\n• Building Regulations compliance for electrical and plumbing work\n• Ventilation requirements\n• Waterproofing standards",
                budget: "Your budget is appropriate for a quality bathroom remodel. Typical cost breakdown:\n• Sanitaryware and fittings: £2,000 - £5,000\n• Tiles and flooring: £1,000 - £3,000\n• Plumbing and electrics: £1,500 - £3,000\n• Installation and labor: £2,500 - £4,000\n• Fixtures and accessories: £500 - £1,500",
                timeline: "Expected timeline for this bathroom remodel:\n• Design and planning: 1-3 weeks\n• Ordering materials and fixtures: 2-4 weeks\n• Construction and installation: 2-3 weeks\n• Total project duration: 5-10 weeks",
                procurement: "For this bathroom remodel, we recommend the Direct procurement route with a specialized bathroom fitter. This approach offers:\n• Specialized expertise\n• Efficient installation\n• Single point of contact\n• Potentially better warranties"
            },
            [PROJECT_TYPES.OTHER]: {
                overview: "Based on the information provided, your project appears to have moderate viability. Additional details would help provide a more accurate assessment of feasibility and requirements.",
                viability: VIABILITY_LEVELS.MEDIUM,
                planning: "Planning requirements will depend on the specific nature of your project. Consider:\n• Whether the work affects the external appearance\n• If there are structural changes involved\n• Any change of use implications\n• Local planning policies specific to your area",
                budget: "Your budget should be assessed against detailed project requirements. Consider allocating funds for:\n• Main construction elements\n• Professional fees and permits\n• Interior finishes and fixtures\n• Specialist requirements\n• Contingency (15-20% recommended)",
                timeline: "A general timeline for your project might include:\n• Initial design and planning: 4-8 weeks\n• Approvals and preparations: 4-12 weeks\n• Construction phase: 8-20 weeks\n• Final finishing: 2-4 weeks\n• Total duration will depend on project complexity",
                procurement: "Based on the limited information, a Traditional procurement route might be suitable, allowing for:\n• Separate design and construction phases\n• Competitive tendering\n• Greater client control\n• Flexibility to adapt the design"
            }
        };
    }

    // Analyze project based on type and other parameters
    analyzeProject(projectType, propertyType, purpose, budget, planningStatus) {
        // Default to OTHER if project type not found
        const projectCategory = this.responses[projectType] || this.responses[PROJECT_TYPES.OTHER];
        
        // In a real AI model, we would analyze all parameters
        // For this offline version, we'll return pre-defined responses based on project type
        return {
            overview: projectCategory.overview,
            viability: projectCategory.viability,
            planning: projectCategory.planning,
            budget: projectCategory.budget,
            timeline: projectCategory.timeline,
            procurement: projectCategory.procurement
        };
    }
}

// Initialize models
const issueDiagnosisModel = new IssueDiagnosisModel();
const projectFeasibilityModel = new ProjectFeasibilityModel();

// Function to analyze issue from form data
function analyzeIssueFromForm() {
    const category = document.getElementById('issue-category').value;
    const description = document.getElementById('issue-description').value;
    
    if (!category) {
        alert('Please select an issue category');
        return null;
    }
    
    // Get analysis from model
    const analysis = issueDiagnosisModel.analyzeIssue(category, description);
    
    // Update UI with results
    document.getElementById('severity-value').textContent = analysis.severity;
    document.getElementById('severity-value').className = `severity-value ${analysis.severity.toLowerCase()}`;
    
    document.getElementById('diagnosis-text').innerHTML = `<p>${analysis.diagnosis}</p>`;
    
    const causesElement = document.getElementById('potential-causes');
    causesElement.innerHTML = '';
    analysis.causes.forEach(cause => {
        const li = document.createElement('li');
        li.textContent = cause;
        causesElement.appendChild(li);
    });
    
    const actionsElement = document.getElementById('recommended-actions');
    actionsElement.innerHTML = '';
    analysis.actions.forEach(action => {
        const li = document.createElement('li');
        li.textContent = action;
        actionsElement.appendChild(li);
    });
    
    // Store data in offline storage
    const issueData = {
        category: category,
        description: description,
        analysis: analysis
    };
    
    storeIssue(issueData).catch(error => console.error('Failed to store issue data:', error));
    
    return analysis;
}

// Function to analyze project from form data
function analyzeProjectFromForm() {
    const projectType = document.getElementById('project-type').value;
    const propertyType = document.getElementById('property-type').value;
    const purpose = document.getElementById('project-purpose').value;
    const budget = document.getElementById('budget-range').value;
    const planningStatus = document.getElementById('planning-status').value;
    
    if (!projectType || !propertyType || !purpose) {
        alert('Please fill in all required fields');
        return null;
    }
    
    // Get analysis from model
    const analysis = projectFeasibilityModel.analyzeProject(
        projectType, 
        propertyType, 
        purpose, 
        budget, 
        planningStatus
    );
    
    // Update UI with results
    document.getElementById('viability-value').textContent = analysis.viability;
    document.getElementById('viability-value').className = `viability-value ${analysis.viability.toLowerCase()}`;
    
    document.getElementById('feasibility-text').innerHTML = `<p>${analysis.overview}</p>`;
    
    document.getElementById('planning-requirements').innerHTML = `<p>${analysis.planning}</p>`;
    document.getElementById('budget-analysis').innerHTML = `<p>${analysis.budget}</p>`;
    document.getElementById('timeline-estimate').innerHTML = `<p>${analysis.timeline}</p>`;
    document.getElementById('procurement-advice').innerHTML = `<p>${analysis.procurement}</p>`;
    
    // Store data in offline storage
    const projectData = {
        projectType: projectType,
        propertyType: propertyType,
        purpose: purpose,
        budget: budget,
        planningStatus: planningStatus,
        analysis: analysis
    };
    
    storeProject(projectData).catch(error => console.error('Failed to store project data:', error));
    
    return analysis;
}

// Connect the analysis functions to the UI buttons
document.addEventListener('DOMContentLoaded', () => {
    const analyzeIssueBtn = document.getElementById('analyze-issue-btn');
    if (analyzeIssueBtn) {
        analyzeIssueBtn.addEventListener('click', () => {
            const analysis = analyzeIssueFromForm();
            if (analysis) {
                // Show diagnosis screen
                const screens = document.querySelectorAll('.screen, .home-screen');
                screens.forEach(screen => {
                    screen.style.display = 'none';
                });
                document.getElementById('diagnosis-screen').style.display = 'block';
                window.scrollTo(0, 0);
            }
        });
    }
    
    const analyzeProjectBtn = document.getElementById('analyze-project-btn');
    if (analyzeProjectBtn) {
        analyzeProjectBtn.addEventListener('click', () => {
            const analysis = analyzeProjectFromForm();
            if (analysis) {
                // Show feasibility screen
                const screens = document.querySelectorAll('.screen, .home-screen');
                screens.forEach(screen => {
                    screen.style.display = 'none';
                });
                document.getElementById('feasibility-screen').style.display = 'block';
                window.scrollTo(0, 0);
            }
        });
    }
});
