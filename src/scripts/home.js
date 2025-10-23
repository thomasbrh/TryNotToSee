'use strict';
//USER FORM
  const form = document.getElementById('user-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    console.log('test');

    // Get the entered username
    const usernameInput = document.getElementById('user-input').value;

    // Save the username in localStorage
    localStorage.setItem('user-input', usernameInput);

    console.log('Username saved:', usernameInput);
  });