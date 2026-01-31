const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMkoYMSs0M5JTE-eA2kWf9fy0wRzCbwJpeOf8WREzsay9ErdZz5_PHvis-yEO4UPQsqX4fovn-IWsv/pub?output=csv";

fetch(CSV_URL)
  .then(response => response.text())
  .then(csvText => {
    const rows = csvText.trim().split("\n").map(r => r.split(","));

    // Extract header
    const headers = rows[0];
    const dataRows = rows.slice(1);

    // 🔧 CONFIG HERE
    const labelColumn = headers[0];   // X-axis
    const valueColumn = headers[6];   // Y-axis (change index if needed)

    const labelIndex = headers.indexOf(labelColumn);
    const valueIndex = headers.indexOf(valueColumn);

    const labels = [];
    const values = [];

    dataRows.forEach(row => {
      labels.push(row[labelIndex]);
      values.push(Number(row[valueIndex]));
    });

    drawChart(labels, values, valueColumn);
  });

function drawChart(labels, values, title) {
  new Chart(document.getElementById("myChart"), {
    type: "line", // bar | line | pie
    data: {
      labels: labels,
      datasets: [{
        label: title,
        data: values,
        borderWidth: 2,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
