// Add a finisher by adding an object to this array, then redeploy.
// tierKey must be one of: uno-fresco, dos-caliente, tres-locos, el-cuatro, ultra-70k
// Example: { name: "Jane Doe", tierKey: "el-cuatro", tier: "El Cuatro", peaks: 16, date: "2026-05-01", time: "18:42" }
const leaderboardEntries = [
  { name: "Lorem Ipsum", tierKey: "uno-fresco", tier: "Uno Fresco", peaks: 4, date: "2026-01-12", time: "9:42" },
  { name: "Dolor Sit", tierKey: "dos-caliente", tier: "Dos Caliente", peaks: 8, date: "2026-01-19", time: "14:08" },
  { name: "Amet Consectetur", tierKey: "tres-locos", tier: "Tres Locos", peaks: 12, date: "2026-02-02", time: "16:55" },
  { name: "Adipiscing Elit", tierKey: "el-cuatro", tier: "El Cuatro", peaks: 16, date: "2026-02-14", time: "17:30" },
  { name: "Sed Do Eiusmod", tierKey: "ultra-70k", tier: "Phoenix Phearsome Phour 70K", peaks: 8, date: "2026-02-21", time: "19:47" },
  { name: "Tempor Incididunt", tierKey: "uno-fresco", tier: "Uno Fresco", peaks: 4, date: "2026-03-01", time: "10:15" },
];

function renderLeaderboard() {
  const root = document.getElementById("leaderboard-root");
  if (!leaderboardEntries.length) {
    root.innerHTML =
      '<div class="empty-state"><p>No finishers yet. Be the first to submit a result.</p></div>';
    return;
  }

  const rows = leaderboardEntries
    .map(
      (e) =>
        `<tr><td><span class="lb-badge ${e.tierKey}"><span class="swatch-a"></span><span class="swatch-b"></span></span></td><td>${e.name}</td><td>${e.tier}</td><td>${e.peaks}</td><td>${e.date}</td><td>${e.time}</td></tr>`
    )
    .join("");

  root.innerHTML = `<table class="leaderboard">
    <thead>
      <tr><th></th><th>Name</th><th>Tier</th><th>Peaks</th><th>Date</th><th>Time</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

renderLeaderboard();
