<img width="100%" src="./frontend/public/velora_banner.jpg" >

#  <img width=50 height=50 src="./frontend/public/velora_icon.png" > Velora – Ride Booking App  
![Status](https://img.shields.io/badge/status-active-success.svg)  

<img align="right" alt="coding" width="500" src="./frontend/public/Velora (2).gif"  >

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Google Maps API](https://img.shields.io/badge/Google_Maps_API-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

<br>

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)


Velora is a **real-time ride-hailing platform** that connects users with captains. Built with **Socket.IO**, **MongoDB Atlas**, and **Google Maps integration**, it provides seamless ride booking, acceptance, and live tracking.  

## 🌍 Live Demo  
🔗 [/Velora](https://velora-eight-rho.vercel.app/)  

---

## ✨ Features  
- 🔐 User & Captain Authentication (MongoDB Atlas)  
- 📲 Book a ride with pickup & drop locations  
- 🚗 Captains receive ride requests instantly (**Socket.IO**)  
- ✅ Captains can accept rides (updates reflect for users in real-time)  
- 🗺️ **Google Maps Integration** with live tracking  
- 📌 Fully deployed and mobile responsive  

---

## 🛠️ Tech Stack  
- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas  
- **Real-time**: Socket.IO  
- **Maps**: Google Maps API

---

## 📸 Screenshots

<img src="./frontend/public/Screenshot 2025-08-20 235455.png" >

<img src="./frontend/public/Screenshot 2025-08-20 235518.png" >

<img src="./frontend/public/Screenshot 2025-08-20 235547.png" >

<img src="./frontend/public/Screenshot 2025-08-20 235632.png" >

---

---

## 📂 Project Structure  
```bash
velora/
├── Backend/
│   ├── .gitignore
│   ├── app.js
│   ├── controllers/
│   ├── db/
│   ├── middlewares/
│   ├── models/
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── routes/
│   ├── server.js
│   ├── services/
│   └── socket.js
└── frontend/
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public/
    ├── README.md
    ├── src/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets/
    │   ├── components/
    │   ├── context/
    │   ├── index.css
    │   ├── main.jsx
    │   └── pages/
    ├── tailwind.config.js
    ├── vercel.json
    └── vite.config.js

```

---

## 🚀 Getting Started  

```bash
# Clone the repository
git clone https://github.com/ancure-2004/Velora.git

cd Velora

#Frontend dependencies
cd frontend
npm install

#backend dependencies
cd backend
npm install

# Run backend
cd backend
npx nodemon

# Run frontend
cd frontend
npm run dev
```
---

## Environment Variables

Create a `.env` file in the **backend** root directory and add the following variables:

```env
PORT="Enter PORT"
MONGODB_URI="Enter your mongoDB connection string"
JWT_SECRET="Enter Your secret key"
GOOGLE_MAPS_API="Google Maps API Key"
SOCKET_ORIGIN="Enter the URL where Frontend is Running"
```

Create a `.env` file in the **frontend** root directory and add the following variables:

```env
VITE_BASE_URL = "Enter the URL where backend is running"
VITE_GOOGLE_MAPS_API_KEY = "Your google maps api key"
```

---

## 🔮 Future Enhancements
- 💳 Payment Integration (UPI, Cards, Wallets)
- 📖 Ride History for users & captains
- ⭐ Ratings & Reviews system
- 🛡️ Improved UI with animations and smooth transitions

---

## 🤝 Contributing
# We welcome contributions!
- Fork the repository
- Create a new branch (git checkout -b feature-name)
- Make your changes and commit (git commit -m 'Add feature')
- Push to the branch (git push origin feature-name)
- Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

### Contact
- 📧 ankur2004tyagi@gmail.com
- 🔗 www.linkedin.com/in/ankur-tyagi2004
