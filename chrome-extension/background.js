chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "LOG_ACTIVITY") {
    console.log("Activity detected from Background Script:", request.payload);
    
    // Send to backend Activity API
    fetch("http://localhost:5000/api/activities", {
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
