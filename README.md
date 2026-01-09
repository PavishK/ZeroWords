# 📝 ZeroWords – Minimal Blogging Platform

**ZeroWords** is a modern, full-stack **blogging website** where users can create, publish, and manage blog posts with a clean and distraction-free writing experience.

✨ **Frontend:** React.js (Vite)  
⚙️ **Backend:** Django REST Framework  
🌍 **Live:** https://zerowords.netlify.app/

> ⏳ **Note:** Initial load may take **3–4 minutes** due to backend cold start (free hosting).

---

## 🌟 Highlights

- 📰 Create, edit, and delete blog posts
- 👤 User authentication (login & register)
- 📊 Personal dashboard with post count
- 🧾 “My Posts” management (edit / delete)
- ⚡ Fast React + Vite frontend
- 🔐 Secure REST API backend
- 🎨 Clean, minimal, responsive UI

---

## 🚀 Features

- ✍️ **Create Blog Posts**
- 🛠️ **Edit & Delete Your Posts**
- 🔐 **User Authentication**
- 👤 **Profile with Published Post Count**
- 📄 **My Posts Dashboard**
- 🔄 **REST API based architecture**
- 📱 **Responsive Design**

---

## 🌍 Live Demo

🔗 **ZeroWords Website**  
👉 https://zerowords.netlify.app/

> Backend may take a few minutes to wake up on first request.

---

## 🖼️ Screenshots

### 🏠 Home Page
![Home](https://github.com/user-attachments/assets/05c9499d-0561-4d44-a4cf-2e700d242413)

### ℹ️ About Page
![About](https://github.com/user-attachments/assets/98bba158-ddb9-423d-8b24-313b42adaa0e)

### 🔐 Authentication
**Login**
![Login](https://github.com/user-attachments/assets/5305bd41-ca57-4bf3-96c1-9fb44d534bd0)

**Register**
![Register](https://github.com/user-attachments/assets/f16cab02-1177-40cb-a563-b486514e5092)

### ✍️ Create Post
![Create Post](https://github.com/user-attachments/assets/d255a04d-0549-4bb6-854d-e0942d6297ff)

### 👤 Profile & Logout
![Profile](https://github.com/user-attachments/assets/0c71de67-8923-403c-b46d-9789290f3135)

### 🗂️ My Posts (Edit / Delete)
![My Posts](https://github.com/user-attachments/assets/4e961734-59f7-404f-84d9-7c20d0a57a42)

### 📊 Profile – Post Count
![Post Count](https://github.com/user-attachments/assets/5ed8f50a-5636-4753-ab08-16c9e3934e04)

---

## 🧩 Project Structure

```

zerowords/
├── frontend/                  # React (Vite)
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
└── backend/                   # Django REST Framework
├── env/                   # Virtual environment (ignored)
├── myproject/
│   ├── manage.py
│   ├── .env               # Environment variables (ignored)
│   ├── myproject/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   ├── posts/             # Blog APIs
│   └── users/             # User APIs
├── requirements.txt
└── .gitignore

````

---

## 🧠 Tech Stack

### 🎨 Frontend
- React.js (Vite)
- Tailwind CSS
- Axios

### ⚙️ Backend
- Django
- Django REST Framework
- django-cors-headers
- python-dotenv
- MySQL *(SQLite supported)*

---

## ⚙️ Installation & Setup

### 🖥️ Backend (Django)

```bash
cd backend
python -m venv env
````

Activate environment:

**Windows**

```bash
env\Scripts\activate
```

**macOS / Linux**

```bash
source env/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python myproject/manage.py migrate
```

Start server:

```bash
python myproject/manage.py runserver
```

📍 Backend: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

---

### 💻 Frontend (React + Vite)

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_PUBLIC_SERVER_URL="YOUR_BACKEND_URL"
```

Run frontend:

```bash
npm run dev
```

📍 Frontend: [http://localhost:5173/](http://localhost:5173/)

---

## 🔐 Environment Variables (Hidden)

### Backend `.env`

```ini
SECRET_KEY=YOUR_SECRET_KEY
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

FRONTEND_URL=http://localhost:5173

DB_NAME=YOUR_DB_NAME
DB_USER=YOUR_DB_USER
DB_PASSWORD=YOUR_DB_PASSWORD
DB_HOST=localhost
DB_PORT=3306
```

> ❌ No secrets are committed to the repository.

---

## 🧠 API Overview

| Endpoint           | Method | Description    |
| ------------------ | ------ | -------------- |
| `/api/posts/`      | GET    | List all posts |
| `/api/posts/`      | POST   | Create post    |
| `/api/posts/<id>/` | GET    | Post details   |
| `/api/posts/<id>/` | PUT    | Update post    |
| `/api/posts/<id>/` | DELETE | Delete post    |

---

## 🛡️ Deployment Notes

* Set `DEBUG=False`
* Update `ALLOWED_HOSTS`
* Configure `FRONTEND_URL`
* Add environment variables in hosting platform
* Run:

```bash
python myproject/manage.py collectstatic
```

---

## 👨‍💻 Author

**Pavish K**

🌐 Portfolio: [https://pavishk.dev](https://pavishk.dev)
🐙 GitHub: [https://github.com/PavishK](https://github.com/PavishK)

---

## 🪪 License

This project is licensed under **MY License**.

---

⭐ If you found this useful, **give the repo a star!**
