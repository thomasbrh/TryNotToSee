'use strict';

// Sélection du corps du tableau où seront affichés les scores
const scoreBody = document.getElementById("score-body");

// Récupération des meilleurs scores depuis le localStorage
const bestScores = JSON.parse(localStorage.getItem("bestScores")) || [];

// Vérifie s’il y a des scores enregistrés
if (bestScores.length === 0) {
    scoreBody.innerHTML = `<tr><td colspan="3">Aucun score enregistré</td></tr>`;
}

bestScores.forEach((entry, index) => {
    // Crée une nouvelle ligne <tr> pour le tableau
    const row = document.createElement("tr");

    // Crée deux cellules <td> : une pour le nom, une pour le temps
    const nameCell = document.createElement("td");
    const timeCell = document.createElement("td");

    // Assigne le texte des cellules noms et temps
    nameCell.textContent = entry.name;
    timeCell.textContent = entry.time;

    // Ajoute les cellules dans la ligne
    row.appendChild(nameCell);
    row.appendChild(timeCell);

    // Ajoute la ligne dans le tableau HTML
    scoreBody.appendChild(row);
});