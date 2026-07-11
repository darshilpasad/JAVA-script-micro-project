// Water Quality Monitoring Dashboard
// Values are demo estimates. Replace getWaterQualityData() with your sensor/API data when available.

const waterQualityMetrics = [
  { id: "wqi", icon: "🌊", name: "Water Quality Index (WQI)", unit: "/ 100", description: "Overall water quality", max: 100, color: "#0d6efd" },
  { id: "ph", icon: "🧪", name: "pH", unit: "", description: "Indicates acidity/alkalinity", max: 14, color: "#6610f2" },
  { id: "dissolvedOxygen", icon: "💨", name: "Dissolved Oxygen (DO)", unit: " mg/L", description: "Indicates aquatic health", max: 12, color: "#20c997" },
  { id: "turbidity", icon: "🦠", name: "Turbidity", unit: " NTU", description: "Water clarity; high values may indicate contamination", max: 20, color: "#fd7e14" },
  { id: "salinity", icon: "🧂", name: "Salinity", unit: " PSU", description: "Useful for marine ecosystem analysis", max: 40, color: "#0dcaf0" },
  { id: "oilSpill", icon: "☣", name: "Oil Spill Detection", unit: "", description: "Detects surface oil contamination", max: 1, color: "#dc3545" },
  { id: "plasticWaste", icon: "🧴", name: "Plastic Waste Density", unit: " items/km²", description: "Floating plastic concentration", max: 100, color: "#6f42c1" },
  { id: "microplastics", icon: "🦠", name: "Microplastic Concentration", unit: " particles/L", description: "Measures microplastic pollution", max: 50, color: "#d63384" },
  { id: "nutrients", icon: "🧪", name: "Nitrate / Phosphate", unit: " mg/L", description: "Indicates fertilizer runoff and eutrophication", max: 10, color: "#198754" },
  { id: "heavyMetals", icon: "☠", name: "Heavy Metals", unit: " µg/L", description: "Lead, Mercury, Cadmium, etc.", max: 100, color: "#6c757d" },
  { id: "bacteria", icon: "🦠", name: "Bacterial Levels", unit: " CFU/100 mL", description: "E. coli, coliform bacteria", max: 1000, color: "#b02a37" }
];

let chart;

function buildWaterQualityDashboard() {
  const container = document.querySelector(".container.mt-5");
  if (!container) return;

  // Remove the old weather/marine cards and chart; they are not water-quality measures.
  container.querySelectorAll(".row, .card.shadow.mt-4.mb-5").forEach((element) => element.remove());

  container.insertAdjacentHTML("beforeend", `
    <div class="row mb-4">
      <div class="col-md-6 mb-2 mb-md-0">
        <select id="city" class="form-select">
          <option value="Mumbai">Mumbai</option><option value="Chennai">Chennai</option>
          <option value="Kochi">Kochi</option><option value="Visakhapatnam">Visakhapatnam</option>
          <option value="Goa">Goa</option><option value="Mangalore">Mangalore</option>
          <option value="Kanyakumari">Kanyakumari</option><option value="Puducherry">Puducherry</option>
          <option value="Paradip">Paradip</option>
        </select>
      </div>
      <div class="col-md-6"><button class="btn btn-primary w-100" id="refreshButton">🔄 Refresh Water Quality Data</button></div>
    </div>
    <div class="text-center"><div class="spinner-border text-primary d-none" id="loader" role="status"></div></div>
    <p class="text-center" id="status" aria-live="polite"></p>
    <div class="row" id="waterQualityCards"></div>
    <div class="card shadow mt-4 mb-5"><div class="card-body">
      <h4 class="text-center text-primary">📊 Water Quality Overview</h4>
      <canvas id="waterQualityChart"></canvas>
    </div></div>`);

  document.getElementById("waterQualityCards").innerHTML = waterQualityMetrics.map((metric) => `
    <div class="col-md-4 col-lg-3 mb-3">
      <div class="card shadow h-100"><div class="card-body text-center">
        <h5>${metric.icon} ${metric.name}</h5>
        <h3 id="${metric.id}">--</h3>
        <small class="text-muted">${metric.description}</small>
      </div></div>
    </div>`).join("");

  document.getElementById("refreshButton").addEventListener("click", loadData);
  createChart();
}

function createChart() {
  chart = new Chart(document.getElementById("waterQualityChart"), {
    type: "bar",
    data: { labels: [], datasets: [{ label: "Water quality risk (%)", data: [], backgroundColor: [] }] },
    options: { responsive: true, plugins: { title: { display: true, text: "Water Quality Risk Indicators" } }, scales: { y: { beginAtZero: true, max: 100 } } }
  });
}

function getWaterQualityData() {
  return {
    wqi: Math.round(68 + Math.random() * 22), ph: +(7.4 + Math.random() * 0.8).toFixed(1),
    dissolvedOxygen: +(5.5 + Math.random() * 2.5).toFixed(1), turbidity: +(1 + Math.random() * 7).toFixed(1),
    salinity: +(30 + Math.random() * 6).toFixed(1), oilSpill: Math.random() > 0.85 ? "Detected" : "Not detected",
    plasticWaste: Math.round(12 + Math.random() * 55), microplastics: +(1 + Math.random() * 12).toFixed(1),
    nutrients: +(0.2 + Math.random() * 2.5).toFixed(2), heavyMetals: +(2 + Math.random() * 18).toFixed(1),
    bacteria: Math.round(35 + Math.random() * 380)
  };
}

function riskPercent(metric, value) {
  if (metric.id === "wqi" || metric.id === "dissolvedOxygen") return Math.max(0, 100 - (Number(value) / metric.max) * 100);
  if (metric.id === "ph") return Math.min(100, Math.abs(Number(value) - 7) * 35);
  if (metric.id === "oilSpill") return value === "Detected" ? 100 : 0;
  return Math.min(100, (Number(value) / metric.max) * 100);
}

function loadData() {
  const loader = document.getElementById("loader");
  const status = document.getElementById("status");
  loader.classList.remove("d-none");
  status.className = "text-center text-primary";
  status.textContent = "Loading water quality data...";

  setTimeout(() => {
    const data = getWaterQualityData();
    waterQualityMetrics.forEach((metric) => {
      document.getElementById(metric.id).textContent = `${data[metric.id]}${metric.unit}`;
    });

    chart.data.labels = waterQualityMetrics.map((metric) => metric.name.replace(/ \(.+\)/, ""));
    chart.data.datasets[0].data = waterQualityMetrics.map((metric) => riskPercent(metric, data[metric.id]).toFixed(1));
    chart.data.datasets[0].backgroundColor = waterQualityMetrics.map((metric) => metric.color);
    chart.update();

    loader.classList.add("d-none");
    status.className = "text-center text-success";
    status.textContent = `Water quality data updated for ${document.getElementById("city").value} at ${new Date().toLocaleTimeString()} (demo estimates)`;
  }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  buildWaterQualityDashboard();
  loadData();
});
