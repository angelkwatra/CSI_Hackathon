document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:5000/api/dashboard/kpi');
        if (!response.ok) throw new Error("Network response failed");
        
        const kpi = await response.json();
        
        // Update DOM elements
        const co2El = document.getElementById('co2-val');
        const costEl = document.getElementById('cost-val');
        
        if (co2El) co2El.innerText = `${kpi.totalCO2Saved.toFixed(2)} kg`;
        if (costEl) costEl.innerText = `₹ ${kpi.totalCostSaved.toFixed(2)}`;
        
    } catch (error) {
        console.error("Failed to fetch KPIs:", error);
        
        const co2El = document.getElementById('co2-val');
        const costEl = document.getElementById('cost-val');
        if (co2El) co2El.innerText = "Error";
        if (costEl) costEl.innerText = "Offline";
    }
});
