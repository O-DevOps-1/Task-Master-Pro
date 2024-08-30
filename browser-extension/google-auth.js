function onGoogleSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  const idToken = googleUser.getAuthResponse().id_token;

  fetch('http://localhost:5000/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: idToken }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Logged in with Google:', data);
      window.location.href = 'popup.html';
    })
    .catch(error => console.error('Error:', error)); }
