
var Diccionario = (function() {
    var diccionario = {
            saludos: [
                "Hola", "Buenos días", "Buenas tardes", "Buenas noches", "¿Qué tal?",
                "¿Cómo estás?", "Saludos", "¿Qué hay?", "¿Qué pasa?", "¿Cómo va todo?",
                "Bienvenido", "Encantado de conocerte", "¿Qué me cuentas?", "¿Qué onda?",
                "¿Cómo te va?", "¿Qué hubo?", "Qué gusto verte", "¿Cómo andas?",
                "¿Qué hay de nuevo?", "¿Qué te trae por aquí?", "¿Qué dice la vida?",
                "¿Cómo te trata la vida?", "¿Qué hay de bueno?", "¿Qué se cuenta?",
                "¿Cómo va la cosa?", "¿Qué te cuentas?", "¿Qué hay de tu vida?",
                "¿Cómo has estado?", "¿Qué tal todo?", "¿Cómo va el día?"
            ],
            despedidas: [
                "Adiós", "Hasta luego", "Hasta pronto", "Nos vemos", "Chao",
                "Hasta la próxima", "Cuídate", "Que te vaya bien", "Hasta mañana",
                "Que tengas un buen día", "Nos vemos pronto", "Hasta la vista",
                "Que descanses", "Buenas noches", "Que te diviertas", "Buen viaje",
                "Hasta nunca", "Que te mejores", "Suerte", "Que te vaya bonito",
                "Nos estamos viendo", "Hasta la próxima vez", "Que te cuides",
                "Nos mantenemos en contacto", "Que tengas suerte", "Hasta otro día",
                "Que la pases bien", "Nos vemos luego", "Que todo te salga bien",
                "Hasta cuando nos veamos"
            ],
            palabras: [
                "Amor", "Felicidad", "Paz", "Esperanza", "Libertad", "Justicia",
                "Verdad", "Amistad", "Familia", "Trabajo", "Éxito", "Sueño", "Vida",
                "Muerte", "Tiempo", "Espacio", "Naturaleza", "Ciencia", "Arte",
                "Música", "Literatura", "Filosofía", "Religión", "Política",
                "Economía", "Sociedad", "Cultura", "Educación", "Salud", "Deporte",
                "Tecnología", "Innovación", "Creatividad", "Imaginación", "Intuición",
                "Razón", "Emoción", "Sentimiento", "Pensamiento", "Acción",
                "Aventura", "Descubrimiento", "Exploración", "Viaje", "Destino",
                "Origen", "Evolución", "Revolución", "Cambio", "Transformación"
            ],
            expresiones: [
                "A otro perro con ese hueso", "Agua que no has de beber, déjala correr",
                "Al pan, pan y al vino, vino", "Arrimar el ascua a su sardina",
                "Bailar con la más fea", "Buscarle tres pies al gato",
                "Caerse del guindo", "Coger el toro por los cuernos",
                "Dar en el clavo", "Echar leña al fuego", "El mundo es un pañuelo",
                "En boca cerrada no entran moscas", "Estar en las nubes",
                "Hacer de tripas corazón", "Ir por lana y salir trasquilado",
                "Jugar con fuego", "La gota que colmó el vaso",
                "Llamar al pan, pan y al vino, vino", "Meter la pata",
                "No hay mal que por bien no venga", "Ojos que no ven, corazón que no siente",
                "Pagar justos por pecadores", "Quedarse de piedra",
                "Rascarse el bolsillo", "Ser uña y carne", "Tirar la casa por la ventana",
                "Una golondrina no hace verano", "Ver los toros desde la barrera",
                "Y si mi abuela tuviera ruedas, sería una bicicleta",
                "Zapatero a tus zapatos"
            ],
            significados: {
                "Amor": "Sentimiento intenso del ser humano que necesita y desea estar cerca de otro ser",
                "Felicidad": "Estado de ánimo de la persona que se siente plenamente satisfecha",
                "Paz": "Situación de tranquilidad y quietud",
                "Esperanza": "Confianza de lograr una cosa o de que se realice algo que se desea",
                "Libertad": "Facultad del ser humano de obrar según su voluntad",
                "Justicia": "Principio moral que inclina a obrar y juzgar respetando la verdad",
                "Verdad": "Conformidad de las cosas con el concepto que de ellas forma la mente",
                "Amistad": "Afecto personal, puro y desinteresado, compartido con otra persona",
                "Familia": "Grupo de personas emparentadas entre sí que viven juntas",
                "Trabajo": "Actividad en que alguien se ocupa",
                "Éxito": "Resultado feliz de un negocio, actuación, etc.",
                "Sueño": "Acto de representarse en la fantasía imágenes mientras se duerme",
                "Vida": "Fuerza o actividad esencial mediante la que obra el ser que la posee",
                "Muerte": "Cesación o término de la vida",
                "Tiempo": "Duración de las cosas sujetas a mudanza",
                "Espacio": "Extensión que contiene toda la materia existente",
                "Naturaleza": "Conjunto de todo lo que existe y que está determinado y armonizado en sus propias leyes",
                "Ciencia": "Conjunto de conocimientos obtenidos mediante la observación y el razonamiento",
                "Arte": "Manifestación de la actividad humana mediante la cual se interpreta lo real o se plasma lo imaginado",
                "Música": "Arte de combinar los sonidos de la voz humana o de los instrumentos"
            },
            nombres: [
                "María", "José", "Antonio", "Manuel", "Francisco", "Juan", "David",
                "Javier", "Daniel", "José Antonio", "Francisco Javier", "Jesús",
                "Carlos", "Alejandro", "Miguel", "José Luis", "Miguel Ángel", "Pedro",
                "Rafael", "Ángel", "José Manuel", "Pablo", "Fernando", "Sergio",
                "Luis", "Jorge", "Alberto", "Juan Carlos", "Álvaro", "Adrián",
                "Diego", "Juan José", "Raúl", "Iván", "Juan Antonio", "Rubén",
                "Enrique", "Oscar", "Ramón", "Vicente", "Andrés", "Juan Manuel",
                "Joaquín", "Santiago", "Víctor", "Eduardo", "Mario", "Roberto",
                "Jaime", "Francisco José", "Marcos", "Hugo", "Ignacio", "Jordi",
                "Alfonso", "Ricardo", "Salvador", "Guillermo", "Emilio", "Gabriel",
                "Marc", "Gonzalo", "Julio", "Julián", "Tomás", "Agustín", "Nicolás",
                "José María", "Félix", "Joan", "Ismael", "Cristian", "Samuel",
                "Aitor", "Héctor", "Iker", "Alex", "Juan Francisco", "José Miguel",
                "Mariano", "Domingo", "Sebastián", "Alfredo", "César", "Germán",
                "Esteban", "Felipe", "Víctor Manuel", "Benito", "Gregorio", "Xavier",
                "Lorenzo", "Albert", "Teodoro", "Martín", "Arturo", "Ernesto"
            ],
            // ... Continúa con más categorías y elementos ...
        
        refranes: [
            "A caballo regalado no le mires el diente",
            "Más vale pájaro en mano que ciento volando",
            "No por mucho madrugar amanece más temprano",
            "En casa del herrero, cuchillo de palo",
            "Quien a buen árbol se arrima, buena sombra le cobija",
            "A falta de pan, buenas son tortas",
            "Cría cuervos y te sacarán los ojos",
            "Del dicho al hecho hay mucho trecho",
            "El que mucho abarca, poco aprieta",
            "Más sabe el diablo por viejo que por diablo"
        ],
        ciudades: [
            "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza",
            "Málaga", "Murcia", "Palma", "Las Palmas", "Bilbao",
            "Alicante", "Córdoba", "Valladolid", "Vigo", "Gijón",
            "L'Hospitalet", "Vitoria", "La Coruña", "Granada", "Elche"
        ],
        paises: [
            "España", "Francia", "Italia", "Alemania", "Reino Unido",
            "Portugal", "Países Bajos", "Bélgica", "Suecia", "Noruega",
            "Dinamarca", "Finlandia", "Grecia", "Austria", "Suiza",
            "Polonia", "República Checa", "Hungría", "Croacia", "Eslovenia"
        ],
        emociones: [
            "Alegría", "Tristeza", "Enojo", "Miedo", "Sorpresa",
            "Asco", "Confianza", "Anticipación", "Amor", "Odio",
            "Ansiedad", "Culpa", "Vergüenza", "Orgullo", "Celos",
            "Envidia", "Gratitud", "Compasión", "Nostalgia", "Euforia"
        ]
        
    };

    return diccionario;
})();



