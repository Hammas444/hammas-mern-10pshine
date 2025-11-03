# 📝 MERN Notes App

A full-stack **Notes Management Application** built with the **MERN stack (PostgreSQL, Express, React, Node.js)**.
Users can **create, edit, delete, and search notes** with a clean, responsive interface — and all data is securely stored in MongoDB.

---

## 🚀 Features

* ✨ User authentication (login/register)
* 🗒️ Create, edit, and delete notes
* 🔍 Real-time note search
* 🧠 Rich text editor (React Quill)
* 💾 Auto-save and edit modes
* 🔐 JWT-based authentication
* 🧹 Clean and responsive UI (React + Bootstrap)
* 📊 Code quality analysis via **SonarQube**

---

## 🧩 Tech Stack

**Frontend:** React, React Router, React Quill, Bootstrap
**Backend:** Node.js, Express.js, MongoDB, PostgreSQL
**Authentication:** JWT (JSON Web Token)
**Code Quality:** SonarQube
**Version Control:** Git + GitHub

---

## 🏗️ Folder Structure

```
hammas-mern-10pshine/
│
├── backend/
│   ├── index.js
│   ├── db.js
│   ├── .env
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   ├── test/

│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── sonar-project.properties
├── README.md
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Hammas444/hammas-mern-10pshine.git
cd hammas-mern-10pshine
```

### 2️⃣ Setup the backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```
PORT=5000
JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm start
```

### 3️⃣ Setup the frontend

```bash
cd ../frontend
npm install
npm run dev
```

Your app will be running on **[http://localhost:5173](http://localhost:5173)**
Backend API: **[http://localhost:5000](http://localhost:5000)**

---

## 🧪 Running with SonarQube

### Step 1: Start SonarQube

```bash
cd C:\path\to\sonarqube\bin\windows-x86-64
StartSonar.bat
```

Access dashboard: **[http://localhost:9000](http://localhost:9000)**

### Step 2: Run the analysis

Inside your project root:

```bash
sonar-scanner \
  -Dsonar.projectKey=Notes \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=sqp_b267ba9aba6b8414494020e52b34513a42ee33f9
```

Check your project report on the SonarQube dashboard.

---

## 🧰 SonarQube Configuration File

Example `sonar-project.properties`:

```
sonar \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.token=sqp_b267ba9aba6b8414494020e52b34513a42ee33f9 \
  -Dsonar.projectKey=Notes\
```

---

## 🧠 Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run start`     | Start backend server       |
| `npm run dev`   | Start frontend (Vite)      |
| `sonar-scanner` | Run SonarQube analysis     |
| `npm test`      | Run unit/integration tests |

---


## 💡 Author

**M. Hammas Sheikh**
📧 [[hammassheikh17@gmail.com]]
🌐 [GitHub Profile](https://github.com/Hammas444)

---

**✨ Happy Coding & Keep Notes Organized!**
