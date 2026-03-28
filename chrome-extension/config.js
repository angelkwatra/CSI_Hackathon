const CONFIG = {
  // Local Development
  // API_URL: "http://localhost:5000",
  
  // Production
  API_URL: "https://carbon-oh-no.onrender.com", 
};

// Make it accessible
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}
if (typeof self !== "undefined") {
  self.CONFIG = CONFIG;
}
