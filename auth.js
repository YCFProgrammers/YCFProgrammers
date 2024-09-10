function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    localStorage.setItem('userToken', googleUser.getAuthResponse().id_token);
    localStorage.setItem('username', profile.getName());
    console.log("Redirigiendo a page.html");
    window.location.replace('https://ycfprogrammers.vercel.app/page.html');
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('userToken')) {
        window.location.href = 'page.html';
    }
});
