// Add a finisher by adding an object to this array, then redeploy.
// tierKey must be one of: uno-fresco, dos-caliente, tres-locos, el-cuatro, ultra-70k
// Example: { name: "Jane Doe", tierKey: "el-cuatro", gender: "F", age: 34, date: "2026-05-01", time: "18:42" }
const leaderboardEntries = [
  { name: "Pascal Bourut", tierKey: "uno-fresco", gender: "M", age: 40, date: "2020-03-04", time: "2:36:13" },
  { name: "Jeremy Harper", tierKey: "uno-fresco", gender: "M", age: "N/S", date: "2020-08-29", time: "3:41:24" },
  { name: "Sean Caudill", tierKey: "uno-fresco", gender: "M", age: "N/S", date: "2020-08-29", time: "2:14:26" },
  { name: "Nicholas Mazur", tierKey: "uno-fresco", gender: "M", age: "N/S", date: "2020-08-29", time: "2:35:48" },
  { name: "Sabrina Huelga", tierKey: "uno-fresco", gender: "F", age: "N/S", date: "2019-10-19", time: "3:15:55" },
  { name: "Joe Shea", tierKey: "uno-fresco", gender: "M", age: "N/S", date: "2019-07-27", time: "2:54:57" },
  { name: "Wayne Jung", tierKey: "uno-fresco", gender: "M", age: "N/S", date: "2019-07-27", time: "3:22:49" },
  { name: "Tina Thompson", tierKey: "uno-fresco", gender: "F", age: "N/S", date: "2019-07-28", time: "4:36:48" },
  { name: "Amber Nichelle", tierKey: "uno-fresco", gender: "F", age: "N/S", date: "2019-07-27", time: "3:27:53" },
  { name: "John Malloy", tierKey: "uno-fresco", gender: "M", age: "N/S", date: "2019-07-27", time: "2:15:52" },
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
  const toSecs = (t) => t.split(":").reduce((acc, v, i, arr) => acc + parseInt(v) * Math.pow(60, arr.length - 1 - i), 0);
  const entries = leaderboardEntries
    .filter((e) => e.tierKey === activeTier)
    .sort((a, b) => toSecs(a.time) - toSecs(b.time));

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
