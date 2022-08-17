document.addEventListener('DOMContentLoaded', function() {
  const SIGNUP_API = 'http://localhost:8080/signup';
  const LOGIN_API = 'http://localhost:8080/login';

  const $signUpForm = document.getElementById('signup');
  const $loginForm = document.getElementById('login');

  function login(credentials) {
    fetch(LOGIN_API, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      return response.json();
    }).then(function(auth) {
      sessionStorage.setItem('token', auth.token);
      location.replace('/index.html');
    }).catch(function() {
      console.error('Could not login');
    });
  }

  $signUpForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData($signUpForm);
    const jsonData = Object.fromEntries(formData.entries());

    fetch(SIGNUP_API, {
      method: 'POST',
      body: JSON.stringify(jsonData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      login(jsonData);
    }).catch(function() {
      console.error('Account not created');
    });
  });

  $loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData($loginForm);
    const jsonData = Object.fromEntries(formData.entries());

    login(jsonData);
  });
});
