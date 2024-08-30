function onFacebookLogin() {
  FB.login(function (response) {
    if (response.authResponse) {
      FB.api('/me', { fields: 'name,email' }, function (response) {
        fetch('http://localhost:5000/api/auth/facebook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: response.authResponse.accessToken }),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Logged in with Facebook:', data);
            window.location.href = 'popup.html';
          })
          .catch(error => console.error('Error:', error));
      });
    } else {
      console.log('User cancelled login or did not fully authorize.'); }
  });}
