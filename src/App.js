import React, { useState, useEffect } from 'react';
import './App.css';

// Mock/API URL (using JSON Placeholder)
const API_URL = 'https://jsonplaceholder.typicode.com/users';

//=========================
//   Header Component
//=========================
const Header = ({ onNavigate }) => (
  <header className="header">
    <h1 className="logo">Jarurat Care 🩺</h1>
    <nav>
      <a href="#home" onClick={() => onNavigate('home')}>Home</a>
      <a href="#patients" onClick={() => onNavigate('patients')}>Patients</a>
      <a href="#about" onClick={() => onNavigate('about')}>About</a>
    </nav>
  </header>
);

//=========================
// Patient Card Component
//=========================
const PatientCard = ({ patient, onViewDetails }) => (
  <div className="patient-card">
    <h3>{patient.name}</h3>
    <p><strong>Age:</strong> {patient.age}</p>
    <p><strong>Contact:</strong> {patient.phone.split(' ')[0]}</p>
    <button onClick={() => onViewDetails(patient)}>View Details</button>
  </div>
);

//=========================
// Patient Modal Component
//=========================
const PatientModal = ({ patient, onClose }) => {
  if (!patient) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{patient.name}'s Details</h2>
        <p><strong>Username:</strong> {patient.username}</p>
        <p><strong>Age:</strong> {patient.age} years</p>
        <p><strong>Email:</strong> {patient.email}</p>
        <p><strong>Phone:</strong> {patient.phone.split(' ')[0]}</p>
        <p><strong>Website:</strong> {patient.website}</p>
        <p><strong>Address:</strong> {`${patient.address.street}, ${patient.address.city}`}</p>
      </div>
    </div>
  );
};

//=========================
// Add Patient Form Component (Bonus)
//=========================
const AddPatientForm = ({ onAddPatient }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [contact, setContact] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !age || !contact) {
            alert("Please fill all fields.");
            return;
        }
        const newPatient = {
            id: Date.now(), // simple unique id
            name,
            age: parseInt(age),
            phone: contact,
            email: 'N/A',
            address: { street: 'N/A', city: 'N/A' }
        };
        onAddPatient(newPatient);
        // Reset form
        setName('');
        setAge('');
        setContact('');
    };

    return (
        <form onSubmit={handleSubmit} className="add-patient-form">
            <h3>Add New Patient</h3>
            <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            />
            <input
                type="text"
                placeholder="Contact Number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
            />
            <button type="submit">Add Patient</button>
        </form>
    );
};


//=========================
//  Patients Page Component
//=========================
const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patient data on component mount
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // The API doesn't have age, so we'll add a random one.
        const patientsWithAge = data.map(p => ({
          ...p,
          age: Math.floor(Math.random() * (70 - 20 + 1)) + 20
        }));
        setPatients(patientsWithAge);
        setFilteredPatients(patientsWithAge);
        setError(null);
      } catch (err) {
        setError("Failed to fetch patient data. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Filter patients based on search query
  useEffect(() => {
    const results = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPatients(results);
  }, [searchQuery, patients]);

  const handleAddPatient = (newPatient) => {
    // Add to the main list, which will trigger the filter effect
    const updatedPatients = [newPatient, ...patients];
    setPatients(updatedPatients);
  };

  return (
    <div className="patients-container">
      <h2>Patient Records</h2>
      <div className="controls">
          <input
            type="text"
            placeholder="Search by name..."
            className="search-bar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <AddPatientForm onAddPatient={handleAddPatient} />
      </div>

      {loading && <p className="status-message">Loading patients...</p>}
      {error && <p className="status-message error">{error}</p>}

      {!loading && !error && (
        <div className="patient-grid">
          {filteredPatients.length > 0 ? (
            filteredPatients.map(patient => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onViewDetails={setSelectedPatient}
              />
            ))
          ) : (
            <p className="status-message">No patients found.</p>
          )}
        </div>
      )}

      <PatientModal patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
    </div>
  );
};


//=========================
//       Main App
//=========================
function App() {
  const [currentPage, setCurrentPage] = useState('patients'); // Default to patients page

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <div className="page-content"><h2>Welcome to Jarurat Care</h2><p>Your centralized patient management system.</p></div>;
      case 'patients':
        return <PatientsPage />;
      case 'about':
        return <div className="page-content"><h2>About Us</h2><p>Jarurat Care is dedicated to simplifying healthcare management.</p></div>;
      default:
        return <PatientsPage />;
    }
  };

  return (
    <div className="App">
      <Header onNavigate={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;