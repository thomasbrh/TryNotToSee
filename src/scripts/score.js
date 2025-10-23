'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const scoreBody = document.getElementById("score-body");

  const bestScores = JSON.parse(localStorage.getItem("bestScores")) || [];

  if (bestScores.length === 0) {
    scoreBody.innerHTML = `<tr><td colspan="3">Aucun score enregistré.</td></tr>`;
    return;
  }

  bestScores.forEach((entry, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    const timeCell = document.createElement("td");

    nameCell.textContent = entry.name;
    timeCell.textContent = entry.time;

    row.appendChild(nameCell);
    row.appendChild(timeCell);

    scoreBody.appendChild(row);
  });
});