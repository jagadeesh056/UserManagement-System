# React User Management Application

A responsive React-based user management system that allows for creating, reading, updating, and deleting user records with a clean and intuitive interface.

## Features

- **User List Display**: View all users in a paginated table format
- **CRUD Operations**:
  - Create new users with detailed information
  - Read existing user data
  - Update user information through an edit modal
  - Delete users with confirmation dialog
- **Pagination**: Handle large datasets with client-side pagination
- **Form Validation**: Basic form validation for required fields
- **Responsive Design**: Works across different screen sizes
- **Sidebar Navigation**: Easy access to different sections
- **Authentication**: Basic JWT token-based authentication check

## Project Structure

```
src/
├── components/
│   ├── Header/
│   │   ├── index.js
│   │   └── index.css
│   ├── HomePage/
│   │   ├── index.js
│   │   └── index.css
│   ├── UsersList/
│   │   ├── index.js
│   │   └── index.css
│   └── UserForm/
│       ├── index.js
│       └── index.css
└── App.js
```

The application will be available at `http://localhost:3000`

## API Integration

The application uses JSONPlaceholder as a mock API. In a production environment, replace the API endpoints in `HomePage.js` with your actual backend URLs:

- GET users: `https://jsonplaceholder.typicode.com/users`
- POST new user: `https://jsonplaceholder.typicode.com/users`
- PUT update user: `https://jsonplaceholder.typicode.com/users/${id}`
- DELETE user: `https://jsonplaceholder.typicode.com/users/${id}`

## Challenges Faced
1. **State Management :**
   - Managing state across multiple components using class components proved complex, especially with the user data transformations between the form and list views.
2. **Data Structure Consistency :**
   - Initial challenges with firstname/lastname field naming inconsistencies between form submission and display.
   - Had to ensure data structure remained consistent between API responses and local state.
3. **Form Handling :**
   - Modal form state management required careful handling of mounting/unmounting.
   - Form validation was basic and could benefit from more robust implementation.
4. **API Integration:**
   - Had to implement optimistic updates while maintaining data consistency.

## Features to Add

- [ ] Search functionality
- [ ] Sort by columns
- [ ] Filter by department
- [ ] User roles and permissions
