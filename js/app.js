import { getFilterState, passesFilters, matchesSearch } from "./filters.js";
import { compareBy, debounce } from "./utils.js";
import { render, setLatestVerifiedDate } from "./render.js";

async function loadData() {
  const res = await fetch("data/universities.json");
  const data = await res.json();
  const required = [
    "UniversityName",
    "Country",
    "City",
    "InstructionLanguage",
    "ProgramStrength",
    "Intake",
    "NextDeadline",
    "TuitionCurrency",
    "TuitionYear",
    "TuitionLocal",
    "TuitionUSD",
    "BudgetBand",
    "ScholarshipType",
    "ScholarshipCoverage",
    "EligibilityInternational",
    "PostStudyWork",
    "SourceLink",
    "VerifiedDate",
  ];
  const valid = [];
  data.forEach((u, idx) => {
    const missing = required.filter((r) => !(r in u));
    if (missing.length) {
      console.warn(`Row ${idx} missing fields: ${missing.join(", ")}`);
      return;
    }
    valid.push(u);
  });
  return valid;
}

function applyFilters() {
  const state = getFilterState();
  const query = document.getElementById("search").value.trim();
  const filtered = window.__allUniversities.filter(
    (u) => passesFilters(u, state) && matchesSearch(u, query),
  );
  const sorted = filtered.sort(
    compareBy("TuitionUSD", "Country", "UniversityName"),
  );
  render(sorted);
}

function clearFilters() {
  document.getElementById("filters-form").reset();
  applyFilters();
}

window.addEventListener("DOMContentLoaded", async () => {
  window.__allUniversities = await loadData();
  const latest = window.__allUniversities.reduce(
    (acc, cur) => (acc > cur.VerifiedDate ? acc : cur.VerifiedDate),
    "",
  );
  setLatestVerifiedDate(latest);
  document
    .getElementById("filters-form")
    .addEventListener("change", applyFilters);
  document
    .getElementById("search")
    .addEventListener("input", debounce(applyFilters, 300));
  document
    .getElementById("clear-filters")
    .addEventListener("click", clearFilters);
  applyFilters();
});
