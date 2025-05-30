# 🏥 Hospital Management Backend

This is the backend server for the **Hospital Management System**, developed using **Node.js**, **Express.js**, and **MongoDB**. It provides RESTful APIs for user authentication, appointment scheduling, attendance tracking (with cron jobs), messaging, and more. It also supports file uploads and uses Cloudinary for media storage.

---

## 📂 Project Structure
```bash
backend/
├── app.js # Main Express app setup
├── server.js # Entry point: starts server & configures Cloudinary
├── config.env # Environment variables
├── package.json # Project metadata and dependencies
│
├── database/
│ └── dbConnection.js # MongoDB connection setup
│
├── middlewares/
│ └── error.js # Error handling middleware
│
├── models/ # Mongoose schemas
│ ├── User.js
│ ├── Appointment.js
│ ├── Attendance.js
│ └── Message.js
│
├── controllers/ # Logic for API routes
│ ├── userController.js
│ ├── appointmentController.js
│ ├── attendanceController.js
│ └── messageController.js
│
├── router/ # API route definitions
│ ├── userRouter.js
│ ├── appointmentRouter.js
│ ├── attendanceRouter.js
│ └── messageRouter.js
│
├── utils/
│ └── sendToken.js # JWT token helper
│
└── cronJobs/
└── attendanceCron.js # Automated attendance marking
```

---

## 🚀 Features

- ✅ **User Authentication** (JWT with Cookies)
- 📅 **Appointment Scheduling**
- 🧑‍⚕️ **Doctor Attendance Tracking**
- ✉️ **Messaging System**
- ☁️ **File Uploads to Cloudinary**
- 🕒 **Automated Cron Jobs**
- 🌐 **Cross-Origin Resource Sharing (CORS)**
- 🛡️ **Role-Based Access Control**

---

## 🧰 Tech Stack

| Tech               | Description                           |
|--------------------|---------------------------------------|
| Node.js            | JavaScript runtime                    |
| Express.js         | Web framework                         |
| MongoDB            | NoSQL Database                        |
| Mongoose           | ODM for MongoDB                       |
| JSON Web Tokens    | Authentication                        |
| dotenv             | Environment variable management       |
| Cloudinary         | Image/File hosting                    |
| express-fileupload | File uploads                          |
| node-cron          | Scheduled tasks for automation        |

---

## 🛠️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/hospital-management-backend.git
cd hospital-management-backend 
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a config.env file**

```bash
PORT=5000
MONGO_URI=your_mongodb_uri
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
```

4. **Run the development server**

```bash
npm run dev
```

## 📦 API Endpoints

| Route Prefix         | Description                      |
|----------------------|----------------------------------|
| `/api/v1/user`       | Register, Login, Get User, Logout|
| `/api/v1/appointment`| Book and retrieve appointments   |
| `/api/v1/attendance` | Track and mark attendance        |
| `/api/v1/message`    | Send messages to the admin       |

## ☁️ Cloudinary Setup

Used for uploading and hosting images/files. Make sure to add credentials to your **config.env:**


```bash
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📅 Cron Jobs

- Automatically initializes **monthly attendance records**
- Uses [`node-cron`](https://www.npmjs.com/package/node-cron) to run jobs at defined intervals
- Implementation file: `cronJobs/attendanceCron.js`

## 📜 Scripts

| Script         | Purpose                             |
|----------------|-------------------------------------|
| `npm run dev`  | Run with Nodemon for development    |
| `npm start`    | Start server in production mode     |
