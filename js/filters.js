export function getFilterState() {
  const form = document.getElementById("filters-form");
  const state = {
    country: Array.from(
      form.querySelectorAll('input[name="country"]:checked'),
    ).map((i) => i.value),
    scholarshipType: Array.from(
      form.querySelectorAll('input[name="scholarshipType"]:checked'),
    ).map((i) => i.value),
    instructionLanguage: form.instructionLanguage.value,
    programStrength: Array.from(
      form.querySelectorAll('input[name="programStrength"]:checked'),
    ).map((i) => i.value),
    budgetBand:
      form.querySelector('input[name="budgetBand"]:checked')?.value || "",
    intake: Array.from(
      form.querySelectorAll('input[name="intake"]:checked'),
    ).map((i) => i.value),
  };
  return state;
}

export function passesFilters(u, state) {
  if (state.country.length && !state.country.includes(u.Country)) return false;
  if (
    state.scholarshipType.length &&
    !state.scholarshipType.includes(u.ScholarshipType)
  )
    return false;
  if (
    state.instructionLanguage &&
    state.instructionLanguage !== u.InstructionLanguage
  )
    return false;
  if (
    state.programStrength.length &&
    !state.programStrength.includes(u.ProgramStrength)
  )
    return false;
  if (state.budgetBand && state.budgetBand !== u.BudgetBand) return false;
  if (state.intake.length && !state.intake.some((i) => u.Intake.includes(i)))
    return false;
  return true;
}

export function matchesSearch(u, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return [u.UniversityName, u.City, u.ScholarshipNames || ""]
    .join(" ")
    .toLowerCase()
    .includes(q);
}
