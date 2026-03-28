try {
  importScripts("config.js");
} catch (e) {
  console.error("Failed to load config.js:", e);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "LOG_ACTIVITY") {
    console.log("Activity detected from Background Script:", request.payload);
    
    const api_url = (typeof CONFIG !== "undefined" ? CONFIG.API_URL : "http://localhost:5000");
    
    // Send to backend Activity API
    fetch(`${api_url}/api/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request.payload)
    })
    .then(res => {
      if (!res.ok) throw new Error("API Network response was not ok");
      return res.json();
    })
    .then(data => {
      console.log("Successfully logged to Carbon-oh-no dashboard:", data);
      sendResponse({ status: "success", data });
    })
    .catch(err => {
      console.error("Failed to sync activity to dashboard:", err);
      sendResponse({ status: "error", error: err.toString() });
    });

    return true; // We will respond asynchronously
  }
});
