const CONFIG = {
  // Local Development
  API_URL: "http://localhost:5000",
  
  // Production (Uncomment and replace with your Render URL after deployment)
  // API_URL: "https://carbon-oh-no-backend.onrender.com", 
};

// Make it accessible across background and content scripts
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
