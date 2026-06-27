// Add a finisher by adding an object to this array, then redeploy.
// tierKey must be one of: uno-fresco, dos-caliente, tres-locos, el-cuatro, ultra-70k
// Example: { name: "Jane Doe", tierKey: "el-cuatro", gender: "F", age: 34, date: "2026-05-01", time: "18:42" }
const leaderboardEntries = [
  { name: "Lorem Ipsum", tierKey: "uno-fresco", gender: "M", age: 29, date: "2026-01-12", time: "17:42" },
  { name: "Dolor Sit", tierKey: "dos-caliente", gender: "F", age: 34, date: "2026-01-19", time: "18:08" },
  { name: "Amet Consectetur", tierKey: "tres-locos", gender: "M", age: 41, date: "2026-02-02", time: "20:55" },
  { name: "Adipiscing Elit", tierKey: "el-cuatro", gender: "F", age: 27, date: "2026-02-14", time: "17:30" },
  { name: "Sed Do Eiusmod", tierKey: "ultra-70k", gender: "M", age: 38, date: "2026-02-21", time: "19:47" },
  { name: "Tempor Incididunt", tierKey: "uno-fresco", gender: "F", age: 31, date: "2026-03-01", time: "21:15" },
];

const leaderboardTiers = [
  { key: "uno-fresco", label: "Uno Fresco" },
  { key: "dos-caliente", label: "Dos Caliente" },
  { key: "tres-locos", label: "Tres Locos" },
  { key: "el-cuatro", label: "El Cuatro" },
  { key: "ultra-70k", label: "Ultra" },
];

let activeTier = leaderboardTiers[0].key;

function renderTabs() {
  const tabsRoot = document.querySelector(".lb-tabs");
  tabsRoot.innerHTML = leaderboardTiers
    .map(
      (t) =>
        `<button class="lb-tab${t.key === activeTier ? " active" : ""}" data-tier="${t.key}">${t.label}</button>`
    )
    .join("");

  tabsRoot.querySelectorAll(".lb-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeTier = btn.dataset.tier;
      renderTabs();
      renderLeaderboard();
    });
  });
}

function renderLeaderboard() {
  const root = document.getElementById("leaderboard-root");
  const entries = leaderboardEntries.filter((e) => e.tierKey === activeTier);

  if (!entries.length) {
    root.innerHTML =
      '<div class="empty-state"><p>No finishers yet for this tier. Be the first to submit a result.</p></div>';
    return;
  }

  const rows = entries
    .map(
      (e) =>
        `<tr><td><span class="lb-badge ${e.tierKey}"><span class="swatch-a"></span><span class="swatch-b"></span></span></td><td>${e.name}</td><td>${e.gender}</td><td>${e.age}</td><td>${e.date}</td><td>${e.time}</td></tr>`
    )
    .join("");

  root.innerHTML = `<table class="leaderboard">
    <thead>
      <tr><th></th><th>Name</th><th>Gender</th><th>Age</th><th>Date</th><th>Time</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

renderTabs();
renderLeaderboard();
