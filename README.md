# 🎬 MERN Movies

A modern, full-stack movie management application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features a beautiful dark theme UI with gradient accents and a comprehensive admin panel for movie management.

![MERN Movies](https://via.placeholder.com/800x400?text=MERN+Movies)

## ✨ Features

### User Features
- 🎥 Browse movies with beautiful card layouts
- 🔍 Search and filter movies
- 💬 Comment and rate movies
- 👤 User authentication and profile management
- 🌙 Modern dark theme with gradient accents

### Admin Features
- 📊 Comprehensive admin dashboard
- 🎬 Movie management (Create, Read, Update, Delete)
- 🏷️ Genre management
- 💭 Comment moderation
- 📈 Real-time statistics

## 🛠️ Tech Stack

### Frontend
- React.js with Redux Toolkit
- TailwindCSS for styling
- RTK Query for API calls
- React Router v6 for routing
- React Toastify for notifications

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- Express Validator for validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mern-movies.git
cd mern-movies
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd frontend
npm install
```

4. Set up environment variables
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

5. Start the development servers

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

## 📝 Project Structure

```
mern-movies/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       │   ├── Admin/
│       │   └── User/
│       ├── redux/
│       └── App.jsx
└── README.md
```

## 🎨 UI Components

The application features a consistent dark theme with:
- Primary background: `#0a0a0a`
- Secondary background: `#1a1a1a`
- Tertiary background: `#2a2a2a`
- Gradient accents: Purple (`#9333ea`) to Blue (`#3b82f6`)
- Modern hover effects and transitions
- Responsive design for all screen sizes

## 🔐 Authentication

- JWT-based authentication
- Protected routes for admin and user areas
- Secure password hashing
- Token-based API access

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [MongoDB](https://www.mongodb.com/) for the database
- [Express.js](https://expressjs.com/) for the backend framework

## 📧 Contact

Your Name - [@anas.baiy](https://twitter.com/yourtwitter) - anassbaiyy@gmail.com

Project Link: [https://github.com/derdoubi](https://github.com/derdoubi/mern-movies) 