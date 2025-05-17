# Cooperative AI Chatbot Website 

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Material-UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Welcome to **Cooperative AI**, a modern chatbot website where users can engage with an AI-powered assistant. Built with **React**, **Material-UI**, and **TypeScript**, this frontend project offers a seamless and responsive user experience, complete with authentication and chat functionality.

🔗 [GitHub Repository](https://github.com/HemantBatra873/Cooperative_Client)

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Authentication Context](#-authentication-context)
- [API Communicator](#-api-communicator)
- [Main Pages](#-main-pages)
- [Running the Project](#-running-the-project)

---

## 🛠️ Tech Stack

This project is powered by a carefully selected set of technologies:

- **React**:  
  A leading JavaScript library for building dynamic user interfaces. We chose React for its component-based architecture, which simplifies the development of single-page applications like this chatbot website, and its vibrant ecosystem.

- **Material-UI**:  
  A React UI framework that brings Google's Material Design to life. Material-UI was selected for its pre-built, customizable components, enabling rapid development and a polished, consistent design across the app.

- **TypeScript**:  
  A statically typed superset of JavaScript. We opted for TypeScript to enhance code quality, catch errors during development, and improve maintainability—crucial for a project with multiple features like authentication and API interactions.

**Why this stack?**  
The combination of React, Material-UI, and TypeScript delivers a robust, scalable, and visually appealing frontend. React provides flexibility, Material-UI ensures a modern look, and TypeScript adds reliability—perfect for a user-facing chatbot application.

---

## 🔐 Authentication Context

The `AuthContext` is the backbone of user authentication in this project. It manages the authentication state globally and provides methods for login, signup, logout, and status checks.

### Key Features:
- **State Management**: Tracks `isLoggedIn` (boolean) and `user` (name and email).
- **Functions**:
  - **`login(email: string, password: string)`**: Authenticates a user and updates the state.
  - **`signup(name: string, email: string, password: string)`**: Registers a new user and logs them in.
  - **`logout()`**: Clears the user session and reloads the app.
  - **`checkAuthStatus()`**: Verifies authentication on app load (e.g., via cookies).

### How It Works:
The context uses React's `createContext` and `useState` to maintain the authentication state. On initialization, it checks the user's status with the backend, ensuring a smooth experience for returning users.

---

## 🌐 API Communicator

The `api-communicator.ts` file in the `helpers` folder handles all backend interactions using **Axios**. Each function is designed to perform a specific task, from authentication to chat management.

### API Functions:
- **`loginUser(email: string, password: string)`**:  
  - **Method**: POST  
  - **Endpoint**: `/user/login`  
  - **Purpose**: Authenticates a user with their email and password.  
  - **Returns**: User data (name, email) on success.  
  - **Error**: Throws "Unable to login" if the request fails.

- **`signupUser(name: string, email: string, password: string)`**:  
  - **Method**: POST  
  - **Endpoint**: `/user/signup`  
  - **Purpose**: Registers a new user with their name, email, and password.  
  - **Returns**: User data on success.  
  - **Error**: Throws "Unable to Signup" if the request fails.

- **`checkAuthStatus()`**:  
  - **Method**: GET  
  - **Endpoint**: `/user/auth-status`  
  - **Purpose**: Checks if the user is authenticated (e.g., via cookies).  
  - **Returns**: User data if authenticated.  
  - **Error**: Throws "Unable to authenticate" if the request fails.

- **`sendChatRequest(message: string)`**:  
  - **Method**: POST  
  - **Endpoint**: `/chat/new`  
  - **Purpose**: Sends a user message to the AI chatbot.  
  - **Returns**: The AI's response.  
  - **Error**: Throws "Unable to send chat" if the request fails.

- **`getUserChats()`**:  
  - **Method**: GET  
  - **Endpoint**: `/chat/all-chats`  
  - **Purpose**: Retrieves the user's chat history.  
  - **Returns**: Array of chat data.  
  - **Error**: Throws "Unable to send chat" if the request fails.

- **`deleteUserChats()`**:  
  - **Method**: DELETE  
  - **Endpoint**: `/chat/delete`  
  - **Purpose**: Deletes all chats for the authenticated user.  
  - **Returns**: Success message.  
  - **Error**: Throws "Unable to delete chats" if the request fails.

- **`logoutUser()`**:  
  - **Method**: GET  
  - **Endpoint**: `/user/logout`  
  - **Purpose**: Logs out the current user.  
  - **Returns**: Success message.  
  - **Error**: Throws "Unable to Logout" if the request fails.

**Note**: All requests include `{ withCredentials: true }` to handle authentication cookies securely.

---

## 📄 Main Pages

The application features five core pages, each serving a distinct purpose:

- **Home** 🏠:  
  The welcoming landing page that introduces the chatbot and guides users to log in or sign up.

- **Login** 🔑:  
  A simple form where users enter their email and password to access the chat features.

- **Signup** ✍️:  
  A registration page for new users to create an account with their name, email, and password.

- **Chat** 💬:  
  The heart of the app—where authenticated users can interact with the AI chatbot in real-time.

- **NotFound** 🚫:  
  A friendly error page displayed when users navigate to an invalid route.

These pages are built with React components and styled with Material-UI for a cohesive and responsive design.

---

## 🚀 Running the Project

Get the Cooperative AI Chatbot Website up and running on your local machine with these steps:

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/HemantBatra873/Cooperative_Client.git
   ```

2. **Navigate to the project directory**:  
   ```bash
   cd Cooperative_Client
   ```

3. **Install dependencies**:  
   ```bash
   npm install
   ```

4. **Start the development server**:  
   ```bash
   npm start
   ```

The app will launch at `http://localhost:3000`. Make sure the backend server is running to enable full functionality!

---

✨ **Happy Chatting!** ✨  
This README provides everything you need to explore, understand, and contribute to the Cooperative AI Chatbot Website. Dive in and enjoy!
