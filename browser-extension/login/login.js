document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Logged in:', data);
      window.location.href = 'popup.html';
    })
    .catch(error => console.error('Error:', error));
});


document.getElementById('google-login').addEventListener('click', onGoogleSignIn);
document.getElementById('facebook-login').addEventListener('click', onFacebookLogin);
