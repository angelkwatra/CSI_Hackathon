try {
  importScripts("config.js");
} catch (e) {
  console.error("Failed to load config.js:", e);
}

// Manage persistent User ID
let userId = null;
chrome.storage.local.get(['carbon_user_id'], (result) => {
  if (result.carbon_user_id) {
    userId = result.carbon_user_id;
  } else {
    userId = 'user-' + Math.random().toString(36).substring(2, 9);
    chrome.storage.local.set({ carbon_user_id: userId });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "LOG_ACTIVITY") {
    const api_url = (typeof CONFIG !== "undefined" ? CONFIG.API_URL : "https://carbon-oh-no.onrender.com");
    
    // Attach the persistent userId to the payload
    const finalPayload = { ...request.payload, userId: userId };
    
    // Send to backend Activity API
    fetch(`${api_url}/api/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalPayload)
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
