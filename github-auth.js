function handleGitHubCallback() {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      // Envía el código a tu servidor para obtener el token de acceso
      fetch('/github-callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('userToken', data.access_token);
        window.location.href = 'page.html';
      })
      .catch(error => console.error('Error:', error));
    }
  }
  
  window.onload = handleGitHubCallback;
  