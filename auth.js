function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    localStorage.setItem('userToken', googleUser.getAuthResponse().id_token);
    localStorage.setItem('username', profile.getName());
    localStorage.removeItem('guestUser');
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
 
let guestMessageCount = 0;
const MAX_GUEST_MESSAGES = 6;

document.getElementById('guest-login-btn').addEventListener('click', function() {
    localStorage.setItem('guestUser', 'true');
    window.location.href = 'page.html';
});

function checkGuestLimit() {
    if (localStorage.getItem('guestUser') === 'true') {
        guestMessageCount++;
        if (guestMessageCount >= MAX_GUEST_MESSAGES) {
            document.getElementById('chat-input').disabled = true;
            document.getElementById('send-btn').disabled = true;
            
            const warningDiv = document.createElement('div');
            warningDiv.style.color = 'red';
            warningDiv.innerHTML = 'You have reached the limit of the free plan. Please sign in to continue.';
            
            const signInBtn = document.createElement('button');
            signInBtn.textContent = 'Sign in with Google';
            signInBtn.onclick = function() {
                // Trigger Google sign-in
                gapi.auth2.getAuthInstance().signIn();
            };
            
            warningDiv.appendChild(signInBtn);
            document.body.appendChild(warningDiv);
        }
    }
}
