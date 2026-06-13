const fechaParam = new URLSearchParams(location.search).get("fecha");
const fechaEl = document.getElementById("fecha") || document.getElementById("poema-fecha");
if (fechaParam && fechaEl) fechaEl.textContent = fechaParam;
