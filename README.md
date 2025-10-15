# Jarurat Care - Patient Records Dashboard 🩺

A responsive and user-friendly patient management dashboard built with React. This application allows users to view a list of patients, search for specific individuals, view detailed information in a modal, and add new patients to the list.

## Screenshot

Here's what the main dashboard looks like:

<img width="1919" height="1079" alt="Screenshot 2025-10-15 111827" src="https://github.com/user-attachments/assets/90038df3-6c4a-44ff-87b5-c0d75fe0c783" />



---

## ✨ Features

* **Responsive Design:** A clean UI that works seamlessly on both desktop and mobile devices.
* **Fetch Patient Data:** Fetches initial patient data from a public API (`JSONPlaceholder`).
* **Loading & Error States:** Provides user feedback while fetching data or if an error occurs.
* **Search Functionality:** Instantly filter patients by name using the search bar.
* **Patient Details Modal:** Click 'View Details' on any patient card to see more information in a pop-up modal without leaving the page.
* **Add New Patient:** A form to add new patients to the list (updates the local state).
* **Component-Based Architecture:** Built with reusable React components for maintainability.

---

## 🛠️ Tech Stack

* **Frontend:** React.js (with Hooks)
* **Styling:** Plain CSS with Flexbox and Grid for responsiveness.
* **API:** [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for mock patient data.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### **Prerequisites**

You need to have [Node.js](https://nodejs.org/) and `npm` (or `yarn`) installed on your system.

### **Setup Instructions**

1.  **Clone the repository (or download the code):**
    If you have the project files, you can skip to step 2.
    ```bash
    git clone [https://github.com/your-username/jarurat-care-dashboard.git](https://github.com/your-username/jarurat-care-dashboard.git)
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd jarurat-care-dashboard
    ```

3.  **Install dependencies:**
    This command will install all the necessary packages for React.
    ```bash
    npm install
    ```

4.  **Run the application:**
    This will start the development server and open the application in your default browser at `http://localhost:3000`.
    ```bash
    npm start
    ```

The application will automatically reload if you make any changes to the source files.

---

## 📂 File Structure & Component Breakdown

All the application logic is contained within the `src/` directory.

* `App.js`: This is the main file that holds all the components and the core logic.
    * `App()`: The root component that handles page navigation (Home, Patients, About).
    * `Header`: A simple component for the logo and navigation bar.
    * `PatientsPage`: The main component for the "Patients" screen. It manages all patient-related state and logic, including:
        * Fetching data from the API.
        * Handling search/filter functionality.
        * Managing the loading, error, and selected patient states.
    * `PatientCard`: A reusable component to display summary information for a single patient in the grid.
    * `PatientModal`: The modal component that displays detailed information about a selected patient.
    * `AddPatientForm`: A bonus component that provides a form to add a new patient to the local state.
* `App.css`: Contains all the CSS styles for the components, including media queries for responsiveness.
* `index.css`: Global styles applied to the entire application.

---

## ⚙️ How It Works

### **1. Data Fetching**

* When the `PatientsPage` component mounts, a `useEffect` hook is triggered.
* It calls an `async` function `fetchPatients` which sets a `loading` state to `true`.
* It uses the `fetch` API to get user data from `JSONPlaceholder`. To meet the project requirements, a random age is programmatically added to each "patient" object.
* On success, the data is stored in the `patients` state, and `loading` is set to `false`.
* If the fetch fails, an `error` state is set and displayed to the user.

### **2. State Management**

The application uses React Hooks (`useState` and `useEffect`) for all state management:

* `patients`: An array that stores the original, complete list of patients fetched from the API.
* `filteredPatients`: An array that stores the patients to be displayed after applying the search filter.
* `searchQuery`: A string that holds the current value of the search input field.
* `selectedPatient`: An object that stores the data of the patient whose details are being viewed in the modal. It's `null` when the modal is closed.
* `loading`: A boolean to track the API call status.
* `error`: A string to hold any error messages.

### **3. Search and Filtering**

* A dedicated `useEffect` hook listens for changes to the `searchQuery` or the main `patients` array.
* Whenever a change is detected, it filters the `patients` array based on whether a patient's name includes the `searchQuery` string.
* The result is then saved to the `filteredPatients` state, which causes the UI to re-render with the filtered list.

### **4. Adding a New Patient**

* The `AddPatientForm` component manages its own internal state for the form inputs.
* When the form is submitted, it creates a new patient object and calls the `onAddPatient` function passed down from `PatientsPage`.
* This function adds the new patient to the beginning of the main `patients` array, which automatically triggers the filtering `useEffect` to update the displayed list.
