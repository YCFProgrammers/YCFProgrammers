document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const chatContainer = document.querySelector('.chat-container');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.querySelector('button');

    // Get username from localStorage
    const username = localStorage.getItem('username') || 'Usuario';

    // Create and add menu
    const menu = document.createElement('nav');
    menu.id = 'top-menu';
    menu.innerHTML = `
        <ul>
            <li id="username-display">Bienvenido, ${username}</li>
            <li><a href="#" id="theme-toggle">Tema</a></li>
            <li><a href="#" id="clear-chat">Limpiar</a></li>
            <li><a href="#" id="help">Ayuda</a></li>
            <li><a href="#" id="logout">Cerrar Sesión</a></li>
        </ul>
    `;
    document.body.insertBefore(menu, document.body.firstChild);

    // Improve chat container styling
    chatContainer.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    chatContainer.style.borderRadius = '12px';
    chatContainer.style.overflow = 'hidden';

    // Improve chat messages styling
    chatMessages.style.padding = '20px';
    chatMessages.style.backgroundColor = '#f9f9f9';

    // Improve input styling
    userInput.style.border = 'none';
    userInput.style.borderBottom = '2px solid #007bff';
    userInput.style.borderRadius = '0';
    userInput.style.padding = '10px';
    userInput.style.fontSize = '16px';

    // Improve button styling
    sendButton.style.backgroundColor = '#007bff';
    sendButton.style.color = 'white';
    sendButton.style.border = 'none';
    sendButton.style.borderRadius = '0 0 12px 0';
    sendButton.style.padding = '10px 20px';
    sendButton.style.cursor = 'pointer';

    // Add event listeners for menu items
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('clear-chat').addEventListener('click', clearChat);
    document.getElementById('help').addEventListener('click', showHelp);
    document.getElementById('logout').addEventListener('click', logout);

    function toggleTheme() {
        body.classList.toggle('dark-theme');
        const botMessages = document.querySelectorAll('.bot-message');
        botMessages.forEach(msg => msg.classList.toggle('dark-theme'));
    }

    function clearChat() {
        chatMessages.innerHTML = '';
    }

    function showHelp() {
        const helpMessage = `
            <div class="message bot-message">
                <h3>Available Commands:</h3>
                <ul>
                    <li>logica factorial [number]</li>
                    <li>logica fibonacci [number]</li>
                    <li>logica primo [number]</li>
                    <li>logica cuadratica [a] [b] [c]</li>
                    <li>logica convertir [value] [from] a [to]</li>
                    <li>logica diasentre [date1] [date2]</li>
                    <li>logica proximodia [day]</li>
                    <li>logica contarpalabras [text]</li>
                    <li>logica invertirpalabras [text]</li>
                </ul>
            </div>
        `;
        chatMessages.innerHTML += helpMessage;
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function logout() {
        localStorage.removeItem('userToken');
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    }
});
