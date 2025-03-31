// Offline Storage for Suleman Surveyors AI App
// Handles local data persistence using IndexedDB

// IndexedDB database configuration
const DB_NAME = 'SulemanSurveyorsDB';
const DB_VERSION = 1;
const STORES = {
    ISSUES: 'issues',
    PROJECTS: 'projects',
    IMAGES: 'images'
};

// Initialize the database
function initDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        
        request.onerror = event => {
            console.error('IndexedDB error:', event.target.error);
            reject('Could not open database');
        };
        
        request.onsuccess = event => {
            const db = event.target.result;
            console.log('Database opened successfully');
            resolve(db);
        };
        
        request.onupgradeneeded = event => {
            const db = event.target.result;
            
            // Create object stores if they don't exist
            if (!db.objectStoreNames.contains(STORES.ISSUES)) {
                const issuesStore = db.createObjectStore(STORES.ISSUES, { keyPath: 'id', autoIncrement: true });
                issuesStore.createIndex('category', 'category', { unique: false });
                issuesStore.createIndex('date', 'date', { unique: false });
            }
            
            if (!db.objectStoreNames.contains(STORES.PROJECTS)) {
                const projectsStore = db.createObjectStore(STORES.PROJECTS, { keyPath: 'id', autoIncrement: true });
                projectsStore.createIndex('type', 'type', { unique: false });
                projectsStore.createIndex('date', 'date', { unique: false });
            }
            
            if (!db.objectStoreNames.contains(STORES.IMAGES)) {
                db.createObjectStore(STORES.IMAGES, { keyPath: 'name' });
            }
            
            console.log('Object stores created');
        };
    });
}

// Get database connection
async function getDB() {
    try {
        return await initDatabase();
    } catch (error) {
        console.error('Failed to initialize database:', error);
        throw error;
    }
}

// Store issue data
async function storeIssue(issueData) {
    try {
        const db = await getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORES.ISSUES], 'readwrite');
            const store = transaction.objectStore(STORES.ISSUES);
            
            // Add timestamp
            issueData.date = new Date().toISOString();
            
            const request = store.add(issueData);
            
            request.onsuccess = event => {
                console.log('Issue stored successfully');
                resolve(event.target.result); // Returns the ID
            };
            
            request.onerror = event => {
                console.error('Error storing issue:', event.target.error);
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error('Failed to store issue:', error);
        throw error;
    }
}

// Store project data
async function storeProject(projectData) {
    try {
        const db = await getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORES.PROJECTS], 'readwrite');
            const store = transaction.objectStore(STORES.PROJECTS);
            
            // Add timestamp
            projectData.date = new Date().toISOString();
            
            const request = store.add(projectData);
            
            request.onsuccess = event => {
                console.log('Project stored successfully');
                resolve(event.target.result); // Returns the ID
            };
            
            request.onerror = event => {
                console.error('Error storing project:', event.target.error);
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error('Failed to store project:', error);
        throw error;
    }
}

// Store image data
async function storeImage(name, dataUrl) {
    try {
        const db = await getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORES.IMAGES], 'readwrite');
            const store = transaction.objectStore(STORES.IMAGES);
            
            const imageData = {
                name: name,
                data: dataUrl,
                date: new Date().toISOString()
            };
            
            const request = store.put(imageData);
            
            request.onsuccess = event => {
                console.log('Image stored successfully');
                resolve(event.target.result);
            };
            
            request.onerror = event => {
                console.error('Error storing image:', event.target.error);
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error('Failed to store image:', error);
        throw error;
    }
}

// Get all issues
async function getAllIssues() {
    try {
        const db = await getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORES.ISSUES], 'readonly');
            const store = transaction.objectStore(STORES.ISSUES);
            const request = store.getAll();
            
            request.onsuccess = event => {
                resolve(event.target.result);
            };
            
            request.onerror = event => {
                console.error('Error getting issues:', event.target.error);
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error('Failed to get issues:', error);
        throw error;
    }
}

// Get all projects
async function getAllProjects() {
    try {
        const db = await getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORES.PROJECTS], 'readonly');
            const store = transaction.objectStore(STORES.PROJECTS);
            const request = store.getAll();
            
            request.onsuccess = event => {
                resolve(event.target.result);
            };
            
            request.onerror = event => {
                console.error('Error getting projects:', event.target.error);
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error('Failed to get projects:', error);
        throw error;
    }
}

// Get image by name
async function getImage(name) {
    try {
        const db = await getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORES.IMAGES], 'readonly');
            const store = transaction.objectStore(STORES.IMAGES);
            const request = store.get(name);
            
            request.onsuccess = event => {
                resolve(event.target.result);
            };
            
            request.onerror = event => {
                console.error('Error getting image:', event.target.error);
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error('Failed to get image:', error);
        throw error;
    }
}

// Delete issue by ID
async function deleteIssue(id) {
    try {
        const db = await getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORES.ISSUES], 'readwrite');
            const store = transaction.objectStore(STORES.ISSUES);
            const request = store.delete(id);
            
            request.onsuccess = event => {
                console.log('Issue deleted successfully');
                resolve(true);
            };
            
            request.onerror = event => {
                console.error('Error deleting issue:', event.target.error);
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error('Failed to delete issue:', error);
        throw error;
    }
}

// Delete project by ID
async function deleteProject(id) {
    try {
        const db = await getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORES.PROJECTS], 'readwrite');
            const store = transaction.objectStore(STORES.PROJECTS);
            const request = store.delete(id);
            
            request.onsuccess = event => {
                console.log('Project deleted successfully');
                resolve(true);
            };
            
            request.onerror = event => {
                console.error('Error deleting project:', event.target.error);
                reject(event.target.error);
            };
        });
    } catch (error) {
        console.error('Failed to delete project:', error);
        throw error;
    }
}

// Export data for backup
async function exportData() {
    try {
        const issues = await getAllIssues();
        const projects = await getAllProjects();
        
        const exportData = {
            issues: issues,
            projects: projects,
            exportDate: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(exportData);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        
        const exportFileName = `suleman_surveyors_backup_${new Date().toISOString().slice(0, 10)}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileName);
        linkElement.click();
        
        return true;
    } catch (error) {
        console.error('Failed to export data:', error);
        throw error;
    }
}

// Initialize database when the script loads
initDatabase().catch(error => console.error('Database initialization failed:', error));
