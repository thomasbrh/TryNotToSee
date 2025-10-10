"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".toggle");
    const handle = document.querySelector(".handle");
    const labels = document.querySelectorAll(".label");
    const bgHome = document.querySelector(".bg__home");
    const bgFlou = document.querySelector(".bg__flou");
    const bgFlouGame = document.querySelector(".bg__flou-game");

    let isDragging = false;
    let startX = 0;
    let handleX = 0;
    const minLeft = -1;
    const maxLeft = 102; // Position max droite du handle

    // F(x) pour update l'état
    function setState(value) {
        labels.forEach(label => {
            label.classList.toggle("active", label.dataset.value === value);
        });

        if (value === "oui") {
            handle.style.left = `${minLeft}px`;
            bgFlou.style.backdropFilter = "blur(0px)";
            bgHome.style.webkitBackdropFilter = "blur(0px)";
            if (bgFlouGame) {
                bgFlouGame.style.backdropFilter = "blur(0px)";
                bgFlouGame.style.webkitBackdropFilter = "blur(0px)";
            }
        } else {
            handle.style.left = `${maxLeft}px`;
            bgFlou.style.backdropFilter = "blur(14px)";
            bgHome.style.webkitBackdropFilter = "blur(14px)";
            if (bgFlouGame) {
                bgFlouGame.style.backdropFilter = "blur(14px)";
                bgFlouGame.style.webkitBackdropFilter = "blur(14px)";
            }
        }
    }

    // F(x) pr obtenir la valeur présente
    function getCurrentValue() {
        return parseInt(handle.style.left) <= (maxLeft / 2) ? "oui" : "non";
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
        const newValue = getCurrentValue() === "oui" ? "non" : "oui";
        setState(newValue);
    });

    // Init
    setState("oui");
});