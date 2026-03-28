// ── Carbon-oh-no Content Scraper ─────────────────────────────────────

function logActivityToDashboard(payload) {
  try {
    chrome.runtime.sendMessage({ type: "LOG_ACTIVITY", payload }, () => {});
  } catch(e) {}
}

// Fully robust, unblockable UI injector (Fixed position on screen)
function injectBanner(id, message) {
  try {
    if (document.getElementById(id)) return;
    
    const banner = document.createElement("div");
    banner.id = id;
    // Guaranteed to be Top-Center on ANY website
    banner.setAttribute("style", "position: fixed; top: 16px; left: 50%; transform: translateX(-50%); background-color: #064e3b; color: #a7f3d0; padding: 12px 20px; border-radius: 8px; font-family: ui-sans-serif, system-ui, sans-serif; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 8px; border: 2px solid #059669; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5); z-index: 2147483647; animation: slideIn 0.3s ease-out; pointer-events: none;");
    banner.innerHTML = `<span style="font-size: 18px">🌱</span><span>${message}</span>`;
    
    document.body.appendChild(banner);
  } catch(e) {}
}

function removeBanner(id) {
  try {
    const banner = document.getElementById(id);
    if (banner) banner.remove();
  } catch(e) {}
}

// ── 1. ChatGPT Tracker (chatgpt.com) ─────────────
if (window.location.hostname.includes("chatgpt.com")) {
  let lastCharCount = 0;

  setInterval(() => {
    try {
      // Find ChatGPT input box specifically (they use contenteditable divs with these tags)
      const textarea = document.getElementById("prompt-textarea") || document.querySelector('div[contenteditable="true"]') || document.querySelector('div[contenteditable="plaintext-only"]');
      if (!textarea) return;

      const textContent = textarea.value || textarea.innerText || textarea.textContent || "";
      const charCount = textContent.trim().length;
      lastCharCount = charCount;
      
      // VERY LOW threshold for testing: 20 characters! 
      if (charCount > 20) {
        injectBanner("carbon-chatgpt-warning", `High Token Usage! (> ${charCount} chars). Estimated: ~0.005 kg CO₂. Consider summarizing!`);
      } else {
        removeBanner("carbon-chatgpt-warning");
      }
    } catch (e) {}
  }, 1000);

  document.addEventListener("keydown", (e) => {
    try {
      if (e.key === "Enter" && !e.shiftKey && lastCharCount > 0) {
        scrapeAndPostGPT(lastCharCount);
        removeBanner("carbon-chatgpt-warning");
      }
    } catch(e) {}
  });

  document.addEventListener("click", (e) => {
    try {
      let target = e.target;
      while (target && target !== document) {
        if (target.getAttribute && target.getAttribute("data-testid") && target.getAttribute("data-testid").includes("send-button")) {
          if (lastCharCount > 0) {
            scrapeAndPostGPT(lastCharCount);
            removeBanner("carbon-chatgpt-warning");
          }
          break;
        }
        target = target.parentNode;
      }
    } catch(e) {}
  });

  function scrapeAndPostGPT(charCount) {
    const estimatedTokens = Math.ceil(charCount / 4) + 50; 
    const cost = parseFloat((estimatedTokens * 0.0015).toFixed(4));
    const carbon = parseFloat((estimatedTokens * 0.00002).toFixed(5));
    logActivityToDashboard({ type: "ai", description: `ChatGPT prompt (${charCount} chars)`, size: `${estimatedTokens} tokens`, costINR: cost, carbonKg: carbon });
  }
}

// ── 2. Gmail Tracker (mail.google.com) ───────────
if (window.location.hostname.includes("mail.google.com")) {
  let lastTotalMB = 0;

  setInterval(() => {
    try {
      let totalMB = 0.0;
      // Approach 1: Gmail's built-in Screen Reader accessibility labels (Most Robust)
      const attachmentChips = document.querySelectorAll('[aria-label*="Attachment"]'); 
      attachmentChips.forEach(chip => {
        const label = chip.getAttribute("aria-label") || "";
        const match = label.match(/([\d.]+)\s*(MB|KB|GB|M|K)/i);
        if (match) {
          const sizeInfo = parseFloat(match[1]);
          const unit = match[2].toUpperCase();
          if (unit === "MB" || unit === "M") totalMB += sizeInfo;
          else if (unit === "KB" || unit === "K") totalMB += (sizeInfo / 1024);
          else if (unit === "GB" || unit === "G") totalMB += (sizeInfo * 1024);
        }
      });

      // Approach 2: Fallback to reading small spans containing sizes (if aria tags change)
      if (totalMB === 0) {
        // We ONLY look inside Gmail compose windows (.M9 is the container class for Gmail drafts)
        const composeWindows = document.querySelectorAll('.M9, .AD'); 
        const seen = new Set();
        
        composeWindows.forEach(win => {
          const spans = win.querySelectorAll('span');
          spans.forEach(span => {
            const text = (span.innerText || "").trim();
            if (text.length > 0 && text.length < 20) {
               const match = text.match(/^\(?([\d.]+)\s*(MB|KB|GB|M|K)\)?$/i);
               if (match && !seen.has(text)) {
                 seen.add(text);
                 const sizeInfo = parseFloat(match[1]);
                 const unit = match[2].toUpperCase();
                 if (unit === "MB" || unit === "M") totalMB += sizeInfo;
                 else if (unit === "KB" || unit === "K") totalMB += (sizeInfo / 1024);
                 else if (unit === "GB" || unit === "G") totalMB += (sizeInfo * 1024);
               }
            }
          });
        });
      }

      lastTotalMB = totalMB;
      if (totalMB > 0.5) { // Threshold is 500KB
        injectBanner("carbon-gmail-warning", `Heavy attachments! (${totalMB.toFixed(2)} MB). Use a Google Drive link to save CO₂!`);
      } else {
        removeBanner("carbon-gmail-warning");
      }
    } catch(e) {}
  }, 1500);

  document.addEventListener("click", (e) => {
    try {
      let target = e.target;
      while (target && target !== document) {
        if (
          (target.getAttribute && target.getAttribute("data-tooltip") && target.getAttribute("data-tooltip").includes("Send \u202A")) ||
          (target.innerText && target.innerText.includes("Send") && target.getAttribute && target.getAttribute("role") === "button")
        ) {
          scrapeAndPostEmail(lastTotalMB);
          removeBanner("carbon-gmail-warning");
          break;
        }
        target = target.parentNode;
      }
    } catch(e) {}
  });

  function scrapeAndPostEmail(totalMB) {
    let sizeStr = "Text Email";
    let estCost = 0.05; 
    let estCarbon = 0.004;
    if (totalMB > 0) {
      sizeStr = `${totalMB.toFixed(1)} MB`;
      estCost = parseFloat((0.05 + (totalMB * 0.12)).toFixed(3)); 
      estCarbon = parseFloat((0.004 + (totalMB * 0.015)).toFixed(3)); 
    }
    logActivityToDashboard({ type: "email", description: totalMB > 0 ? "Email with attachments sent" : "Standard email", size: sizeStr, costINR: estCost, carbonKg: estCarbon });
  }
}
