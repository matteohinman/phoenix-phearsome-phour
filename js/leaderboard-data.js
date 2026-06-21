// Add a finisher by adding an object to this array, then redeploy.
// Example: { name: "Jane Doe", tier: "El Cuatro", peaks: 4, date: "2026-05-01", time: "18:42" }
const leaderboardEntries = [];

function renderLeaderboard() {
  const root = document.getElementById("leaderboard-root");
  if (!leaderboardEntries.length) {
    root.innerHTML =
      '<div class="empty-state"><p>No finishers yet &mdash; be the first to submit a result.</p></div>';
    return;
  }

  const rows = leaderboardEntries
    .map(
      (e) =>
        `<tr><td>${e.name}</td><td>${e.tier}</td><td>${e.peaks}</td><td>${e.date}</td><td>${e.time}</td></tr>`
    )
    .join("");

  root.innerHTML = `<table class="leaderboard">
    <thead>
      <tr><th>Name</th><th>Tier</th><th>Peaks</th><th>Date</th><th>Time</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

renderLeaderboard();
