document.addEventListener('DOMContentLoaded', async () => {
    // 1. Get or Generate userId (Match background.js using chrome.storage)
    chrome.storage.local.get(['carbon_user_id'], async (result) => {
        let userId = result.carbon_user_id;
        if (!userId) {
            userId = 'user-' + Math.random().toString(36).substring(2, 9);
            chrome.storage.local.set({ carbon_user_id: userId });
        }

        // 2. Update Dashboard Link with userId
        const dashboardLink = document.querySelector('.btn-primary');
        if (dashboardLink) {
            const baseUrl = "https://carbon-oh-no.vercel.app/";
            dashboardLink.href = `${baseUrl}?user=${userId}`;
        }

        // 3. Update Popup KPI data
        try {
            const api_url = "https://carbon-oh-no.onrender.com";
            const response = await fetch(`${api_url}/api/dashboard/kpi?userId=${userId}`);
            if (!response.ok) throw new Error("Network response failed");
            
            const kpi = await response.json();
            const co2El = document.getElementById('co2-val');
            const costEl = document.getElementById('cost-val');
            
            if (co2El) co2El.innerText = `${kpi.totalCO2Saved.toFixed(2)} kg`;
            if (costEl) costEl.innerText = `₹ ${kpi.totalCostSaved.toFixed(2)}`;
            
        } catch (error) {
            console.error("Failed to fetch KPIs:", error);
        }
    });
});
