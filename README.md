# 📚 ByteBooks — Full-Stack Library Management System

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Website-2ea44f?style=for-the-badge&logo=render&logoColor=white)](https://lms-frontend-rodz.onrender.com)

[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.7-764ABC?style=flat-square&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%208-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](LICENSE)

**ByteBooks** is a modern, full-stack web application designed for academic libraries and institutions to streamline book cataloging, circulation tracking, borrower management, and automated email reminders.

🌐 **Live Demo:** [https://lms-frontend-rodz.onrender.com](https://lms-frontend-rodz.onrender.com)

[Key Features](#-key-features) • [Tech Stack](#-tech-stack) • [Project Structure](#-project-structure) • [Getting Started](#-getting-started) • [Environment Variables](#-environment-variables) • [API Documentation](#-api-endpoints)

</div>

---

## 🌟 Key Features

### 🔐 Authentication & User Verification
- **OTP Verification via Email**: Secure registration requiring a 6-digit one-time password delivered via Nodemailer SMTP.
- **Auto Cleanup of Unverified Accounts**: Background cron worker automatically deletes abandoned accounts if not verified in time.
- **JWT & HTTP-Only Cookies**: Secure session management with encrypted JSON Web Tokens stored in HTTP-only cookies.
- **Password Recovery**: Token-based forgot & reset password flow with direct email links.

### 🛡️ Role-Based Access Control (RBAC)
- **Admin**:
  - Full catalog management (add, edit, delete books).
  - Issue books to members and process returns.
  - View all user profiles, borrowing histories, and overdue balances.
  - Register additional system administrators.
- **Member (User)**:
  - Browse book catalog with search and filters.
  - View personal borrowing records, due dates, and calculated fines.
  - Update profile and change password.

### 📖 Book & Circulation Management
- **Image Uploads**: Book cover images and user avatars uploaded directly to Cloudinary.
- **Circulation Tracking**: Real-time status for available vs. borrowed books.
- **Automated Fine Calculator**: Overdue fee computation based on elapsed time beyond due date.
- **Return Book Flow**: Admin interface to confirm return condition and settle fines.

### ⏰ Background Cron Services
- **Automated Return Reminders**: Runs every 10 minutes to scan for books due within 2 hours and dispatches friendly HTML reminder emails to borrowers.
- **Unverified Account Purge**: Periodic job cleaning up stale unverified signups.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Description |
|---|---|
| **React 19** | Modern component-based user interface |
| **Vite 6** | Ultra-fast build tool and development server |
| **Tailwind CSS v4** | Modern utility-first styling |
| **Redux Toolkit** | Centralized global state management (Auth, Books, Borrow, Users) |
| **React Router v7** | Dynamic client-side routing |
| **Lucide Icons & React Icons** | Modern, accessible UI iconography |
| **Axios** | HTTP client for REST API communication |
| **React Toastify** | Interactive notification banners |

### Backend
| Technology | Description |
|---|---|
| **Node.js** | JavaScript runtime environment |
| **Express.js v5** | High-performance RESTful API framework |
| **MongoDB & Mongoose** | NoSQL database with schema modeling |
| **JSON Web Tokens (JWT)** | Stateless authentication |
| **Nodemailer** | SMTP email delivery for OTPs and return reminders |
| **Cloudinary** | Cloud storage for book covers and media assets |
| **Node-Cron** | Automated scheduling for notification jobs and cleanup |
| **Bcrypt** | Password hashing with salt rounds |

---

## 📁 Project Structure

```text
LMS/
├── client/                     # Frontend Application (React + Vite)
│   ├── public/                 # Static assets and icons
│   ├── src/
│   │   ├── assets/             # Images and design assets
│   │   ├── components/         # Reusable UI components (Catalog, BookManagement, etc.)
│   │   ├── layout/             # Header, Sidebar, and Page wrappers
│   │   ├── pages/              # Routed pages (Home, Login, Register, OTP, Password Reset)
│   │   ├── popups/             # Modal dialogs (AddBook, ReturnBook, RecordBorrow, etc.)
│   │   ├── store/              # Redux Toolkit store and feature slices
│   │   ├── config.js           # API base URL configuration
│   │   ├── App.jsx             # Main router and application entry
│   │   └── main.jsx            # React root mount
│   ├── .env.example            # Client environment variables template
│   ├── index.html              # HTML entry template
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite build configuration
│
├── server/                     # Backend Application (Node.js + Express)
│   ├── config/
│   │   └── .env.example        # Server environment variables template
│   ├── controllers/            # Route handler business logic (auth, book, borrow, user)
│   ├── database/               # MongoDB connection setup
│   ├── middlewares/            # Auth guard, RBAC, and centralized error handler
│   ├── models/                 # Mongoose schemas (User, Book, Borrow)
│   ├── routes/                 # Express API routes
│   ├── services/               # Background cron workers (notifyUsers, cleanup)
│   ├── utils/                  # Helper utilities (sendEmail, fineCalculator, sendToken)
│   ├── app.js                  # Express app setup and middleware pipeline
│   ├── package.json            # Backend dependencies
│   └── server.js               # Server bootstrap and port listener
│
├── .gitignore                  # Git ignore rules for node_modules, .env, and builds
├── package.json                # Root workspace convenience scripts
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have installed on your local machine:
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) (v9.x or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a local MongoDB instance
- [Cloudinary](https://cloudinary.com/) account (for image uploads)
- [Gmail App Password](https://support.google.com/accounts/answer/185833) (for SMTP email delivery)

---

### 1. Clone the Repository

```bash
git clone https://github.com/SALEHHAYAT8252/LMS.git
cd LMS
```

---

### 2. Configure Environment Variables

#### Backend Configuration:
1. Navigate to `server/config/`
2. Create `.env` by copying `.env.example`:

```bash
cp server/config/.env.example server/config/.env
```

3. Fill in your credentials:

```env
PORT=5000
FRONTEND_URL=http://localhost:5173

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bytebooks_lms?retryWrites=true&w=majority

JWT_SECRET_KEY=your_super_secret_jwt_key
JWT_EXPIRE=7
COOKIE_EXPIRE=7

SMTP_HOST=smtp.gmail.com
SMTP_SERVICE=gmail
SMTP_PORT=587
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Frontend Configuration:
1. Navigate to `client/`
2. Create `.env` by copying `.env.example`:

```bash
cp client/.env.example client/.env
```

3. Set your backend URL:

```env
VITE_API_URL=http://localhost:5000
```

---

### 3. Install Dependencies

You can install all dependencies from the root directory using:

```bash
npm run install:all
```

*Or install them individually:*
```bash
# Frontend
cd client && npm install

# Backend
cd ../server && npm install
```

---

### 4. Run the Application

From the root directory:

```bash
# Run backend server (http://localhost:5000)
npm run server

# Run frontend client (http://localhost:5173) in a separate terminal
npm run client
```

Now open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ⚙️ Available Scripts

Run these scripts from the repository root:

| Command | Action |
|---|---|
| `npm run client` | Launches the frontend Vite development server |
| `npm run server` | Launches backend with nodemon hot-reload |
| `npm run client:build` | Creates production bundle for frontend |
| `npm run client:install`| Installs frontend dependencies |
| `npm run server:install`| Installs backend dependencies |
| `npm run install:all` | Installs both client and server dependencies |

---

## 📡 API Endpoints

### 🔐 Authentication (`/api/v1/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/register` | Public | Register new user & send OTP |
| `POST` | `/verify-otp` | Public | Verify OTP and activate account |
| `POST` | `/login` | Public | User / Admin login & issue cookie |
| `GET` | `/logout` | Authenticated | Logout & clear session cookie |
| `GET` | `/me` | Authenticated | Fetch current user profile |
| `POST` | `/password/forgot` | Public | Send password reset link |
| `PUT` | `/password/reset/:token` | Public | Reset password with token |
| `PUT` | `/password/update` | Authenticated | Change current password |

### 📚 Books (`/api/v1/book`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/all` | Authenticated | Get all books with search/filters |
| `POST` | `/admin/add` | Admin | Add new book with cover image |
| `DELETE` | `/admin/delete/:id` | Admin | Remove book by ID |

### 🔄 Borrow & Circulation (`/api/v1/borrow`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/record-borrow-book/:id` | Admin | Issue book to a member |
| `GET` | `/borrowed-books-by-users` | Admin | View all active borrowings across system |
| `GET` | `/my-borrowed-books` | Authenticated | View current logged-in user's borrowed books |
| `PUT` | `/return-borrowed-book/:bookId` | Admin | Record book return & calculate fine |

### 👥 Users (`/api/v1/user`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/all` | Admin | List all registered members |
| `POST` | `/add/new-admin` | Admin | Promote or register new administrator |

---

## 🛡️ Security Best Practices Implemented

- **CORS Filtering**: Strict origin validation restricting access only to authorized frontend hosts.
- **Secure Cookies**: HTTP-only cookies prevent Cross-Site Scripting (XSS) token exfiltration.
- **Encrypted Passwords**: Bcrypt hashing with automated salt generation.
- **Environment Isolation**: Sensitive credentials kept out of Git via comprehensive `.gitignore`.
- **Centralized Error Handling**: Unified error response format with descriptive status codes and sanitized stack traces.

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.
