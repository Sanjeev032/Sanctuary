# Peace - The Living Sanctuary 🌿✨

Peace is a biophilic, zen-inspired mindfulness application designed to help users find their inner sanctuary. Through nature-inspired design, guided breathing exercises, mood-based music therapy, and personal journaling, Peace provides a holistic approach to mental well-being.



## 🍃 Biophilic Zen Philosophy

At its core, Peace is built upon the principles of **Biophilic Design**—integrating nature into our digital spaces to reduce stress, improve cognitive function, and enhance mood. The user interface features soft organic shapes, a nature-inspired color palette, and smooth, flowing animations that mimic natural movement.



## 🌟 Key Features

- **🧘 Sensory Breathing**: Guided breathing exercises with immersive visual cues to help you center yourself.
- **🎵 Mood-Based Music Therapy**: Dynamically generated soundscapes tailored to your current emotional state.
- **📓 Personal Sanctuary (Journaling)**: A private space to record your thoughts, feelings, and progress.
- **🎭 Mood Tracking**: Quick and intuitive mood check-ins to monitor your emotional trends over time.
- **📊 Admin Dashboard**: A comprehensive portal for managing music content, mood categories, and monitoring platform growth.
- **🔐 Secure Sanctuary**: Personal accounts with JWT-based authentication to keep your data private and secure.


## 🛠️ Technology Stack

### Frontend
- **React 19**: Modern UI development with the latest React features.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS 4**: Utility-first styling for a sleek, responsive design.
- **Motion (Framer Motion)**: Fluid, high-performance animations.
- **Lucide React**: Clean and consistent iconography.

### Backend
- **Node.js & Express**: Scalable and performant server architecture.
- **MongoDB & Mongoose**: Flexible, schema-based data modeling.
- **JWT & bcryptjs**: Secure authentication and password hashing.
- **TypeScript**: Type-safety across the entire backend for maintainable code.



## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Sanjeev032/Sanctuary.git
cd Sanctuary


### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
ADMIN_SECRET=your_admin_setup_secret
```
Start the backend:
```bash
npm run dev


### 3. Frontend Setup
```bash
cd ../frontend
npm install
Start the frontend:
```bash
npm run dev
```

---

## 📂 Project Structure

```text
├── backend/
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Auth and validation
│   │   └── server.ts      # App entry point
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # State management (Auth, Mood)
│   │   ├── pages/         # Screen components
│   │   └── main.tsx       # React entry point
└── README.md
```

---

## 🤝 Contributing

We welcome contributions! If you have ideas for new features or improvements, feel free to open an issue or submit a pull request.

---

## 📜 License

This project is licensed under the ISC License.

---

Designed with ❤️ to bring a little more peace to the world.
