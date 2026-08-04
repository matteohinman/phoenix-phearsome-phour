// Add a finisher by adding an object to this array, then redeploy.
// tierKey must be one of: uno-fresco, dos-caliente, tres-locos, el-cuatro, ultra-70k
// Example: { name: "Jane Doe", tierKey: "el-cuatro", gender: "F", age: 34, date: "2026-05-01", time: "18:42" }
//
// support: "Supported" or "Unsupported". Only tracked for the Ultra, and only
// shown on that tab. Anything missing renders as N/S, matching how age does it.
// Example: { name: "Jane Doe", tierKey: "ultra-70k", gender: "F", age: 34, date: "2027-02-20", time: "14:02:11", support: "Unsupported" }
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
  { name: "Andrew Smith", tierKey: "uno-fresco", gender: "M", age: "N/S", date: "2019-07-27", time: "2:19:37" },
  { name: "Matthew Hinman", tierKey: "uno-fresco", gender: "M", age: 49, date: "2023-07-29", time: "2:48:13" },
  { name: "Matthew Hinman", tierKey: "dos-caliente", gender: "M", age: 46, date: "2020-08-29", time: "5:53:44" },
  { name: "Matthew Hinman", tierKey: "dos-caliente", gender: "M", age: 45, date: "2019-10-19", time: "6:42:43" },
  { name: "Matthew Hinman", tierKey: "dos-caliente", gender: "M", age: 45, date: "2019-07-27", time: "5:40:01" },
];

const leaderboardTiers = [
  { key: "uno-fresco", label: "Uno Fresco" },
  { key: "dos-caliente", label: "Dos Caliente" },
  { key: "tres-locos", label: "Tres Locos" },
  { key: "el-cuatro", label: "El Cuatro" },
  { key: "ultra-70k", label: "Ultra" },
];

const ULTRA_TIER_KEY = "ultra-70k";

let activeTier = leaderboardTiers[0].key;

// Unsupported is the harder claim, so it gets the accent. Anything unrecorded
// falls back to N/S, the same marker the age column already uses.
function supportCell(value) {
  if (value !== "Supported" && value !== "Unsupported") {
    return '<span class="lb-support unknown">N/S</span>';
  }
  const modifier = value === "Unsupported" ? "unsupported" : "supported";
  return `<span class="lb-support ${modifier}">${value}</span>`;
}

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

  // Crewing is only tracked for the Ultra, so the column only exists on that tab
  // rather than sitting empty across every other tier.
  const showSupport = activeTier === ULTRA_TIER_KEY;

  const rows = entries
    .map((e) => {
      const support = showSupport
        ? `<td>${supportCell(e.support)}</td>`
        : "";
      return `<tr><td><span class="lb-badge ${e.tierKey}"><span class="swatch-a"></span><span class="swatch-b"></span></span></td><td>${e.name}</td><td>${e.gender}</td><td>${e.age}</td>${support}<td>${e.date}</td><td>${e.time}</td></tr>`;
    })
    .join("");

  const supportHead = showSupport ? "<th>Support</th>" : "";

  root.innerHTML = `<table class="leaderboard">
    <thead>
      <tr><th></th><th>Name</th><th>Gender</th><th>Age</th>${supportHead}<th>Date</th><th>Time</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

renderTabs();
renderLeaderboard();
