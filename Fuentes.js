// Fuentes.js

// APIs y claves (como antes)
const WIKIPEDIA_API = 'https://es.wikipedia.org/api/rest_v1/page/summary/';
const OPENWEATHERMAP_API = 'https://api.openweathermap.org/data/2.5/weather';
const NEWSAPI_URL = 'https://newsapi.org/v2/everything';

const OPENWEATHERMAP_API_KEY = 'TU_CLAVE_API_OPENWEATHERMAP';
const NEWSAPI_KEY = 'TU_CLAVE_API_NEWSAPI';
// Función principal de búsqueda mejorada
async function buscarInformacion(query) {
    const [wikiInfo, weatherInfo, newsInfo] = await Promise.all([
        buscarWikipedia(query),
        buscarClima(query),
        buscarNoticias(query)
    ]);

    return seleccionarMejorFuente(query, wikiInfo, weatherInfo, newsInfo);
}

// Función para seleccionar la mejor fuente
function seleccionarMejorFuente(query, wikiInfo, weatherInfo, newsInfo) {
    let mejorFuente = null;
    let puntuacionMaxima = 0;

    if (wikiInfo) {
        const puntuacionWiki = evaluarCalidadWikipedia(wikiInfo, query);
        if (puntuacionWiki > puntuacionMaxima) {
            mejorFuente = { tipo: 'wikipedia', info: wikiInfo };
            puntuacionMaxima = puntuacionWiki;
        }
    }

    if (weatherInfo) {
        const puntuacionClima = evaluarCalidadClima(weatherInfo, query);
        if (puntuacionClima > puntuacionMaxima) {
            mejorFuente = { tipo: 'weather', info: weatherInfo };
            puntuacionMaxima = puntuacionClima;
        }
    }

    if (newsInfo) {
        const puntuacionNoticias = evaluarCalidadNoticias(newsInfo, query);
        if (puntuacionNoticias > puntuacionMaxima) {
            mejorFuente = { tipo: 'news', info: newsInfo };
            puntuacionMaxima = puntuacionNoticias;
        }
    }

    return mejorFuente;
}

// Funciones de evaluación de calidad
function evaluarCalidadWikipedia(info, query) {
    return info.extract ? info.extract.length / 10 : 0;
}

function evaluarCalidadClima(info, query) {
    return info.main && info.weather ? 50 : 0;
}

function evaluarCalidadNoticias(info, query) {
    return info.articles && info.articles.length > 0 ? 30 + (info.articles[0].title.toLowerCase().includes(query.toLowerCase()) ? 20 : 0) : 0;
}

// Funciones de búsqueda (como antes)

// Exportar las funciones
window.Fuentes = {
    buscarInformacion: buscarInformacion
};


