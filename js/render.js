import { formatCurrency, parseISODate } from "./utils.js";

export function render(universities) {
  const tbody = document.querySelector("#results-table tbody");
  const cards = document.getElementById("results-cards");
  tbody.innerHTML = "";
  cards.innerHTML = "";
  universities.forEach((u) => {
    tbody.appendChild(renderRow(u));
    cards.appendChild(renderCard(u));
  });
  document
    .getElementById("empty-state")
    .classList.toggle("hidden", universities.length !== 0);
  updateSummary(universities.length, window.__allUniversities.length);
}

function renderRow(u) {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${u.UniversityName}</td>
    <td>${u.Country} / ${u.City}</td>
    <td>${u.InstructionLanguage}</td>
    <td>${u.ProgramStrength}</td>
    <td>${formatCurrency(u.TuitionLocal, u.TuitionCurrency)} (${u.TuitionYear})<br>${formatCurrency(u.TuitionUSD, "USD")}${u.FXToUSD ? "<sup>*</sup>" : ""}</td>
    <td>${u.EstimatedCoLUSD ? formatCurrency(u.EstimatedCoLUSD, "USD") : "—"}</td>
    <td>${u.ScholarshipType}${u.ScholarshipNames ? " - " + u.ScholarshipNames : ""}</td>
    <td>${u.ScholarshipCoverage}</td>
    <td>${u.EligibilityInternational ? "Yes" : "No"}</td>
    <td class="${isPast(u.NextDeadline) ? "past-deadline" : ""}">${u.NextDeadline}</td>
    <td>${u.PostStudyWork}</td>
    <td>${u.SourceLink ? `<a href="${u.SourceLink}" target="_blank" rel="noopener">link</a>` : ""}</td>`;
  return tr;
}

function renderCard(u) {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h3>${u.UniversityName}</h3>
    <p>${u.Country} / ${u.City}</p>
    <p>${u.InstructionLanguage} • ${u.ProgramStrength}</p>
    <p>Tuition: ${formatCurrency(u.TuitionLocal, u.TuitionCurrency)} (${u.TuitionYear})<br>${formatCurrency(u.TuitionUSD, "USD")}${u.FXToUSD ? "<sup>*</sup>" : ""}</p>
    <p>CoL: ${u.EstimatedCoLUSD ? formatCurrency(u.EstimatedCoLUSD, "USD") : "—"}</p>
    <p>Scholarship: <span class="badge">${u.ScholarshipType}</span></p>
    <details>
      <summary>Details</summary>
      <p>${u.ScholarshipNames || ""}</p>
      ${u.Notes ? `<p>${u.Notes}</p>` : ""}
    </details>
    <p>Coverage: ${u.ScholarshipCoverage} • Eligible Int'l: ${u.EligibilityInternational ? "Yes" : "No"}</p>
    <p class="${isPast(u.NextDeadline) ? "past-deadline" : ""}">Deadline: ${u.NextDeadline}</p>
    <p>Work: ${u.PostStudyWork}</p>
    ${u.SourceLink ? `<p><a href="${u.SourceLink}" target="_blank" rel="noopener">Source</a></p>` : ""}
  `;
  return div;
}

function isPast(dateStr) {
  const d = parseISODate(dateStr);
  if (!d) return false;
  const today = new Date();
  return d < today;
}

export function updateSummary(count, total) {
  document.getElementById("results-summary").textContent =
    `Showing ${count} of ${total} universities`;
}

export function setLatestVerifiedDate(dateStr) {
  document.getElementById("latest-verified").textContent = dateStr;
}
