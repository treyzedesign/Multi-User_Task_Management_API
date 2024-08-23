# Multi-User Task Management Application

## Table of Contents
- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Features](#features-usage)
- [Sample Data Persisting DB](#sample-data-persisting-db)
- [Contact](#contact)

## About The Project

**Multi-User Task Management Application** is a comprehensive Multi-User Task Management API designed to showcase backend development skills and proficiency. The API supports user management with role-based access control, allowing both regular users and admins to manage tasks efficiently. 

Key features include user registration, login with JWT authentication, task management, tagging, commenting, and real-time notifications using WebSockets.

## Built With

- **Node.js** with **TypeScript**
- **Express**: Web framework
- **Sequelize**: ORM for PostgreSQL
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **socket.io**: Real-time WebSockets
- **swagger-jsdoc** & **swagger-ui-express**: API documentation
- **dotenv**: Environment variables

## Getting Started

This is a guide to set up your project locally. Follow these steps to get a local copy up and running:

### Prerequisites

- Node.js v20.12.0
- PostgreSQL & PgAdmin4
- JavaScript/TypeScript knowledge

### Installation & SetUp

1. **Clone the Repository**
   ```bash
   git clone https://github.com/treyzedesign/Multi-User_Task_Management_API.git
2. **Navigate to the Project Directory**
    * cd Multi-User_Task_Management_API
3. **Install Dependencies**
    * npm install
4. **Set Up Environment Variables**
    * Create a .env file in the root directory and configure your database connection settings. check the .example.env to see the properties required in the .env file
5. **Ensure Postgres is running**
6. **Start the server**
    * npm start
7. **Access Swagger UI**
    * once the server start running(listening), open `http://{BASE_URL}/api/docs`


## Features

- **User Management**: 
  - Register and log in with JWT authentication.
  - Role-based access control: Admins can create other Admins.

- **Task Management**:
  - Create tasks with a title, description, due date, and status (To-Do, In Progress, Completed).
  - Assign tasks to yourself or others.
  - Users update their own tasks; Admins can update any task.

- **Tagging System**:
  - Add and filter tasks by tags (e.g., "Urgent", "Bug", "Feature").

- **Commenting System**:
  - Add, edit, or delete your own comments.
  - Admins can delete any comment.

- **Notifications**:
  - Real-time updates via WebSockets.

- **Validation**:
  - payloads are valid with proper email format and required fields.

- **Pagination & Sorting**:
  - Paginate and sort tasks by attributes like due date or status.

## Contact
- Name: Saviour Udoh
- Email: sudoh141@gmail.com
- LinkedIn : https://www.linkedin.com/in/saviour-udoh/