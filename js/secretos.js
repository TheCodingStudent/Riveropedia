const secretos = {
    "lunes": {
        titulo: "Astronomía",
        contenido: `
        En la bóveda nocturna danza el misterio.<br>
        Estrellas antiguas susurran historias al viento.<br>
        La Luna vigila, guardiana de los sueños.<br>
        Los planetas trazan caminos invisibles en silencio.<br>
        La astronomía es puente entre lo humano y lo eterno,<br>
        un lenguaje de luces que revela nuestro origen.<br>
        Pd. Al igual que la Luna, el título tiene un lado oculto 🔍
        `,
        index: 1,
        tooltip: 1,
        audio: "Tercera ley de Newton: La única forma en que los humanos lleguen a alguna parte es dejando algo atrás."
    },

    "martes": {
        titulo: "Marciano",
        contenido: `
            En la superficie roja se trazan vectores.<br>
            Algoritmos calculan trayectorias en silencio.<br>
            Registros de presión describen su tenue atmósfera.<br>
            Topografía marciana se mide con precisión.<br>
            Energía solar alimenta sistemas en su suelo.<br>
            Sensores registran coordenadas con rigor.<br>

            Pd. Cada cálculo revela un secreto oculto 🔍.<br>
        `,
        index: 4,
        tooltip: 2,
        audio: "Marte está ahí, esperando a que lleguemos."
    },

    "miércoles": {
        titulo: "Hermes",
        contenido: `
            Mensajero alado que cruza fronteras.<br>
            Hermes recorre caminos entre dioses y hombres.<br>
            Sus pasos veloces atraviesan mundos ocultos.<br>
            Sus palabras viajan en el murmullo del viento.<br>
            Astuto guardián de secretos y destinos.<br>
            Errante viajero que nunca descansa.<br>
            
            Pd. Hermes, peón de los dioses; sonríe entre las
            <em>𝑀𝑖𝑒𝑠𝑒𝑠</em>, <em>𝑎𝑝𝑒𝑟𝑡𝑢𝑟𝑎</em> a su marmolada reina 🔍.
        `,
        index: -1,
        tooltip: 3,
        audio: "Mi nombre es Barry Allen, y soy el hombre más rápido sobre la faz de la Tierra."
    },

    "jueves": {
        titulo: "Mi mujer",
        contenido: `
            <span class='camaleon'>E</span>n tu mirada se enciende mi destino.<br>
            <span class='camaleon'>S</span>usurros de tu voz me guían en silencio.<br>
            <span class='camaleon'>T</span>iempo y espacio se rinden a tu presencia.<br>
            <span class='camaleon'>E</span>res la raíz que sostiene mi universo.<br>
            <span class='camaleon'>T</span>ernura infinita se dekorrama en tus gestos.<br>
            <span class='camaleon'>R</span>íos de amor recorren tu esencia.<br>
            <span class='camaleon'>O</span>casos dorados se tiñen con tu nombre.<br>
            <span class='camaleon'>L</span>uz eterna que me envuelve y me salva.<br>

            Pd. Cada letra, cada secreto, se inclina hacia ti 🔍.<br>
        `,
        index: 6,
        tooltip: "4",
        audio: "Mi casa. Mi silla. Mi mujer."
    },

    "viernes": {
        titulo: "50 Sombras",
        contenido: `
            Quiero perder el <span class="oculto">control</span> contigo, como un río que se desborda en tu abrazo.<br>
            En tus manos el <span class="oculto">control</span> se convierte en caricia, y yo me dejo guiar.<br>
            El <span class="oculto">control</span> se disuelve en tu risa, como la noche que se abre al amanecer.<br>
            Perder el <span class="oculto">control</span> contigo es hallarme, como fuego que se entrega sin medida.<br>
            El <span class="oculto">control</span> no es dominio, es rendirse al destino que tu nombre dibuja.<br>
            Quiero perder el <span class="oculto">control</span> contigo, porque en tu piel todo encuentra sentido.<br>

            Pd. El <span class="oculto">control</span> se transforma en entrega, y la entrega en placer 🔍.<br>
        `,
        index: [0, 1, 3, 4, 5, 6, 7],
        tooltip: [
            "De la", "manera más",
            "egoista", "posible",
            "5", "mi", "cielo."
        ],
        audio: ""
    },

    "sábado": {
        titulo: "Vena amoris",
        contenido: `
            El Único susurra en Mordor, tentación que consume a quien lo porta.<br>
            El de Linterna Verde brilla con voluntad, creando universos desde la imaginación.<br>
            El de los Nibelungos encierra poder y tragedia, música que resuena en la eternidad.<br>
            El de compromiso guarda promesas humanas, tan frágiles como eternas.<br>
            El de Salomón habla con sabiduría, controlando espíritus y secretos antiguos.<br>
            El olímpico enlaza naciones, cinco símbolos que giran como planetas en armonía.<br>

            Pd. Un lazo secreto une tu mano con mi latido, y en ese silencio todo amor se revela. ❤️🔍.<br>
        `,
        index: [3, 5],
        tooltip: ["6", "6"],
        audio: ""
    },

    "domingo": {
        titulo: "Sol de octubre",
        contenido: `
            Luna luminosa, luces lentamente los latidos leales.<br>
            Los Labios ligeros liberan largos lazos llenos.<br>
            Lentamente logras levantar los límites, lindo lucero.<br>
            Leves llanas luces liberan largos latidos locamente.<br>
            Llena la lejanía, luna; libera luminosos lazos.<br>
            Llaves lógicos, legendarias, liberan los límites laberínticos.<br>
            Lunares llamativos llenan lentamente los labios llamenates.<br>

            Pd. Ya tiens todo para buscar la palabra de esta semana. Suerte ❤️🔍.<br>
        `,
        index: [2],
        tooltip: ["La verdad, he pensado en ti todo el día"],
        audio: ""
    },

    // ------------------------------

    "rhitta": {
        titulo: "Escanor",
        contenido: `
            Aquel que brillaba como sol.<span class="oculto"> ¿Qué tan</span>
            Su orgullo eclipsaba dioses, reyes.<span class="oculto"> orgulloso</span>
            Al mediodía alcanzaba poder absoluto.<span class="oculto"> crees</span>
            Portaba Rhitta, hacha divina legendaria.<span class="oculto"> que</span>
            Amó profundamente sin pedir reciprocidad.<span class="oculto"> soy?</span>
            Pd. Dices que el calor que emano es por ti ¿y quién lo decidió? 🔥<span class="oculto"> ¿un 3?</span>.<br>
        `,
        index: [-1],
        tooltip: [""],
        audio: ""
    },

    "elaine": {
        titulo: "Ban",
        contenido: `
            Ladrón inmortal que desafía la muerte.
            Su avaricia no busca oro ni poder.
            Robó la eternidad con manos vacías.
            Portaba Courechouse, bastón del zorro astuto.
            Amó a Elaine con un amor infinito.
            Su pecado es ansia de lo eterno.
            Pd. No importaa qué defectos tengaas, yo voy aa robarte enteraa. 🦊
        `,
        index: [-1],
        tooltip: [""],
        audio: "",
        robar: "BAN"
    },

    "harlequín": {
        titulo: "Lanza sagrada Chastiefol",
        contenido: `
            Rey de las hadas que carga con su deber.
            Su pereza no es desinterés, sino peso del pasado.
            Guardián del bosque que una vez abandonó.
            Portaba Chastiefol, lanza sagrada que cambia de forma.
            Amó a Diane con un corazón silencioso.
            Su pecado es la pereza de no proteger a tiempo.
            Pd. Aunque me acuse la historia, mi descanso es vigilia por ti. 🌿
        `,
        index: [-1],
        tooltip: [""],
        audio: "",
        mask: "Modo 1: Madurar"
    },

    "serpiente": {
        titulo: "Serpiente de la Envidia",
        contenido: `
            Guardiana de los seis sentidos, su ternura despierta cada uno.
            Sexto elemento oculto, pasión que supera la materia.
            En la sexta estación florece su deseo, imposible pero eterno.
            Mano que protege con seis gestos, fuerza que abraza el mundo.
            La sexta luna refleja su rostro, secreto que ilumina la noche.
            Hexagrama oculto, seis líneas que cantan su amor profundo.<br>
            Pd. Mi envidia no es por lo ajeno, sino por querer poseerte <span class="oculto">mi cielo 🧡</span>.
        `,
        index: [16],
        tooltip: [""],
        audio: "",
    },

    "infinito": {
        titulo: "Gula del Conocimiento",
        contenido: `
            Hechicera que devora verdades ocultas.
            Su gula no es de carne, sino de saber eterno.
            En cada hechizo mantiene la llama infinita.
            Aldan flota como ojo que todo observa.
            Bendecida por dioses y demonios, inmune a sus cadenas.
            Su pecado es hambre insaciable de lo prohibido.<br>
            Pd. Luz de Belialuin, lugar legendario,<br>                   lenguas latentes levantan letanías,
                   labrando la lógica de lo ilimitado,
                   latido de la luna, legado luminoso.
        `,
        index: [-1],
        tooltip: [""],
        audio: ""
    }





};