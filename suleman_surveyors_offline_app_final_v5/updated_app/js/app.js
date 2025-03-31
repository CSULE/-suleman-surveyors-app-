// Main Application JavaScript for Suleman Surveyors App

// App State
const appState = {
    currentScreen: 'home',
    currentStep: 1,
    userData: {
        name: 'John',
        projects: [],
        appointments: []
    },
    currentProject: null,
    currentIssue: null
};

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Show splash screen for 3 seconds then fade out
    const splashScreen = document.getElementById('splash-screen');
    
    // Make sure splash screen is visible
    splashScreen.classList.remove('hidden');
    
    // After 3 seconds, hide the splash screen
    setTimeout(() => {
        splashScreen.classList.add('hidden');
        
        // After transition completes, remove from DOM to improve performance
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 800); // Match this to the CSS transition time
    }, 3000);
    
    initApp();
    setupEventListeners();
    loadInitialData();
});

// Initialize the app
function initApp() {
    // Load the home screen by default
    renderScreen('home');
    
    // Set active navigation
    updateNavigation('home');
}

// Set up event listeners
function setupEventListeners() {
    // Navigation event listeners
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const screen = e.currentTarget.dataset.screen;
            renderScreen(screen);
            updateNavigation(screen);
        });
    });
    
    // Global event delegation for dynamic elements
    document.getElementById('app-content').addEventListener('click', (e) => {
        // Handle back button clicks
        if (e.target.closest('.back-button')) {
            handleBackButton();
        }
        
        // Handle option card clicks on home screen
        if (e.target.closest('.report-option')) {
            startReportIssueFlow();
        }
        
        if (e.target.closest('.plan-option')) {
            startPlanProjectFlow();
        }
        
        // Handle next button clicks
        if (e.target.closest('.btn')) {
            if (e.target.closest('.btn').textContent.includes('Next')) {
                handleNextButton();
            }
        }
        
        // Handle project view clicks
        if (e.target.closest('.project-action') && e.target.closest('.project-action').textContent.includes('View')) {
            const projectId = e.target.closest('.project-card').dataset.id;
            viewProject(projectId);
        }
    });
}

// Load initial data
function loadInitialData() {
    // In a real app, this would load from IndexedDB
    // For now, we'll use mock data
    
    appState.userData.projects = [
        {
            id: 'p1',
            type: 'Loft Conversion',
            address: '123 Sample Street, London',
            status: 'In Progress',
            budget: '£45,000',
            dimensions: '4.2m × 5.8m (24.36m²)',
            procurementRoute: 'Traditional'
        },
        {
            id: 'i1',
            type: 'Damp Assessment',
            address: '456 Example Road, London',
            status: 'Scheduled',
            severity: 'Moderate',
            cause: 'Water ingress through damaged exterior pointing'
        }
    ];
    
    appState.userData.appointments = [
        {
            id: 'a1',
            date: 'Apr 2',
            time: '10:00 AM',
            type: 'Site Visit',
            location: '123 Sample Street, London'
        },
        {
            id: 'a2',
            date: 'Apr 5',
            time: '2:30 PM',
            type: 'Consultation',
            location: 'Suleman Surveyors Office'
        }
    ];
}

// Render screen based on name
function renderScreen(screenName) {
    const appContent = document.getElementById('app-content');
    appState.currentScreen = screenName;
    
    switch(screenName) {
        case 'home':
            renderHomeScreen(appContent);
            break;
        case 'projects':
            renderProjectsScreen(appContent);
            break;
        case 'profile':
            renderProfileScreen(appContent);
            break;
        default:
            renderHomeScreen(appContent);
    }
}

// Update navigation active state
function updateNavigation(activeScreen) {
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.dataset.screen === activeScreen) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Handle back button
function handleBackButton() {
    if (appState.currentScreen === 'report-issue' || appState.currentScreen === 'plan-project') {
        // If in a flow, go back to previous step or home
        if (appState.currentStep > 1) {
            appState.currentStep--;
            if (appState.currentScreen === 'report-issue') {
                renderReportIssueScreen(document.getElementById('app-content'), appState.currentStep);
            } else {
                renderPlanProjectScreen(document.getElementById('app-content'), appState.currentStep);
            }
        } else {
            // Back to home
            renderScreen('home');
            updateNavigation('home');
        }
    } else {
        // Default back to home
        renderScreen('home');
        updateNavigation('home');
    }
}

// Handle next button
function handleNextButton() {
    if (appState.currentScreen === 'report-issue') {
        // In report issue flow
        if (appState.currentStep < 4) {
            appState.currentStep++;
            renderReportIssueScreen(document.getElementById('app-content'), appState.currentStep);
        } else {
            // Flow complete, go to dashboard
            renderScreen('home');
            updateNavigation('home');
        }
    } else if (appState.currentScreen === 'plan-project') {
        // In plan project flow
        if (appState.currentStep < 6) {
            appState.currentStep++;
            renderPlanProjectScreen(document.getElementById('app-content'), appState.currentStep);
        } else {
            // Flow complete, go to dashboard
            renderScreen('home');
            updateNavigation('home');
        }
    }
}

// Start report issue flow
function startReportIssueFlow() {
    appState.currentScreen = 'report-issue';
    appState.currentStep = 1;
    renderReportIssueScreen(document.getElementById('app-content'), 1);
}

// Start plan project flow
function startPlanProjectFlow() {
    appState.currentScreen = 'plan-project';
    appState.currentStep = 1;
    renderPlanProjectScreen(document.getElementById('app-content'), 1);
}

// View project details
function viewProject(projectId) {
    const project = appState.userData.projects.find(p => p.id === projectId);
    if (project) {
        appState.currentProject = project;
        
        if (project.id.startsWith('p')) {
            // It's a renovation project
            appState.currentScreen = 'plan-project';
            appState.currentStep = 5; // Show feasibility report
            renderPlanProjectScreen(document.getElementById('app-content'), 5);
        } else {
            // It's an issue report
            appState.currentScreen = 'report-issue';
            appState.currentStep = 2; // Show diagnosis
            renderReportIssueScreen(document.getElementById('app-content'), 2);
        }
    }
}

// Render Home Screen
function renderHomeScreen(container) {
    container.innerHTML = `
        <div class="logo-container">
            <img src="images/logo.png" alt="Suleman Surveyors Logo" class="logo">
        </div>
        
        <div class="main-options">
            <div class="option-card report-option">
                <div class="option-icon">
                    <img src="images/report-icon.png" alt="Report Icon" width="24">
                </div>
                <div class="option-content">
                    <h3>Report an Issue</h3>
                    <p>Diagnose defects & get expert help</p>
                </div>
            </div>
            
            <div class="option-card plan-option">
                <div class="option-icon">
                    <img src="images/plan-icon.png" alt="Plan Icon" width="24">
                </div>
                <div class="option-content">
                    <h3>Plan an Extension or Renovation</h3>
                    <p>Design, budget & feasibility planning</p>
                </div>
            </div>
        </div>
    `;
}

// Render Projects Screen (Dashboard)
function renderProjectsScreen(container) {
    container.innerHTML = `
        <div class="dashboard">
            <div class="dashboard-welcome">
                <h2>Welcome, ${appState.userData.name}</h2>
                <p>Your projects and appointments</p>
            </div>
            
            <div class="dashboard-section">
                <h3>Active Projects</h3>
                <div class="projects-list">
                    ${renderProjectsList()}
                </div>
            </div>
            
            <div class="dashboard-section">
                <h3>Upcoming Appointments</h3>
                <div class="appointments-list">
                    ${renderAppointmentsList()}
                </div>
            </div>
        </div>
    `;
}

// Render Profile Screen
function renderProfileScreen(container) {
    container.innerHTML = `
        <div class="screen-title">Profile</div>
        
        <div class="profile-content">
            <div class="profile-section">
                <h3>Personal Information</h3>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" value="${appState.userData.name}" readonly>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" value="john.doe@example.com" readonly>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="tel" class="form-control" value="+44 7700 900123" readonly>
                </div>
            </div>
            
            <div class="btn-container">
                <button class="btn">Edit Profile</button>
            </div>
        </div>
    `;
}

// Render Report Issue Screen
function renderReportIssueScreen(container, step) {
    let content = `
        <div class="back-button">←</div>
        <div class="screen-title">${getReportIssueTitle(step)}</div>
        
        <div class="progress-indicator">
            ${renderProgressSteps(4, step)}
        </div>
        
        <div class="step-title">${getReportIssueStepTitle(step)}</div>
    `;
    
    // Step specific content
    switch(step) {
        case 1:
            content += renderReportIssueStep1();
            break;
        case 2:
            content += renderReportIssueStep2();
            break;
        case 3:
            content += renderReportIssueStep3();
            break;
        case 4:
            content += renderReportIssueStep4();
            break;
    }
    
    container.innerHTML = content;
}

// Render Plan Project Screen
function renderPlanProjectScreen(container, step) {
    let content = `
        <div class="back-button">←</div>
        <div class="screen-title">${getPlanProjectTitle(step)}</div>
        
        <div class="progress-indicator">
            ${renderProgressSteps(6, step)}
        </div>
        
        <div class="step-title">${getPlanProjectStepTitle(step)}</div>
    `;
    
    // Step specific content
    switch(step) {
        case 1:
            content += renderPlanProjectStep1();
            break;
        case 2:
            content += renderPlanProjectStep2();
            break;
        case 3:
            content += renderPlanProjectStep3();
            break;
        case 4:
            content += renderPlanProjectStep4();
            break;
        case 5:
            content += renderPlanProjectStep5();
            break;
        case 6:
            content += renderPlanProjectStep6();
            break;
    }
    
    container.innerHTML = content;
}

// Helper Functions

// Render progress steps
function renderProgressSteps(totalSteps, currentStep) {
    let stepsHtml = '';
    
    for (let i = 1; i <= totalSteps; i++) {
        let stepClass = '';
        if (i < currentStep) {
            stepClass = 'completed';
        } else if (i === currentStep) {
            stepClass = 'active';
        }
        
        stepsHtml += `<div class="progress-step ${stepClass}"></div>`;
    }
    
    return stepsHtml;
}

// Get report issue screen title
function getReportIssueTitle(step) {
    switch(step) {
        case 1: return 'Report an Issue';
        case 2: return 'AI Diagnosis';
        case 3: return 'Next Steps';
        case 4: return 'Confirmation';
        default: return 'Report an Issue';
    }
}

// Get report issue step title
function getReportIssueStepTitle(step) {
    switch(step) {
        case 1: return 'Step 1: Issue Details';
        case 2: return 'Step 2: AI Analysis';
        case 3: return 'Step 3: Choose Next Steps';
        case 4: return 'Step 4: Confirmation';
        default: return 'Step 1: Issue Details';
    }
}

// Get plan project screen title
function getPlanProjectTitle(step) {
    switch(step) {
        case 1: return 'Project Overview';
        case 2: return 'Goals & Budget';
        case 3: return 'Property Details';
        case 4: return 'Procurement Route';
        case 5: return 'AI Feasibility Report';
        case 6: return 'Next Steps';
        default: return 'Project Overview';
    }
}

// Get plan project step title
function getPlanProjectStepTitle(step) {
    switch(step) {
        case 1: return 'Step 1: Project Type & Location';
        case 2: return 'Step 2: Project Goals & Budget';
        case 3: return 'Step 3: Property Details';
        case 4: return 'Step 4: Procurement Route Selection';
        case 5: return 'Step 5: AI Feasibility Analysis';
        case 6: return 'Step 6: Schedule Consultation';
        default: return 'Step 1: Project Type & Location';
    }
}

// Render projects list
function renderProjectsList() {
    if (appState.userData.projects.length === 0) {
        return '<p>No active projects</p>';
    }
    
    return appState.userData.projects.map(project => {
        const isIssue = project.id.startsWith('i');
        return `
            <div class="project-card ${isIssue ? 'issue' : ''}" data-id="${project.id}">
                <div class="project-status ${project.status === 'Scheduled' ? 'scheduled' : ''}">${project.status}</div>
                <h4>${project.type}</h4>
                <div class="project-address">${project.address}</div>
                <div class="project-actions">
                    <div class="project-action">View</div>
                </div>
            </div>
        `;
    }).join('');
}

// Render appointments list
function renderAppointmentsList() {
    if (appState.userData.appointments.length === 0) {
        return '<p>No upcoming appointments</p>';
    }
    
    return appState.userData.appointments.map(appointment => {
        return `
            <div class="appointment-card" data-id="${appointment.id}">
                <div class="appointment-date">
                    <div class="appointment-day">${appointment.date}</div>
                    <div class="appointment-time">${appointment.time}</div>
                </div>
                <div class="appointment-details">
                    <div class="appointment-type">${appointment.type}</div>
                    <div class="appointment-location">${appointment.location}</div>
                </div>
            </div>
        `;
    }).join('');
}

// Render Report Issue Step 1
function renderReportIssueStep1() {
    return `
        <div class="upload-area">
            <div class="upload-icon">
                <img src="images/upload-icon.png" alt="Upload" width="24">
            </div>
            <div class="upload-text">Upload Photo(s) of Defect</div>
            <div class="upload-subtext">Tap to take a photo or upload from gallery</div>
        </div>
        
        <div class="form-group">
            <textarea class="form-control" placeholder="Describe the issue..." rows="5"></textarea>
        </div>
        
        <div class="form-group">
            <label>Select Issue Category:</label>
            <div class="option-list">
                <div class="option-item selected">
                    <div>Leak</div>
                    <div class="option-radio"></div>
                </div>
                <div class="option-item">
                    <div>Crack</div>
                    <div class="option-radio"></div>
                </div>
                <div class="option-item">
                    <div>Damp</div>
                    <div class="option-radio"></div>
                </div>
                <div class="option-item">
                    <div>Structural</div>
                    <div class="option-radio"></div>
                </div>
            </div>
        </div>
        
        <div class="btn-container">
            <button class="btn">Next</button>
        </div>
    `;
}

// Render Report Issue Step 2
function renderReportIssueStep2() {
    return `
        <div class="ai-status">AI Analysis Complete</div>
        
        <div class="ai-image">
            <img src="images/sample-issue.jpg" alt="User's Photo" style="width: 100%; height: 200px; background-color: #ddd; border-radius: 8px; object-fit: cover;">
        </div>
        
        <div class="ai-result">
            <div class="ai-result-item">
                <span class="ai-result-label">AI Diagnosis:</span>
                <span class="severity-badge">MODERATE</span>
            </div>
            
            <div class="ai-result-item">
                <span class="ai-result-label">Identified Issue:</span>
                <span>Damp Penetration</span>
            </div>
            
            <div class="ai-result-item">
                <span class="ai-result-label">Severity:</span>
                <span>Moderate</span>
            </div>
            
            <div class="ai-result-item">
                <span class="ai-result-label">Likely Cause:</span>
                <span>Water ingress through damaged exterior pointing, allowing moisture to penetrate the wall and cause internal dampness.</span>
            </div>
        </div>
        
        <div class="btn-container">
            <button class="btn">Next</button>
        </div>
    `;
}

// Render Report Issue Step 3
function renderReportIssueStep3() {
    return `
        <div class="project-summary">
            <div class="summary-item">
                <span class="summary-label">Issue Summary:</span>
            </div>
            <div>Damp Penetration (Moderate)</div>
            <div>Requires professional assessment</div>
            <div>Estimated repair time: 2-3 days</div>
        </div>
        
        <div class="form-group">
            <label>What would you like to do next?</label>
            <div class="option-list">
                <div class="option-item selected">
                    <div>
                        <strong>Book a Site Visit</strong>
                        <div>Schedule an in-person assessment with a qualified surveyor</div>
                    </div>
                    <div class="option-radio"></div>
                </div>
                
                <div class="option-item">
                    <div>
                        <strong>Request a Repair Quote</strong>
                        <div>Get an estimate for repairs based on AI diagnosis</div>
                    </div>
                    <div class="option-radio"></div>
                </div>
            </div>
        </div>
        
        <div class="btn-container">
            <button class="btn">Next</button>
        </div>
    `;
}

// Render Report Issue Step 4
function renderReportIssueStep4() {
    return `
        <div class="confirmation-content">
            <div class="confirmation-icon" style="width: 80px; height: 80px; background-color: #4caf50; border-radius: 50%; margin: 0 auto 20px; display: flex; justify-content: center; align-items: center; color: white; font-size: 40px;">✓</div>
            
            <h3 style="text-align: center; margin-bottom: 20px;">Request Submitted</h3>
            
            <p style="text-align: center; margin-bottom: 30px;">Your site visit request has been submitted. A surveyor will contact you within 24 hours to schedule an appointment.</p>
            
            <div class="project-summary">
                <div class="summary-item">
                    <span class="summary-label">Reference Number:</span>
                    <span>SR-2025-0342</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">Issue Type:</span>
                    <span>Damp Penetration</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">Severity:</span>
                    <span>Moderate</span>
                </div>
                
                <div class="summary-item">
                    <span class="summary-label">Request Type:</span>
                    <span>Site Visit</span>
                </div>
            </div>
        </div>
        
        <div class="btn-container">
            <button class="btn">Done</button>
        </div>
    `;
}

// Render Plan Project Step 1
function renderPlanProjectStep1() {
    return `
        <div class="form-group">
            <label>Select Project Type:</label>
            <div class="option-list">
                <div class="option-item selected">
                    <div>Loft Conversion</div>
                    <div class="option-radio"></div>
                </div>
                <div class="option-item">
                    <div>Rear Extension</div>
                    <div class="option-radio"></div>
                </div>
                <div class="option-item">
                    <div>Side Extension</div>
                    <div class="option-radio"></div>
                </div>
                <div class="option-item">
                    <div>Renovation</div>
                    <div class="option-radio"></div>
                </div>
                <div class="option-item">
                    <div>Other</div>
                    <div class="option-radio"></div>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label>Property Address:</label>
            <input type="text" class="form-control" placeholder="Enter your full address">
        </div>
        
        <div class="form-group">
            <label>Property Type:</label>
            <select class="form-control">
                <option>Detached House</option>
                <option>Semi-Detached House</option>
                <option>Terraced House</option>
                <option>Flat/Apartment</option>
                <option>Bungalow</option>
                <option>Other</option>
            </select>
        </div>
        
        <div class="btn-container">
            <button class="btn">Next</button>
        </div>
    `;
}

// Render Plan Project Step 2
function renderPlanProjectStep2() {
    return `
        <div class="project-summary">
            <div class="summary-item">
                <span class="summary-label">Project:</span>
                <span>Loft Conversion</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Location:</span>
                <span>123 Sample Street, London</span>
            </div>
        </div>
        
        <div class="form-group">
            <label>What is the main purpose of your project?</label>
            <div class="option-list">
                <div class="option-item selected">
                    <div>Add more space</div>
                    <div class="option-radio"></div>
                </div>
                <div class="option-item">
                    <div>Modernize property</div>
                    <div class="option-radio"></div>
                </div>
                <div class="option-item">
                    <div>Increase property value</div>
                    <div class="option-radio"></div>
                </div>
                <div class="option-item">
                    <div>Improve energy efficiency</div>
                    <div class="option-radio"></div>
                </div>
                <div class="option-item">
                    <div>Other</div>
                    <div class="option-radio"></div>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label>What is your estimated budget?</label>
            <div style="padding: 10px 0;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>£10,000</span>
                    <span>£100,000+</span>
                </div>
                <input type="range" min="10000" max="100000" value="45000" step="5000" style="width: 100%;">
                <div style="text-align: center; margin-top: 10px; font-weight: 500;">£45,000</div>
            </div>
        </div>
        
        <div class="btn-container">
            <button class="btn">Next</button>
        </div>
    `;
}

// Render Plan Project Step 3
function renderPlanProjectStep3() {
    return `
        <div class="project-summary">
            <div class="summary-item">
                <span class="summary-label">Project:</span>
                <span>Loft Conversion</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Location:</span>
                <span>123 Sample Street, London</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Budget:</span>
                <span>£45,000</span>
            </div>
        </div>
        
        <div class="form-group">
            <label>Upload Photos/Floorplans/Sketches</label>
            <div class="upload-area">
                <div class="upload-icon">
                    <img src="images/upload-icon.png" alt="Upload" width="24">
                </div>
                <div class="upload-text">Tap to upload photos or documents</div>
            </div>
        </div>
        
        <div class="ar-container">
            <div>
                <label>Measure with AR</label>
                <p style="font-size: 14px; color: #666; margin-top: 5px;">Use your camera to automatically measure rooms and spaces</p>
            </div>
            
            <div class="ar-button">
                <div class="ar-icon">AR</div>
                <span>Start AR Measurement</span>
            </div>
            
            <div class="ar-preview">
                AR camera preview will appear here
            </div>
        </div>
        
        <div class="btn-container">
            <button class="btn">Next</button>
        </div>
    `;
}

// Render Plan Project Step 4
function renderPlanProjectStep4() {
    return `
        <div class="project-summary">
            <div class="summary-item">
                <span class="summary-label">Project:</span>
                <span>Loft Conversion</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Location:</span>
                <span>123 Sample Street, London</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Budget:</span>
                <span>£45,000</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Room Dimensions:</span>
                <span>4.2m × 5.8m (24.36m²)</span>
            </div>
        </div>
        
        <div class="form-group">
            <label>Select Procurement Route:</label>
            <p style="font-size: 14px; color: #666; margin-bottom: 15px;">This determines how your project will be managed</p>
            
            <div class="option-list">
                <div class="option-item selected">
                    <div>
                        <strong>Traditional</strong>
                        <div style="font-size: 14px; color: #666;">Design then Tender</div>
                    </div>
                    <div class="option-radio"></div>
                </div>
                
                <div class="option-item">
                    <div>
                        <strong>Design & Build</strong>
                        <div style="font-size: 14px; color: #666;">Single contractor</div>
                    </div>
                    <div class="option-radio"></div>
                </div>
                
                <div class="option-item">
                    <div>
                        <strong>Self-managed</strong>
                        <div style="font-size: 14px; color: #666;">You coordinate trades</div>
                    </div>
                    <div class="option-radio"></div>
                </div>
                
                <div class="option-item">
                    <div>
                        <strong>Not Sure</strong>
                        <div style="font-size: 14px; color: #666;">AI suggests route</div>
                    </div>
                    <div class="option-radio"></div>
                </div>
            </div>
        </div>
        
        <div class="btn-container">
            <button class="btn">Next</button>
        </div>
    `;
}

// Render Plan Project Step 5
function renderPlanProjectStep5() {
    return `
        <div class="ai-status">AI Analysis Complete</div>
        
        <div class="project-summary">
            <div class="summary-item">
                <span class="summary-label">Project:</span>
                <span>Loft Conversion</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Location:</span>
                <span>123 Sample Street, London</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Budget:</span>
                <span>£45,000</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Room Dimensions:</span>
                <span>4.2m × 5.8m (24.36m²)</span>
            </div>
        </div>
        
        <div class="feasibility-score">
            <label>Feasibility Score:</label>
            <div class="score-bar">
                <div class="score-fill" style="width: 75%;"></div>
            </div>
            <div class="score-label">GOOD FEASIBILITY</div>
        </div>
        
        <div class="considerations-list">
            <label>Key Considerations:</label>
            
            <div class="consideration-item">
                <div class="consideration-icon" style="background-color: #ffc107;"></div>
                <div class="consideration-text">Planning permission likely required</div>
            </div>
            
            <div class="consideration-item">
                <div class="consideration-icon" style="background-color: #4caf50;"></div>
                <div class="consideration-text">Budget appears adequate for scope</div>
            </div>
            
            <div class="consideration-item">
                <div class="consideration-icon" style="background-color: #2196f3;"></div>
                <div class="consideration-text">Timeline estimate: 3-4 months</div>
            </div>
            
            <div class="consideration-item">
                <div class="consideration-icon" style="background-color: #4caf50;"></div>
                <div class="consideration-text">No conservation area restrictions</div>
            </div>
        </div>
        
        <div style="text-align: center; margin: 20px 0;">
            <button class="btn" style="background-color: transparent; color: #2196f3; border: 1px solid #2196f3;">Download Full Report</button>
        </div>
        
        <div class="btn-container">
            <button class="btn">Next</button>
        </div>
    `;
}

// Render Plan Project Step 6
function renderPlanProjectStep6() {
    return `
        <div class="project-summary">
            <div class="summary-item">
                <span class="summary-label">Project:</span>
                <span>Loft Conversion</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Feasibility:</span>
                <span>Good (75%)</span>
            </div>
        </div>
        
        <div class="form-group">
            <label>Schedule a Consultation</label>
            <p style="font-size: 14px; color: #666; margin-bottom: 15px;">Select a date and time to discuss your project with a surveyor</p>
            
            <div style="margin-bottom: 20px;">
                <label>Select Date:</label>
                <input type="date" class="form-control" value="2025-04-10">
            </div>
            
            <div>
                <label>Available Time Slots:</label>
                <div class="option-list">
                    <div class="option-item selected">
                        <div>10:00 AM - 11:00 AM</div>
                        <div class="option-radio"></div>
                    </div>
                    <div class="option-item">
                        <div>1:00 PM - 2:00 PM</div>
                        <div class="option-radio"></div>
                    </div>
                    <div class="option-item">
                        <div>3:30 PM - 4:30 PM</div>
                        <div class="option-radio"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="form-group">
            <label>Consultation Type:</label>
            <div class="option-list">
                <div class="option-item selected">
                    <div>Video Call</div>
                    <div class="option-radio"></div>
                </div>
                <div class="option-item">
                    <div>In-Person (at your property)</div>
                    <div class="option-radio"></div>
                </div>
                <div class="option-item">
                    <div>Office Meeting</div>
                    <div class="option-radio"></div>
                </div>
            </div>
        </div>
        
        <div class="btn-container">
            <button class="btn">Confirm Booking</button>
        </div>
    `;
}
