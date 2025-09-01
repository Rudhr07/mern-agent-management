# Agent Management System 

## Project Overview
A complete MERN stack application for managing sales agents and distributing customer leads efficiently.

## Technology Stack
- **Frontend**: React.js with modern CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Processing**: CSV parsing and Excel file support

## Key Features
1. Admin authentication system
2. Agent management (create, read, update, delete)
3. CSV/Excel file upload functionality
4. Automated lead distribution system
5. Dashboard with statistics
6. Responsive professional UI

## File Structure
```
agent-management/
├── backend/
│   ├── controllers/     # Business logic
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Auth & upload handling
│   └── server.js        # Main server file
├── frontend/
│   ├── components/      # React components
│   ├── services/        # API calls
│   └── public/          # Static assets
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Modern web browser

### Installation Steps

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file with your MongoDB URI
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Access Application**
   - Open: http://localhost:3000
   - Login: admin@example.com / admin123

## Usage Guide

### Managing Agents
1. Navigate to Agents section
2. Click "Create Agent" to add new agents
3. Use Edit/Delete buttons for existing agents
4. All fields include validation

### Uploading Files
1. Go to Upload section
2. Select CSV/Excel file with columns:
   - FirstName
   - Phone
   - Notes
3. System automatically distributes leads to agents

### Viewing Distribution
1. Check Distribution section
2. View how leads were allocated
3. See agent assignment details

## API Endpoints
- `POST /api/auth/login` - Admin authentication
- `GET/POST /api/agents` - Agent management
- `POST /api/lists/upload` - File upload processing
- `GET /api/lists` - Distribution data

## Security Features
- JWT token authentication
- Password encryption (bcrypt)
- File type validation
- Input sanitization

## Customization
- Modify color scheme in App.css variables
- Adjust distribution logic in listController.js
- Add new fields to agent models as needed

## Support
For technical issues or questions about implementation.

Made by Rudhr Chauhan