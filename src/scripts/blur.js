"use strict";
// Gestion du blur
window.blurValue = "oui"; // état initial

    const toggle = document.querySelector(".toggle"); // on | off
    const handle = document.querySelector(".handle"); 
    // choix "oui"/"non"
    const labels = document.querySelectorAll(".label");
    //img bg normal
    const bgHome = document.querySelector(".bg__home"); 
    // img bg floutée
    const bgFlou = document.querySelector(".bg__flou"); 

    // Variables liées au déplacement du curseur
    let isDragging = false;
    let startX = 0;
    let handleX = 0;
    const minLeft = -1;
    const maxLeft = 102; // Position max droite du handle

    // Fonction qui applique un état de flou ou non
    function setState(value) {
        // exposer la valeur pour Phaser
        window.blurValue = value;
      
        // états visuels des labels
        labels.forEach(label => {
          label.classList.toggle("active", label.dataset.value === value);
        });
      
        // mets le curseur à la bonne position selon la valeur actuelle
        handle.style.left = (value === "non") ? `${minLeft}px` : `${maxLeft}px`;
      
        // garder l’effet sur la page "blur"
        const blurPx = (value === "non") ? "0px" : "6px";
        bgFlou.style.backdropFilter = `blur(${blurPx})`;
      
        // notifier Phaser si la valeur change pendant le jeu
        document.dispatchEvent(new CustomEvent("blurChanged", { detail: value }));
      }
      
    // "oui" ou "non"
    console.log(window.blurValue); 

    // Gestion du bouton pour la valeur actuelle du toggle
    function getCurrentValue() {
        return parseInt(handle.style.left) <= (maxLeft / 2) ? "non" : "oui";
    }

    // Démarrer le drag souris/tactile
    const startDrag = (clientX) => {
        isDragging = true;
        startX = clientX;
        handleX = parseInt(handle.style.left) || 0;
        handle.style.transition = "none";
        handle.style.cursor = "grabbing";
    };

    // Pendant le drag
    const duringDrag = (clientX) => {
        if (!isDragging) return;
        let newLeft = handleX + (clientX - startX);
        newLeft = Math.max(minLeft, Math.min(maxLeft, newLeft));
        handle.style.left = `${newLeft}px`;
    };

    // Fin du drag
    const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        handle.style.transition = "left 0.25s ease";
        handle.style.cursor = "grab";

        const value = getCurrentValue();
        setState(value);
    };

    // Événements souris
    handle.addEventListener("mousedown", (e) => startDrag(e.clientX));
    document.addEventListener("mousemove", (e) => duringDrag(e.clientX));
    document.addEventListener("mouseup", endDrag);

    // Événements tactiles
    handle.addEventListener("touchstart", (e) => startDrag(e.touches[0].clientX));
    document.addEventListener("touchmove", (e) => duringDrag(e.touches[0].clientX));
    document.addEventListener("touchend", endDrag);

    // Gestion du click sur le toggle
    toggle.addEventListener("click", (e) => {
        // Éviter que le click déclenche un toggle après un drag
        if (isDragging) return;

        // Inverse la valeur actuelle
        const newValue = getCurrentValue() === "oui" ? "non" : "oui";
        // Sauvegarde la valeur dans le localStorage
        localStorage.setItem('blur-value', getCurrentValue());
        // Met à jour l’état visuel et notifie
        setState(newValue);
    });

    // Init
    setState("oui");