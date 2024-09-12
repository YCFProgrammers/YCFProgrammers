// Función para buscar en DuckDuckGo
async function searchDuckDuckGo(query) {
    try {
        const response = await axios.get(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
        const data = response.data;
        if (data.AbstractText) {
            return data.AbstractText;
        } else if (data.RelatedTopics && data.RelatedTopics.length > 0) {
            return data.RelatedTopics[0].Text;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error en DuckDuckGo:', error);
        return null;
    }
}

// Función para buscar en Wikipedia
async function searchWikipedia(query) {
    try {
        const response = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        if (response.data && response.data.extract) {
            return response.data.extract;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error en Wikipedia:', error);
        return null;
    }
}

// Función para buscar en Google (utilizando serpapi.com)
async function searchGoogle(query) {
    try {
        const response = await axios.get(`https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=YOUR_GOOGLE_API_KEY`);
        if (response.data.snippets && response.data.snippets.length > 0) {
            return response.data.snippets[0].snippet;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error en Google:', error);
        return null;
    }
}

// Función para buscar en la API de OpenWeather (por ejemplo, para preguntas sobre clima)
async function searchOpenWeather(query) {
    try {
        const city = query.split("clima en")[1].trim(); // Extracción del nombre de la ciudad
        const apiKey = 'YOUR_OPENWEATHER_API_KEY';
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&lang=es`);
        if (response.data && response.data.weather) {
            const description = response.data.weather[0].description;
            const temp = (response.data.main.temp - 273.15).toFixed(1); // Conversión de Kelvin a Celsius
            return `El clima en ${city} es ${description} con una temperatura de ${temp}°C.`;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error en OpenWeather:', error);
        return null;
    }
}

// Función para buscar en Stack Overflow (para preguntas técnicas)
async function searchStackOverflow(query) {
    try {
        const response = await axios.get(`https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&q=${encodeURIComponent(query)}&site=stackoverflow`);
        if (response.data.items && response.data.items.length > 0) {
            return response.data.items[0].title + ": " + response.data.items[0].link;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error en Stack Overflow:', error);
        return null;
    }
}

// Función principal para coordinar la búsqueda en múltiples fuentes
async function searchMultipleSources(query) {
    const results = [];

    const sources = [
        searchGoogle(query),
        searchDuckDuckGo(query),
        searchWikipedia(query),
        searchOpenWeather(query),
        searchStackOverflow(query),
        // Aquí podrías añadir más fuentes (ej. Twitter API, YouTube, etc.)
    ];

    // Ejecutar todas las fuentes en paralelo
    const responses = await Promise.all(sources);

    // Filtrar resultados válidos
    responses.forEach(response => {
        if (response) {
            results.push(response);
        }
    });

    // Si no hay resultados válidos, devuelve una respuesta predeterminada
    if (results.length === 0) {
        return "Lo siento, no encontré información sobre eso.";
    }

    // Combinar resultados en un solo texto para mostrar en el chatbot
    return results.join("\n\n");
}

// Función para procesar el mensaje del usuario y buscar una respuesta
async function processUserMessage(message) {
    const respuesta = await searchMultipleSources(message);
    addBotMessage(respuesta);
}

// Función para agregar mensaje de usuario al contenedor
function addUserMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.textContent = message;
    chatMessages.appendChild(userMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Función para agregar mensaje del bot al contenedor
function addBotMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    botMessage.textContent = message;
    chatMessages.appendChild(botMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Función para enviar el mensaje del usuario
function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();

    if (message === '') return;

    addUserMessage(message);
    processUserMessage(message); // Procesa el mensaje del usuario y busca una respuesta
    userInput.value = '';
}
