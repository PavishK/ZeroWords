# 📝 ZeroWords

**ZeroWords** is a simple and modern **blog website** built with a powerful tech stack.  
✨ **Frontend:** React.js (Vite)  
⚙️ **Backend:** Django REST Framework  

Users can create, read, update, and delete blog posts with an intuitive UI and secure backend API.

---

## 🚀 Features

- 📰 Create and manage blog posts  
- 👤 User authentication *(login/signup planned)*  
- ⚡ Fast frontend built with **React + Vite**  
- 🔐 Secure backend using **Django REST Framework**  
- 🔄 API-driven architecture (frontend & backend separated)  
- 🎨 Simple, clean, and responsive UI  

---
```markdown

## 🧩 Project Structure

```

zerowords/
├── frontend/                  # React.js (Vite) app
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
└── backend/                   # Django REST Framework app
├── env/                   # Virtual environment (ignored in git)
├── myproject/             # Django project folder
│   ├── manage.py
│   ├── .env               # Environment variables (ignored in git)
│   ├── myproject/         # Django settings and core config
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── posts/             # Blog app (Post APIs)
│   └── users/             # User app (User management APIs)
├── requirements.txt       # Backend dependencies
└── .gitignore             # Ignore env, .env, cache files

````

---

## ⚙️ Installation & Setup

### 🖥️ Backend (Django)

1. Navigate to the backend folder:
   ```bash
   cd backend
````

2. Create a virtual environment:

   ```bash
   python -m venv env
   ```

3. Activate the virtual environment:
   **Windows:**

   ```bash
   env\Scripts\activate
   ```

   **macOS/Linux:**

   ```bash
   source env/bin/activate
   ```

4. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Run migrations:

   ```bash
   python myproject/manage.py migrate
   ```

6. Start the backend server:

   ```bash
   python myproject/manage.py runserver
   ```

Backend runs at **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**

---

### 💻 Frontend (React + Vite)

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file and add:

   ```bash
   VITE_PUBLIC_SERVER_URL="http://127.0.0.1:8000"
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

Frontend runs at **[http://localhost:5173/](http://localhost:5173/)**

---

## 🔑 Environment Variables

### Backend `.env` file (`backend/myproject/.env`)

```ini
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

# CORS / CSRF
FRONTEND_URL=http://localhost:5173

# Database (MySQL Example)
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=3306
```

---

## 🧠 API Overview

| Endpoint           | Method | Description       |
| ------------------ | ------ | ----------------- |
| `/api/posts/`      | GET    | List all posts    |
| `/api/posts/<id>/` | GET    | Get post details  |
| `/api/posts/`      | POST   | Create a new post |
| `/api/posts/<id>/` | PUT    | Update a post     |
| `/api/posts/<id>/` | DELETE | Delete a post     |

---

## 📸 Screenshots

### 🏠 Homepage

![Homepage Screenshot](https://github.com/user-attachments/assets/0e094eab-917e-446d-b63c-53aaa296e968)

### 📝 Create Post

![Create Post Screenshot](https://github.com/user-attachments/assets/8a401a27-a526-403c-9908-97f37cbe4b39)

---

## 🧰 Tech Stack

**Frontend**

* React.js (Vite)
* Axios
* Tailwind CSS

**Backend**

* Django
* Django REST Framework
* django-cors-headers
* python-dotenv
* MySQL *(or SQLite)*

---

## 🛡️ Deployment Notes

When deploying:

1. Set `DEBUG=False` in `.env`
2. Update:

   ```ini
   ALLOWED_HOSTS=yourbackenddomain.com
   FRONTEND_URL=https://yourfrontenddomain.com
   ```
3. Add environment variables in your hosting platform *(Render, Railway, etc.)*
4. Collect static files:

   ```bash
   python myproject/manage.py collectstatic
   ```

---

## 👨‍💻 Author

**Developed by:** Pc
🌐 Portfolio: [pavishk.dev](https://pavishk.dev)

---

## 🪪 License

This project is open-source and available under the **MY License**.

```
