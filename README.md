# 🔐 Takehome CBI - Next.js Frontend

A CRUD application built with Next.js 15 (App Router), featuring JWT-based authentication, complete CRUD operations, form validation, and comprehensive session management.

## 📖 Overview

This project demonstrates a complete authentication implementation with full CRUD functionality. The system provides secure user authentication with JWT tokens, server-side session management, comprehensive data management, and a clean, responsive UI built with shadcn/ui components.

## 🚀 Tech Stack

### Frontend

-   **Next.js 15** - React framework with App Router
-   **TypeScript** - Type-safe development
-   **Tailwind CSS** - Utility-first styling
-   **shadcn/ui** - Modern, accessible UI components

### Authentication & State Management

-   **NextAuth.js** - Authentication library with JWT strategy
-   **TanStack Query (React Query)** - Server state management
-   **React Hook Form** - Form handling and validation
-   **Zod** - Schema validation

### HTTP & API

-   **Axios** - HTTP client with interceptors
-   **Custom API Integration** - Backend authentication endpoints

## ✨ Features

### 🔑 Authentication

-   **Secure Login** - Username/password authentication with backend API
-   **JWT Token Management** - Automatic token handling and refresh
-   **Session Persistence** - Maintains user sessions across browser sessions
-   **Protected Routes** - Server-side middleware protection

### 📝 CRUD Operations

-   **Items Management** - Complete Create, Read, Update, Delete functionality
-   **Add Items** - Modal forms with validation for creating new items
-   **Edit Items** - In-place editing with form validation
-   **Delete Items** - Confirmation dialogs for safe deletion
-   **Real-time Updates** - Optimistic updates with React Query

### 🎨 User Experience

-   **Form Validation** - Real-time validation with Zod schemas
-   **Loading States** - Comprehensive loading feedback
-   **Error Handling** - User-friendly error messages
-   **Responsive Design** - Mobile-first responsive layout

### 🔒 Security

-   **Server-side Protection** - Next.js middleware for route protection
-   **Type Safety** - Full TypeScript implementation
-   **Token Interceptors** - Automatic token attachment and 401 handling
-   **Secure Session Management** - HttpOnly cookies and CSRF protection

## 🚦 Getting Started

### Prerequisites

-   Node.js 18+
-   npm/yarn/pnpm
-   Backend API running on `localhost:8080`

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd takehome-cbi-nextjs-fe
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Environment Setup**
   Create a `.env.local` file:

    ```env
    NEXTAUTH_SECRET=your-secret-key-here
    NEXT_PUBLIC_API_URL=http://localhost:8080
    ```

4. **Run the development server**

    ```bash
    npm run dev
    ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Backend Integration

The application expects a backend API with the following endpoints:

#### Authentication

**POST** `/login`

```json
{
    "username": "user",
    "password": "password"
}
```

**Response:**

```json
{
    "token": "jwt-token-here"
}
```

#### Items CRUD

**GET** `/items` - Get all items
**POST** `/items` - Create new item

```json
{
    "name": "Item Name",
    "price": 100.0
}
```

**PUT** `/items/:id` - Update item
**DELETE** `/items/:id` - Delete item

**Item Response:**

```json
{
    "id": 1,
    "name": "Item Name",
    "price": 100.0
}
```

### Authentication Flow

1. User submits login form
2. Form validation with Zod schema
3. API call to backend `/login` endpoint
4. JWT token received and stored in NextAuth session
5. Automatic token attachment for subsequent requests
6. Server-side route protection via middleware

## 🎯 Key Implementation Highlights

-   **Custom Auth Types** - Extended NextAuth types for type safety
-   **Axios Interceptors** - Automatic JWT token handling
-   **Server-side Sessions** - Optimized session management
-   **Form Validation** - Zod schemas with React Hook Form
-   **Protected Routes** - Next.js middleware implementation
-   **CRUD Operations** - Complete data management with React Query
-   **Modal Forms** - shadcn/ui dialogs with form validation
-   **Optimistic Updates** - Real-time UI updates with rollback
-   **Error Boundaries** - Comprehensive error handling


## 🔗 Connect

-   **Portfolio**: [[Alif Rachmat Illahi](https://portofolio-web-phi-wine.vercel.app/)]
-   **LinkedIn**: [[Alif Rachmat Illahi](https://www.linkedin.com/in/alifrachmat/)]

---
