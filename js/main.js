const chatbot = new Chatbot();

async function handleUserInput() {
    const userInput = document.getElementById('user-input').value;
    const chatContainer = document.getElementById('chat-container');
    const thinkingIndicator = document.getElementById('thinking');
    
    chatContainer.innerHTML += `<div class="user-message"><strong>You:</strong> ${userInput}</div>`;
    thinkingIndicator.style.display = 'block';
    
    try {
        const response = await chatbot.handleUserInput(userInput);
        thinkingIndicator.style.display = 'none';
        chatContainer.innerHTML += `<div class="bot-message"><strong>BeastGPT:</strong> ${response}</div>`;
        document.getElementById('user-input').value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        // Add buttons for user feedback and follow-up
        const feedbackButtons = `
            <button onclick="improveResponse('${userInput}', '${response.replace(/'/g, "\\'")}')">Improve Response</button>
            <button onclick="askFollowUp('${userInput}')">Ask Follow-up</button>
        `;
        chatContainer.innerHTML += `<div class="feedback-buttons">${feedbackButtons}</div>`;
    } catch (error) {
        thinkingIndicator.style.display = 'none';
        chatContainer.innerHTML += `<div class="bot-message error"><strong>BeastGPT:</strong> An error occurred. Please try again.</div>`;
    }
}

async function improveResponse(userInput, originalResponse) {
    const chatContainer = document.getElementById('chat-container');
    const thinkingIndicator = document.getElementById('thinking');
    
    thinkingIndicator.style.display = 'block';
    
    try {
        const improvedResponse = await chatbot.improveResponse(userInput, originalResponse);
        thinkingIndicator.style.display = 'none';
        chatContainer.innerHTML += `<div class="bot-message"><strong>BeastGPT (Improved):</strong> ${improvedResponse}</div>`;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    } catch (error) {
        thinkingIndicator.style.display = 'none';
        chatContainer.innerHTML += `<div class="bot-message error"><strong>BeastGPT:</strong> An error occurred while improving the response. Please try again.</div>`;
    }
}

async function askFollowUp(userInput) {
    const chatContainer = document.getElementById('chat-container');
    const followUpQuestion = prompt("What's your follow-up question?");
    
    if (followUpQuestion) {
        chatContainer.innerHTML += `<div class="user-message"><strong>You (Follow-up):</strong> ${followUpQuestion}</div>`;
        const thinkingIndicator = document.getElementById('thinking');
        thinkingIndicator.style.display = 'block';
        
        try {
            const response = await chatbot.answerFollowUpQuestion(followUpQuestion);
            thinkingIndicator.style.display = 'none';
            chatContainer.innerHTML += `<div class="bot-message"><strong>BeastGPT (Follow-up):</strong> ${response}</div>`;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        } catch (error) {
            thinkingIndicator.style.display = 'none';
            chatContainer.innerHTML += `<div class="bot-message error"><strong>BeastGPT:</strong> An error occurred while answering the follow-up question. Please try again.</div>`;
        }
    }
}

// Event listeners
document.getElementById('send-btn').addEventListener('click', handleUserInput);
document.getElementById('user-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

// Voice input functionality
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    
    document.getElementById('voice-btn').addEventListener('click', () => {
        recognition.start();
    });
    
    recognition.onresult = (event) => {
        const voiceInput = event.results[0][0].transcript;
        document.getElementById('user-input').value = voiceInput;
        handleUserInput();
    };
}

// Export conversation functionality
document.getElementById('export-btn').addEventListener('click', () => {
    const exportData = chatbot.exportConversation();
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'conversation_history.json';
    a.click();
});

// Initialize the chat with a welcome message
window.onload = () => {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML += `<div class="bot-message"><strong>BeastGPT:</strong> Welcome! I'm BeastGPT, an advanced AI chatbot. How can I assist you today?</div>`;
};