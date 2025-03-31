// Storage service for offline data persistence
// Uses IndexedDB for storing user data, projects, and app state

class StorageService {
    constructor() {
        this.dbName = 'sulemanSurveyorsDB';
        this.dbVersion = 1;
        this.db = null;
        this.initDatabase();
    }

    // Initialize the database
    async initDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = (event) => {
                console.error('IndexedDB error:', event.target.error);
                reject('Error opening database');
            };
            
            request.onsuccess = (event) => {
                this.db = event.target.result;
                console.log('Database opened successfully');
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Create object stores
                if (!db.objectStoreNames.contains('userData')) {
                    const userStore = db.createObjectStore('userData', { keyPath: 'id' });
                    userStore.createIndex('name', 'name', { unique: false });
                }
                
                if (!db.objectStoreNames.contains('projects')) {
                    const projectsStore = db.createObjectStore('projects', { keyPath: 'id' });
                    projectsStore.createIndex('type', 'type', { unique: false });
                    projectsStore.createIndex('status', 'status', { unique: false });
                }
                
                if (!db.objectStoreNames.contains('appointments')) {
                    const appointmentsStore = db.createObjectStore('appointments', { keyPath: 'id' });
                    appointmentsStore.createIndex('date', 'date', { unique: false });
                }
                
                if (!db.objectStoreNames.contains('issues')) {
                    const issuesStore = db.createObjectStore('issues', { keyPath: 'id' });
                    issuesStore.createIndex('type', 'type', { unique: false });
                    issuesStore.createIndex('status', 'status', { unique: false });
                }
                
                if (!db.objectStoreNames.contains('appState')) {
                    db.createObjectStore('appState', { keyPath: 'id' });
                }
            };
        });
    }

    // Save user data
    async saveUserData(userData) {
        return this.saveData('userData', { id: 'currentUser', ...userData });
    }

    // Get user data
    async getUserData() {
        return this.getData('userData', 'currentUser');
    }

    // Save project
    async saveProject(project) {
        if (!project.id) {
            project.id = 'p' + Date.now();
        }
        return this.saveData('projects', project);
    }

    // Get all projects
    async getAllProjects() {
        return this.getAllData('projects');
    }

    // Get project by ID
    async getProject(id) {
        return this.getData('projects', id);
    }

    // Save issue
    async saveIssue(issue) {
        if (!issue.id) {
            issue.id = 'i' + Date.now();
        }
        return this.saveData('issues', issue);
    }

    // Get all issues
    async getAllIssues() {
        return this.getAllData('issues');
    }

    // Get issue by ID
    async getIssue(id) {
        return this.getData('issues', id);
    }

    // Save appointment
    async saveAppointment(appointment) {
        if (!appointment.id) {
            appointment.id = 'a' + Date.now();
        }
        return this.saveData('appointments', appointment);
    }

    // Get all appointments
    async getAllAppointments() {
        return this.getAllData('appointments');
    }

    // Save app state
    async saveAppState(state) {
        return this.saveData('appState', { id: 'currentState', ...state });
    }

    // Get app state
    async getAppState() {
        return this.getData('appState', 'currentState');
    }

    // Generic method to save data to any store
    async saveData(storeName, data) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Database not initialized');
                return;
            }
            
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);
            
            request.onsuccess = () => {
                resolve(data);
            };
            
            request.onerror = (event) => {
                console.error('Error saving data:', event.target.error);
                reject('Error saving data');
            };
        });
    }

    // Generic method to get data from any store
    async getData(storeName, key) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Database not initialized');
                return;
            }
            
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);
            
            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
            
            request.onerror = (event) => {
                console.error('Error getting data:', event.target.error);
                reject('Error getting data');
            };
        });
    }

    // Generic method to get all data from a store
    async getAllData(storeName) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Database not initialized');
                return;
            }
            
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            
            request.onsuccess = (event) => {
                resolve(event.target.result);
            };
            
            request.onerror = (event) => {
                console.error('Error getting all data:', event.target.error);
                reject('Error getting all data');
            };
        });
    }

    // Delete data from a store
    async deleteData(storeName, key) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                reject('Database not initialized');
                return;
            }
            
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);
            
            request.onsuccess = () => {
                resolve(true);
            };
            
            request.onerror = (event) => {
                console.error('Error deleting data:', event.target.error);
                reject('Error deleting data');
            };
        });
    }

    // Initialize with sample data for demo purposes
    async initSampleData() {
        // Sample user
        await this.saveUserData({
            name: 'John',
            email: 'john.doe@example.com',
            phone: '+44 7700 900123'
        });
        
        // Sample projects
        await this.saveProject({
            id: 'p1',
            type: 'Loft Conversion',
            address: '123 Sample Street, London',
            status: 'In Progress',
            budget: '£45,000',
            dimensions: '4.2m × 5.8m (24.36m²)',
            procurementRoute: 'Traditional',
            createdAt: new Date().toISOString()
        });
        
        // Sample issues
        await this.saveIssue({
            id: 'i1',
            type: 'Damp Assessment',
            address: '456 Example Road, London',
            status: 'Scheduled',
            severity: 'Moderate',
            cause: 'Water ingress through damaged exterior pointing',
            createdAt: new Date().toISOString()
        });
        
        // Sample appointments
        await this.saveAppointment({
            id: 'a1',
            date: 'Apr 2',
            time: '10:00 AM',
            type: 'Site Visit',
            location: '123 Sample Street, London',
            createdAt: new Date().toISOString()
        });
        
        await this.saveAppointment({
            id: 'a2',
            date: 'Apr 5',
            time: '2:30 PM',
            type: 'Consultation',
            location: 'Suleman Surveyors Office',
            createdAt: new Date().toISOString()
        });
        
        console.log('Sample data initialized');
    }
}

// Create and export storage service instance
const storageService = new StorageService();

// Initialize sample data when in development/demo mode
document.addEventListener('DOMContentLoaded', () => {
    // Check if this is the first run
    storageService.getAppState().then(state => {
        if (!state) {
            // First run, initialize sample data
            storageService.initSampleData().then(() => {
                storageService.saveAppState({ 
                    initialized: true,
                    firstRun: false,
                    lastAccess: new Date().toISOString()
                });
            });
        } else {
            // Update last access time
            state.lastAccess = new Date().toISOString();
            storageService.saveAppState(state);
        }
    });
});
