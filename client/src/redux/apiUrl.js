// 📁 src/config.js

// ✅ Automatically switch between local and deployed URL
const BASE_DOMAIN =
  import.meta.env.MODE === "development"
    ? "http://localhost:5004"
    : "https://your-deployed-domain.com"; // <-- Replace this with your live backend URL

export const API_BASE_URL = `${BASE_DOMAIN}/api`;
