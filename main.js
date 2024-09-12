const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const voiceButton = document.getElementById('voice-button');


let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'es-ES';

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        sendMessage();
    };
} else {
    voiceButton.style.display = 'none';
}

// Nuevo diccionario
const diccionario = {
    "abalanzar": "Ir impetuosamente hacia algo o alguien.",
    "bambolear": "Mover algo de un lado a otro con suavidad.",
    "cavilar": "Pensar con intención o profundidad.",
    "dádiva": "Regalo, cosa que se da gratuitamente.",
    "efímero": "Que dura poco tiempo o es pasajero.",
    "fútil": "De poco valor o importancia.",
    "gregario": "Que vive en grupos o manadas.",
    "hilarante": "Que produce risa o alegría.",
    "ínfimo": "Muy pequeño o de poca importancia.",
    "jocoso": "Gracioso, divertido, alegre.",
        "aberrante": "Que se desvía o aparta de lo que se considera normal, natural, correcto o lícito.",
        "abismo": "Profundidad grande, imponente y peligrosa.",
        "absorto": "Totalmente concentrado en algo.",
        "abundancia": "Gran cantidad de algo.",
        "acertijo": "Problema o enigma de difícil solución.",
        "acceso": "Acto de llegar a un lugar o tener la oportunidad de usar algo.",
        "acogedor": "Que resulta agradable y cómodo.",
        "acrónimo": "Palabra formada por la unión de partes de otras palabras.",
        "adagio": "Sentencia breve que encierra un mensaje de sabiduría.",
        "adepto": "Persona que sigue o apoya una ideología o movimiento.",
        "adversidad": "Situación difícil o desfavorable.",
        "afable": "Que es amable y agradable en el trato.",
        "aflicción": "Sentimiento de tristeza o dolor profundo.",
        "ágil": "Que se mueve con soltura y rapidez.",
        "agonía": "Estado previo a la muerte o gran sufrimiento.",
        "alegría": "Sentimiento grato y vivo de felicidad.",
        "alivio": "Disminución o desaparición de un dolor o preocupación.",
        "altruismo": "Actitud de procurar el bien ajeno aun a costa del propio interés.",
        "ambigüedad": "Situación que puede interpretarse de varias maneras.",
        "amenidad": "Cualidad de ser agradable y entretenido.",
        "amnesia": "Pérdida total o parcial de la memoria.",
        "anhelo": "Deseo intenso de conseguir algo.",
        "anómalo": "Que se aparta de lo que es normal o esperado.",
        "apogeo": "Punto culminante de un proceso o actividad.",
        "aprecio": "Valoración favorable de alguien o algo.",
        "arduo": "Que es muy difícil o laborioso.",
        "aroma": "Olor agradable.",
        "artesano": "Persona que realiza trabajos manuales con habilidad.",
        "asombro": "Impresión que causa algo inesperado o extraordinario.",
        "atemorizar": "Causar miedo a alguien.",
        "atónito": "Que está muy sorprendido o impresionado.",
        "audaz": "Que se atreve a afrontar situaciones difíciles con valentía.",
        "augurio": "Señal o anuncio de un suceso futuro.",
        "autonomía": "Capacidad de una entidad para gobernarse a sí misma.",
        "aventura": "Suceso extraño o poco frecuente que comporta riesgo o incertidumbre.",
        "avidez": "Deseo fuerte de conseguir algo, especialmente dinero o poder.",
        "bálsamo": "Sustancia que calma o alivia un dolor.",
        "benevolencia": "Actitud comprensiva y tolerante hacia los demás.",
        "bohemio": "Persona que lleva una vida despreocupada, sin atarse a normas convencionales.",
        "bravura": "Valentía y decisión en situaciones difíciles.",
        "cadencia": "Ritmo o repetición regular de sonidos o movimientos.",
        "calamidad": "Desgracia o infortunio de grandes proporciones.",
        "cálido": "Que es agradablemente caliente.",
        "calumnia": "Falsa acusación hecha contra alguien con la intención de dañar su reputación.",
        "candor": "Inocencia, pureza o sinceridad excesiva.",
        "capricho": "Deseo impulsivo y sin razón aparente.",
        "carencia": "Falta de algo necesario.",
        "carisma": "Capacidad de atraer y cautivar a los demás.",
        "catástrofe": "Suceso que causa gran destrucción o sufrimiento.",
        "cautela": "Precaución o reserva en el actuar.",
        "certero": "Que da en el blanco o es muy acertado.",
        "clarividencia": "Capacidad de prever o percibir cosas que no están al alcance de los sentidos.",
        "colapso": "Desplome o hundimiento total.",
        "compasión": "Sentimiento de pena por el sufrimiento ajeno.",
        "complacencia": "Actitud de quien busca agradar a los demás.",
        "conmiseración": "Sentimiento de lástima o pena por la desgracia ajena.",
        "consternación": "Sentimiento de dolor o pena profunda ante un hecho grave.",
        "contundente": "Que es tan evidente o decisivo que no deja lugar a dudas.",
        "coraje": "Valentía para enfrentarse a situaciones difíciles.",
        "cordura": "Juicio y sensatez en las acciones o decisiones.",
        "credibilidad": "Cualidad de ser creíble o digno de confianza.",
        "crispación": "Estado de tensión extrema.",
        "crucial": "Que es decisivo o muy importante en un proceso o situación.",
        "culminar": "Llegar al punto más alto o importante de un proceso.",
        "dádiva": "Regalo o donación que se hace de manera desinteresada.",
        "debilidad": "Falta de fuerza física o moral.",
        "deferencia": "Respeto o cortesía hacia alguien.",
        "deleite": "Placer intenso.",
        "desasosiego": "Falta de tranquilidad o paz interior.",
        "desdén": "Actitud de indiferencia o desprecio hacia algo o alguien.",
        "desolación": "Sentimiento de tristeza profunda.",
        "desvelo": "Estado de estar despierto cuando se debería estar durmiendo.",
        "dicha": "Estado de felicidad completa.",
        "diligente": "Que pone mucho interés, esmero y rapidez en la realización de una tarea.",
        "dinámico": "Que tiene energía y actividad constantes.",
        "discernir": "Distinguir algo con claridad entre otras cosas.",
        "discreción": "Capacidad de actuar con prudencia y sin llamar la atención.",
        "disparate": "Dicho o hecho sin sentido ni razón.",
        "distinción": "Diferencia que hace una cosa notable o superior.",
        "diversidad": "Variedad, diferencia.",
        "docto": "Que tiene muchos conocimientos, especialmente en ciencias o humanidades.",
        "dulzura": "Cualidad de lo que es dulce o suave.",
        "efímero": "Que dura muy poco tiempo.",
        "elegancia": "Cualidad de ser refinado y con buen gusto.",
        "elocuencia": "Habilidad para expresarse de manera persuasiva y clara.",
        "emblema": "Símbolo que representa a una entidad o idea.",
        "empatía": "Capacidad de ponerse en el lugar de otro y comprender sus sentimientos.",
        "enigma": "Adivinanza o cosa que no se puede comprender o explicar.",
        "enriquecer": "Hacer más rico o valioso en algún aspecto.",
        "entereza": "Firmeza de ánimo para afrontar las dificultades.",
        "epifanía": "Manifestación o aparición de algo.",
        "equilibrio": "Estado de estabilidad o armonía.",
        "esencia": "Lo más importante o característico de algo.",
        "esfuerzo": "Empleo enérgico de la fuerza física o mental para conseguir algo.",
        "esmero": "Cuidado y atención extrema al hacer algo.",
        "estigma": "Marca o señal que denota alguna característica o condición deshonrosa.",
        "estima": "Aprecio o valoración favorable hacia alguien o algo.",
        "eterno": "Que no tiene fin o dura indefinidamente.",
        "exaltación": "Estado de gran excitación o entusiasmo.",
        "exquisito": "Que tiene un sabor o calidad extraordinariamente refinados.",
        "faceta": "Cada uno de los aspectos que puede tener una persona o cosa.",
        "fascinación": "Atracción irresistible que ejerce algo o alguien.",
        "fealdad": "Cualidad de ser feo o desagradable a la vista.",
        "felicidad": "Estado de ánimo que se complace en la posesión de un bien.",
        "fervor": "Intensidad de los sentimientos y emociones.",
        "filantropía": "Amor al género humano, generalmente manifestado en la ayuda a los demás.",
        "firmeza": "Solidez y seguridad en la manera de actuar o pensar.",
        "fragancia": "Olor agradable y suave.",
        "franqueza": "Actitud de quien se expresa con sinceridad y claridad.",
        "fugaz": "Que pasa rápidamente o de corta duración.",
        "gélido": "Extremadamente frío.",
        "generosidad": "Actitud de dar o compartir sin esperar nada a cambio.",
        "gentileza": "Cualidad de ser amable y atento.",
        "gravedad": "Importancia o seriedad de una situación o asunto.",
        "hilarante": "Que provoca risa intensa.",
        "hito": "Hecho o acontecimiento importante que marca un punto decisivo.",
        "honestidad": "Cualidad de ser honesto y decir la verdad.",
};

function buscarInformacionAdicional(mensaje) {
    const palabra = mensaje.split(' ')[1];
    if (diccionario[palabra]) {
        return `La definición de ${palabra} es: ${diccionario[palabra]}`;
    }
    return null;
}

function buscarEnDiccionario(palabra) {
    if (diccionario[palabra]) {
        return `La definición de ${palabra} es: ${diccionario[palabra]}`;
    }
    return null;
}


function botResponse(message) {
    if (message.toLowerCase().startsWith('logica ')) {
        const comandoLogico = message.slice(7);
        return procesarComandoLogico(comandoLogico);
    }
    
    // Aquí va el resto de la lógica existente para respuestas del bot
    // ...

    return "Lo siento, no entiendo esa pregunta. ¿Puedo ayudarte con algo más?";
}

async function procesarEntradaUsuario(entrada) {
    const respuestaDiccionario = buscarEnDiccionario(entrada);
    if (respuestaDiccionario) return respuestaDiccionario;

    try {
        const mejorFuente = await Fuentes.bAn(entrada);
        let respuesta = '';

        if (mejorFuente) {
            switch (mejorFuente.tipo) {
                case 'wikipedia':
                    respuesta = `Wikipedia dice: ${mejorFuente.info.extract}`;
                    break;
                case 'weather':
                    respuesta = `El clima en ${entrada} es: ${mejorFuente.info.main.temp}°C, ${mejorFuente.info.weather[0].description}`;
                    break;
                case 'news':
                    respuesta = `Noticia relacionada: ${mejorFuente.info.articles[0].title}`;
                    break;
            }
        }

        return respuesta || "Lo siento, no encontré información relevante sobre eso.";
    } catch (error) {
        console.error('Error al buscar información:', error);
        return "Hubo un problema al buscar la información. Por favor, intenta de nuevo.";
    }
}




function addMessage(message, isUser = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
    
    if (isUser) {
        messageElement.textContent = message;
    } else {
        messageElement.innerHTML = message;
    }
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, true);
        userInput.value = '';
        setTimeout(() => botResponse(message), 500);
    }
}

function botResponse(message) {
    const lowerMessage = message.toLowerCase();
    let response;

    if (saludos.some(saludo => lowerMessage.includes(saludo))) {
        response = obtenerSaludo();
    } else if (despedidas.some(despedida => lowerMessage.includes(despedida))) {
        response = obtenerDespedida();
    } else if (lowerMessage.includes('cómo estás')) {
        response = '¡Estoy muy bien, gracias por preguntar! ¿Cómo te encuentras tú hoy?';
    } else if (lowerMessage.includes('clima') || lowerMessage.includes('tiempo')) {
        response = obtenerInfoClima();
    } else if (lowerMessage.includes('chiste')) {
        response = obtenerChiste();
    } else if (lowerMessage.includes('consejo')) {
        response = obtenerConsejo();
    } else if (lowerMessage.includes('hora')) {
        response = obtenerHora();
    } else if (lowerMessage.includes('fecha')) {
        response = obtenerFecha();
    } else if (operacionesMatematicas.some(op => lowerMessage.includes(op))) {
        response = resolverOperacionMatematica(lowerMessage);
    } else if (lowerMessage.includes('presidente de')) {
        response = obtenerPresidente(lowerMessage);
    } else if (lowerMessage.startsWith('define ')) {
        const palabra = lowerMessage.split(' ')[1];
        response = buscarEnDiccionario(palabra) || `Lo siento, no tengo una definición para "${palabra}".`;
    } else if (lowerMessage.includes('palabra aleatoria') || lowerMessage.includes('palabra del día')) {
        response = obtenerPalabraAleatoria();
    } else {
        response = buscarInformacionAdicional(lowerMessage);
        if (!response) {
            response = buscarRespuesta(lowerMessage);
        }
    }

    addMessage(response);
}

const saludos = ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'qué tal'];
const despedidas = ['adiós', 'hasta luego', 'chao', 'nos vemos'];
const operacionesMatematicas = ['suma', 'resta', 'multiplica', 'divide'];

function obtenerSaludo() {
    const saludos = [
        '¡Hola! ¿En qué puedo ayudarte hoy?',
        '¡Bienvenido! ¿Cómo puedo asistirte?',
        '¡Qué gusto verte! ¿En qué puedo echarte una mano?',
        '¡Hola! Estoy aquí para ayudarte. ¿Qué necesitas?'
    ];
    return saludos[Math.floor(Math.random() * saludos.length)];
}

function obtenerDespedida() {
    const despedidas = [
        '¡Hasta luego! Que tengas un excelente día.',
        'Fue un placer ayudarte. ¡Hasta la próxima!',
        'Adiós, ¡que te vaya muy bien!',
        'Cuídate mucho. ¡Nos vemos pronto!'
    ];
    return despedidas[Math.floor(Math.random() * despedidas.length)];
}

function obtenerInfoClima() {
    const climas = [
        'Hoy hace un día soleado con temperaturas alrededor de 25°C.',
        'El pronóstico indica lluvia ligera para esta tarde.',
        'Se espera un día nublado con temperaturas frescas.',
        'Hoy tendremos un clima cálido y despejado.'
    ];
    return climas[Math.floor(Math.random() * climas.length)];
}

function obtenerChiste() {
    const chistes = [
        '¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter.',
        '¿Qué le dice un semáforo a otro? No me mires que me estoy cambiando.',
        '¿Cómo se llama un boomerang que no vuelve? Palo.',
        '¿Qué le dice una iguana a su hermana gemela? Somos iguanitas.'
    ];
    return chistes[Math.floor(Math.random() * chistes.length)];
}

function obtenerConsejo() {
    const consejos = [
        'Recuerda beber suficiente agua durante el día.',
        'Tómate un momento para respirar profundamente y relajarte.',
        'No olvides agradecer las pequeñas cosas de la vida.',
        'Intenta aprender algo nuevo cada día, por pequeño que sea.'
    ];
    return consejos[Math.floor(Math.random() * consejos.length)];
}

function obtenerHora() {
    const ahora = new Date();
    return `La hora actual es ${ahora.getHours()}:${ahora.getMinutes().toString().padStart(2, '0')}.`;
}

function obtenerFecha() {
    const ahora = new Date();
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return `Hoy es ${ahora.toLocaleDateString('es-ES', opciones)}.`;
}

function resolverOperacionMatematica(mensaje) {
    const numeros = mensaje.match(/\d+/g);
    if (numeros && numeros.length >= 2) {
        const a = parseInt(numeros[0]);
        const b = parseInt(numeros[1]);
        if (mensaje.includes('suma')) {
            return `El resultado de ${a} + ${b} es ${a + b}`;
        } else if (mensaje.includes('resta')) {
            return `El resultado de ${a} - ${b} es ${a - b}`;
        } else if (mensaje.includes('multiplica')) {
            return `El resultado de ${a} * ${b} es ${a * b}`;
        } else if (mensaje.includes('divide')) {
            return b !== 0 ? `El resultado de ${a} / ${b} es ${a / b}` : 'No se puede dividir por cero';
        }
    }
    return 'No pude entender la operación matemática. Por favor, intenta de nuevo con un formato como "suma 5 y 3".';
}

function obtenerPresidente(mensaje) {
    const paises = {
        'españa': 'Pedro Sánchez',
        'estados unidos': 'Joe Biden',
        'francia': 'Emmanuel Macron',
        'alemania': 'Frank-Walter Steinmeier',
        'italia': 'Sergio Mattarella',
        'reino unido': 'Rishi Sunak',
        'canadá': 'Justin Trudeau',
        'japón': 'Fumio Kishida',
        'china': 'Xi Jinping',
        'rusia': 'Vladimir Putin',
        'brasil': 'Luiz Inácio Lula da Silva',
        'argentina': 'Alberto Fernández',
        'méxico': 'Andrés Manuel López Obrador'
    };

    for (let pais in paises) {
        if (mensaje.includes(pais)) {
            return `El presidente actual de ${pais.charAt(0).toUpperCase() + pais.slice(1)} es ${paises[pais]}.`;
        }
    }

    return 'Lo siento, no tengo información sobre el presidente de ese país.';
}

function buscarRespuesta(mensaje) {
    const respuestas = {
        'quien eres': 'Soy un asistente virtual diseñado para ayudarte con diversas tareas y responder a tus preguntas.',
        'que puedes hacer': 'Puedo ayudarte con cálculos matemáticos, darte información sobre el clima, contar chistes, dar consejos, informarte sobre presidentes de algunos países y responder a preguntas generales.',
        'como funciona': 'Funciono analizando tus mensajes y buscando la mejor respuesta posible en mi base de conocimientos.',
        'gracias': '¡De nada! Estoy aquí para ayudarte. Si necesitas algo más, no dudes en preguntar.'
    };

    for (let key in respuestas) {
        if (mensaje.includes(key)) {
            return respuestas[key];
        }
    }

    return 'Lo siento, no tengo una respuesta específica para esa pregunta. ¿Puedo ayudarte con algo más?';
}

// Nuevas funciones

function buscarEnDiccionario(palabra) {
    palabra = palabra.toLowerCase().trim();
    if (diccionario[palabra]) {
        return `${palabra.charAt(0).toUpperCase() + palabra.slice(1)}: ${diccionario[palabra]}`;
    }
    return null;
}

function obtenerPalabraAleatoria() {
    const palabras = Object.keys(diccionario);
    const palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];
    return `Palabra del día: ${palabraAleatoria.charAt(0).toUpperCase() + palabraAleatoria.slice(1)} - ${diccionario[palabraAleatoria]}`;
}

function buscarInformacionAdicional(tema) {
    const informacionAdicional = {
        "historia": "La historia es el estudio de los eventos pasados, particularmente cómo afectan a los seres humanos. Incluye todos los aspectos de las sociedades humanas, como la política, la cultura, la economía y las relaciones sociales.",
        "ciencia": "La ciencia es un sistema de conocimiento que se basa en la observación, experimentación y medición de fenómenos naturales. Las principales ramas incluyen física, química, biología y astronomía.",
        "arte": "El arte es una expresión creativa de la imaginación humana. Puede tomar muchas formas, incluyendo pintura, escultura, música, literatura, danza y cine.",
        "tecnología": "La tecnología se refiere a la aplicación práctica del conocimiento científico. Incluye herramientas, máquinas, técnicas y sistemas utilizados para resolver problemas o realizar tareas específicas.",
        // Agrega más temas según sea necesario
    };

function procesarEntradaUsuario(entrada) {
    entrada = entrada.toLowerCase();

    if (diccionario.saludos.some(saludo => entrada.includes(saludo.toLowerCase()))) {
        return diccionario.saludos[Math.floor(Math.random() * diccionario.saludos.length)];
    }

    if (diccionario.despedidas.some(despedida => entrada.includes(despedida.toLowerCase()))) {
        return diccionario.despedidas[Math.floor(Math.random() * diccionario.despedidas.length)];
    }

    if (entrada in diccionario.significados) {
        return `${entrada}: ${diccionario.significados[entrada]}`;
    }

    if (diccionario.palabras.includes(entrada)) {
        return `"${entrada}" es una palabra interesante. ¿Quieres saber más sobre ella?`;
    }

    if (diccionario.expresiones.includes(entrada)) {
        return `"${entrada}" es una expresión común. ¿Conoces su origen?`;
    }

    // Puedes agregar más lógica para otras categorías como refranes, ciudades, países, etc.

    return "Lo siento, no entiendo esa entrada. ¿Puedes ser más específico?";
}



    const temaLower = tema.toLowerCase();
    for (let key in informacionAdicional) {
        if (temaLower.includes(key)) {
            return informacionAdicional[key];
        }
    }
    return null;
}

userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

voiceButton.addEventListener('click', function() {
    if (recognition) {
        recognition.start();
        voiceButton.textContent = 'Escuchando...';
        voiceButton.classList.add('listening');
        setTimeout(() => {
            recognition.stop();
            voiceButton.textContent = 'Hablar';
            voiceButton.classList.remove('listening');
        }, 5000);
    }
});