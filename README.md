Project Description:
Technology Stack:
Built using HTML, CSS, and JavaScript (ES6). Utilizes bcrypt.js for password hashing and localStorage for data persistence. Unit testing implemented using Jest.
Functionality:
Allows users to sign up or log in securely, manage projects, and perform full CRUD operations on tasks. Tasks can be searched, edited, reordered (drag-and-drop), and deleted. Supports theme toggling (light/dark mode) for enhanced UX.
Routing Principles:
Handled via modular JavaScript files, with front-end routing logic managed through event listeners and DOM manipulation.
Architecture:
Follows modular code structure with separate files for authentication, tasks, drag-and-drop, and utilities.

User Actions:
• Secure Login/Signup with `bcrypt.js` password hashing
• Auto logout after 15 minutes of inactivity
• Task Management CRUD(Create, Edit, Delete, Update,Save)
• Task Search by keyword
• Drag-and-drop to reorder tasks
• Data stored per user in `localStorage`
• Responsive UI with light/dark mode toggle
• Unit Testing using Jest for core logic
• UI refreshes to default (welcome screen) if projects are deleted.

Install Dependencies (Jest): npm install
Run Tests: npm test
Access Application: Open your web browser and navigate to
http://localhost:5500 access the application.
Install Dependencies (Jest): npm install
Run Tests: npm test
Results:
The application allows secure login, task and project management, and theme switching. Tasks can be created, edited, searched, reordered via drag-and-drop, and persisted per user using localStorage. Unit tests confirm functionality with Jest.
