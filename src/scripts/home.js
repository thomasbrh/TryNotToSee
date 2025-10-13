'use strict';
//USER FORM
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('user-form');
  const startButton = document.querySelector('.start-button');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the entered username
    const usernameInput = document.getElementById('user-input').value;

    // Save the username in localStorage
    localStorage.setItem('user-input', usernameInput);

    console.log('Username saved:', usernameInput);
  });
});