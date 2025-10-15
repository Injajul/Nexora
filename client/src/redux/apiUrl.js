// 📁 src/config.js

// ✅ Automatically switch between local and deployed URL
const BASE_DOMAIN =
  import.meta.env.MODE === "development"
    ? "http://localhost:5004"
    : "https://nexora-xb3v.onrender.com"; 

export const API_BASE_URL = `${BASE_DOMAIN}/api`;
