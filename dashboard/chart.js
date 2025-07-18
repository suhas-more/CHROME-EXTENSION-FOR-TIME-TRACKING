fetch("http://localhost:3001/summary")
  .then(res => res.json())
  .then(data => {
    const labels = data.map(entry => entry.domain);
    const durations = data.map(entry => entry.totalTime);

    new Chart(document.getElementById("timeChart"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Time Spent (min)",
          data: durations,
          backgroundColor: "#3e95cd"
        }]
      }
    });
  });
