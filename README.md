# DashFlow — Smart Dashboard

A modern React dashboard application with user management, theming, and responsive UI.

---

## Instructions to Run Project

# 1. Clone the repository
git clone <repo-url>
cd dashflow

### 2. Install dependencies
npm install

### 3. Run development server
npm run dev

Open in browser:
http://localhost:5173

### 4. Build for production
npm run build

### 5. Preview production build
npm run preview

---

## Libraries Used

Core:
- React
- React DOM
- Vite

Routing:
- React Router DOM

Styling:
- Tailwind CSS
- Custom Theme (ThemeColors)

Forms & Validation:
- Formik
- Yup

Linting:
- ESLint

---

## Features Used

- Dashboard UI with responsive layout
- User management (Add user modal)
- Role-based dropdown
- Dark / Light theme toggle
- LocalStorage persistence (user + theme)
- Clean component-based architecture


Role-Based Authentication (RBAC)
This project implements Role-Based Access Control using Redux Toolkit and React Router.

## User Roles
-Admin
-User

## Default Admin Credentials

Email: admin123@gmail.com
Password: 123456