// AI Service for Suleman Surveyors App
// Provides simplified AI functionality for offline use

class AIService {
    constructor() {
        this.issueTypes = {
            'Leak': {
                patterns: ['leak', 'water', 'drip', 'pipe', 'plumbing', 'wet', 'ceiling'],
                severityRules: {
                    'Minor': 'Small, slow leak with minimal damage',
                    'Moderate': 'Active leak with visible water damage',
                    'Severe': 'Major leak affecting multiple areas or structural components'
                },
                causes: {
                    'Minor': 'Loose connection in plumbing fixture',
                    'Moderate': 'Damaged pipe or seal requiring replacement',
                    'Severe': 'Burst pipe or major plumbing failure'
                },
                repairTimes: {
                    'Minor': '1-2 hours',
                    'Moderate': '1 day',
                    'Severe': '2-3 days'
                }
            },
            'Crack': {
                patterns: ['crack', 'split', 'fracture', 'wall', 'ceiling', 'foundation'],
                severityRules: {
                    'Minor': 'Hairline crack in plaster or paint',
                    'Moderate': 'Visible crack extending through wall material',
                    'Severe': 'Wide or long crack potentially affecting structure'
                },
                causes: {
                    'Minor': 'Normal settling or thermal expansion/contraction',
                    'Moderate': 'Excessive moisture changes or minor structural movement',
                    'Severe': 'Foundation issues or significant structural problems'
                },
                repairTimes: {
                    'Minor': '2-3 hours',
                    'Moderate': '1-2 days',
                    'Severe': '3-7 days'
                }
            },
            'Damp': {
                patterns: ['damp', 'moist', 'humid', 'mold', 'mildew', 'musty', 'condensation'],
                severityRules: {
                    'Minor': 'Surface condensation or small damp patch',
                    'Moderate': 'Persistent dampness with visible marks on walls',
                    'Severe': 'Extensive dampness with mold growth or structural damage'
                },
                causes: {
                    'Minor': 'Poor ventilation or condensation buildup',
                    'Moderate': 'Water ingress through damaged exterior pointing, allowing moisture to penetrate the wall and cause internal dampness',
                    'Severe': 'Rising damp from ground level or major water penetration through roof or walls'
                },
                repairTimes: {
                    'Minor': '1-2 days',
                    'Moderate': '2-3 days',
                    'Severe': '1-2 weeks'
                }
            },
            'Structural': {
                patterns: ['structural', 'support', 'beam', 'foundation', 'subsidence', 'sag', 'bow'],
                severityRules: {
                    'Minor': 'Cosmetic issues with no structural impact',
                    'Moderate': 'Visible structural issues requiring professional assessment',
                    'Severe': 'Major structural problems affecting building integrity'
                },
                causes: {
                    'Minor': 'Normal settling or age-related wear',
                    'Moderate': 'Water damage or localized foundation issues',
                    'Severe': 'Major foundation problems, subsidence, or structural failure'
                },
                repairTimes: {
                    'Minor': '1-2 days',
                    'Moderate': '1-2 weeks',
                    'Severe': '3+ weeks'
                }
            }
        };
        
        this.projectTypes = {
            'Loft Conversion': {
                feasibilityFactors: {
                    'Roof height': { weight: 0.3, threshold: 2.3 },
                    'Structural support': { weight: 0.25, threshold: 'adequate' },
                    'Planning restrictions': { weight: 0.2, threshold: 'minimal' },
                    'Budget adequacy': { weight: 0.15, threshold: 40000 },
                    'Access': { weight: 0.1, threshold: 'good' }
                },
                considerations: [
                    { text: 'Planning permission likely required', color: '#ffc107' },
                    { text: 'Budget appears adequate for scope', color: '#4caf50' },
                    { text: 'Timeline estimate: 3-4 months', color: '#2196f3' },
                    { text: 'No conservation area restrictions', color: '#4caf50' }
                ],
                typicalCost: { min: 30000, max: 60000 },
                typicalTimeframe: { min: 8, max: 16, unit: 'weeks' }
            },
            'Rear Extension': {
                feasibilityFactors: {
                    'Garden space': { weight: 0.3, threshold: 'adequate' },
                    'Planning restrictions': { weight: 0.25, threshold: 'permitted development' },
                    'Ground conditions': { weight: 0.2, threshold: 'stable' },
                    'Budget adequacy': { weight: 0.15, threshold: 50000 },
                    'Neighboring properties': { weight: 0.1, threshold: 'no issues' }
                },
                considerations: [
                    { text: 'May qualify for permitted development', color: '#4caf50' },
                    { text: 'Budget appears tight for scope', color: '#ffc107' },
                    { text: 'Timeline estimate: 4-5 months', color: '#2196f3' },
                    { text: 'Party wall agreement likely needed', color: '#ffc107' }
                ],
                typicalCost: { min: 40000, max: 80000 },
                typicalTimeframe: { min: 12, max: 20, unit: 'weeks' }
            },
            'Side Extension': {
                feasibilityFactors: {
                    'Side space': { weight: 0.3, threshold: 'adequate' },
                    'Planning restrictions': { weight: 0.25, threshold: 'permitted development' },
                    'Access': { weight: 0.2, threshold: 'good' },
                    'Budget adequacy': { weight: 0.15, threshold: 45000 },
                    'Utilities': { weight: 0.1, threshold: 'no conflicts' }
                },
                considerations: [
                    { text: 'Planning permission likely required', color: '#ffc107' },
                    { text: 'Budget appears adequate for scope', color: '#4caf50' },
                    { text: 'Timeline estimate: 3-4 months', color: '#2196f3' },
                    { text: 'Party wall agreement required', color: '#ffc107' }
                ],
                typicalCost: { min: 35000, max: 70000 },
                typicalTimeframe: { min: 10, max: 16, unit: 'weeks' }
            },
            'Renovation': {
                feasibilityFactors: {
                    'Building condition': { weight: 0.3, threshold: 'fair' },
                    'Scope complexity': { weight: 0.25, threshold: 'moderate' },
                    'Heritage status': { weight: 0.2, threshold: 'none' },
                    'Budget adequacy': { weight: 0.15, threshold: 35000 },
                    'Access': { weight: 0.1, threshold: 'good' }
                },
                considerations: [
                    { text: 'No planning permission likely needed', color: '#4caf50' },
                    { text: 'Budget appears adequate for scope', color: '#4caf50' },
                    { text: 'Timeline estimate: 2-3 months', color: '#2196f3' },
                    { text: 'Building regulations approval required', color: '#ffc107' }
                ],
                typicalCost: { min: 25000, max: 60000 },
                typicalTimeframe: { min: 6, max: 12, unit: 'weeks' }
            }
        };
    }

    // Analyze issue based on description and category
    analyzeIssue(description, category) {
        // Default to the selected category
        const issueType = this.issueTypes[category] || this.issueTypes['Damp'];
        
        // Determine severity based on keywords in description
        let severityScore = 0;
        const descriptionLower = description.toLowerCase();
        
        // Check for severity indicators
        if (descriptionLower.includes('severe') || 
            descriptionLower.includes('major') || 
            descriptionLower.includes('big') ||
            descriptionLower.includes('dangerous')) {
            severityScore += 2;
        } else if (descriptionLower.includes('moderate') || 
                  descriptionLower.includes('significant') || 
                  descriptionLower.includes('concerning')) {
            severityScore += 1;
        }
        
        // Check for extent indicators
        if (descriptionLower.includes('spreading') || 
            descriptionLower.includes('growing') || 
            descriptionLower.includes('worsening')) {
            severityScore += 1;
        }
        
        // Check for duration indicators
        if (descriptionLower.includes('months') || 
            descriptionLower.includes('years') || 
            descriptionLower.includes('long time')) {
            severityScore += 1;
        }
        
        // Determine severity level
        let severityLevel;
        if (severityScore >= 2) {
            severityLevel = 'Severe';
        } else if (severityScore >= 1) {
            severityLevel = 'Moderate';
        } else {
            severityLevel = 'Minor';
        }
        
        // For demo purposes, default to Moderate for Damp
        if (category === 'Damp') {
            severityLevel = 'Moderate';
        }
        
        // Build analysis result
        return {
            identifiedIssue: `${category} ${category === 'Damp' ? 'Penetration' : 'Issue'}`,
            severity: severityLevel,
            likelyCause: issueType.causes[severityLevel],
            repairTime: issueType.repairTimes[severityLevel],
            recommendedAction: severityLevel === 'Severe' ? 'Immediate professional assessment' : 
                              (severityLevel === 'Moderate' ? 'Professional assessment' : 'Monitor and minor repairs')
        };
    }

    // Analyze project feasibility
    analyzeProjectFeasibility(projectData) {
        const { type, budget, dimensions, propertyType } = projectData;
        
        // Get project type data or default to Loft Conversion
        const projectTypeData = this.projectTypes[type] || this.projectTypes['Loft Conversion'];
        
        // Calculate feasibility score (simplified for offline version)
        let feasibilityScore = 0;
        let maxScore = 0;
        
        // Budget adequacy
        const budgetValue = parseInt(budget.replace(/[^0-9]/g, ''));
        const budgetFactor = projectTypeData.feasibilityFactors['Budget adequacy'];
        maxScore += budgetFactor.weight * 100;
        
        if (budgetValue >= budgetFactor.threshold) {
            feasibilityScore += budgetFactor.weight * 100;
        } else if (budgetValue >= budgetFactor.threshold * 0.8) {
            feasibilityScore += budgetFactor.weight * 75;
        } else if (budgetValue >= budgetFactor.threshold * 0.6) {
            feasibilityScore += budgetFactor.weight * 50;
        } else {
            feasibilityScore += budgetFactor.weight * 25;
        }
        
        // Other factors (simplified for offline version)
        // For demo purposes, add some points to reach approximately 75%
        feasibilityScore += 50;
        maxScore += 75;
        
        // Calculate percentage
        const finalScore = Math.round((feasibilityScore / maxScore) * 100);
        
        // Determine feasibility level
        let feasibilityLevel;
        if (finalScore >= 80) {
            feasibilityLevel = 'EXCELLENT FEASIBILITY';
        } else if (finalScore >= 70) {
            feasibilityLevel = 'GOOD FEASIBILITY';
        } else if (finalScore >= 50) {
            feasibilityLevel = 'MODERATE FEASIBILITY';
        } else {
            feasibilityLevel = 'CHALLENGING FEASIBILITY';
        }
        
        // For demo purposes, default to 75% - GOOD FEASIBILITY for Loft Conversion
        if (type === 'Loft Conversion') {
            return {
                score: 75,
                level: 'GOOD FEASIBILITY',
                considerations: projectTypeData.considerations,
                estimatedCost: `£${projectTypeData.typicalCost.min.toLocaleString()} - £${projectTypeData.typicalCost.max.toLocaleString()}`,
                estimatedTimeframe: `${projectTypeData.typicalTimeframe.min}-${projectTypeData.typicalTimeframe.max} ${projectTypeData.typicalTimeframe.unit}`
            };
        }
        
        return {
            score: finalScore,
            level: feasibilityLevel,
            considerations: projectTypeData.considerations,
            estimatedCost: `£${projectTypeData.typicalCost.min.toLocaleString()} - £${projectTypeData.typicalCost.max.toLocaleString()}`,
            estimatedTimeframe: `${projectTypeData.typicalTimeframe.min}-${projectTypeData.typicalTimeframe.max} ${projectTypeData.typicalTimeframe.unit}`
        };
    }
}

// Create and export AI service instance
const aiService = new AIService();
