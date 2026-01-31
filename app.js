const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTMkoYMSs0M5JTE-eA2kWf9fy0wRzCbwJpeOf8WREzsay9ErdZz5_PHvis-yEO4UPQsqX4fovn-IWsv/pub?output=csv";

fetch(SHEET_CSV_URL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1);
    const labels = [];
    const values = [];

    rows.forEach(row => {
      const [date, value] = row.split(",");
      labels.push(date);
      values.push(Number(value));
    });

    new Chart(document.getElementById("myChart"), {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Sales",
          data: values,
          borderWidth: 2
        }]
      }
    });
  });
