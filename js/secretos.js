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
        <br>Pd. Al igual que la Luna, el título tiene un lado oculto 🔍<br><br>
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

            <br>Pd. Cada cálculo revela un secreto oculto 🔍.<br><br>
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
            
            <br>Pd. Hermes, peón de los dioses; sonríe entre las<br>
            <em>𝑀𝑖𝑒𝑠𝑒𝑠</em>, <em>𝑎𝑝𝑒𝑟𝑡𝑢𝑟𝑎</em> a su marmolada reina 🔍.<br><br>
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

            <br>Pd. Cada letra, cada secreto, se inclina hacia ti 🔍.<br><br>
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

            <br>Pd. El <span class="oculto">control</span> se transforma en entrega, y la entrega en placer 🔍.<br><br>
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

            <br>Pd. Un lazo secreto une tu mano con mi latido, y en ese silencio todo amor se revela. ❤️🔍.<br><br>
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

            <br>Pd. Ya tiens todo para buscar la palabra de esta semana. Suerte ❤️🔍.<br><br>
        `,
        index: [2],
        tooltip: ["La verdad, he pensado en ti todo el día"],
        audio: ""
    },

    // ------------------------------

    "rhitta": {
        titulo: "Escanor",
        contenido: `
            Aquel que brillaba como sol.<span class="oculto"> ¿Qué tan</span><br>
            Su orgullo eclipsaba dioses, reyes.<span class="oculto"> orgulloso</span><br>
            Al mediodía alcanzaba poder absoluto.<span class="oculto"> crees</span><br>
            Portaba Rhitta, hacha divina legendaria.<span class="oculto"> que</span><br>
            Amó profundamente sin pedir reciprocidad.<span class="oculto"> soy?</span><br>
            <br>Pd. Dices que el calor que emano es por ti ¿y quién lo decidió? 🔥<span class="oculto"> ¿un 3?</span>.<br><br>
        `,
        index: [-1],
        tooltip: [""],
        audio: ""
    },

    "elaine": {
        titulo: "Ban",
        contenido: `
            Ladrón inmortal que desafía la muerte.<br>
            Su avaricia no busca oro ni poder.<br>
            Robó la eternidad con manos vacías.<br>
            Portaba Courechouse, bastón del zorro astuto.<br>
            Amó a Elaine con un amor infinito.<br>
            Su pecado es ansia de lo eterno.<br>
            <br>Pd. No importaa qué defectos tengaas, yo voy aa robarte enteraa. 🦊<br><br>
        `,
        index: [-1],
        tooltip: [""],
        audio: "",
        robar: "BAN"
    },

    "harlequín": {
        titulo: "Lanza sagrada Chastiefol",
        contenido: `
            Rey de las hadas que carga con su deber.<br>
            Su pereza no es desinterés, sino peso del pasado.<br>
            Guardián del bosque que una vez abandonó.<br>
            Portaba Chastiefol, lanza sagrada que cambia de forma.<br>
            Amó a Diane con un corazón silencioso.<br>
            Su pecado es la pereza de no proteger a tiempo.<br>
            <br>Pd. Aunque me acuse la historia, mi descanso es vigilia por ti. 🌿<br><br>
        `,
        index: [-1],
        tooltip: [""],
        audio: "",
        mask: "Modo 1: Madurar"
    },

    "serpiente": {
        titulo: "Serpiente de la Envidia",
        contenido: `
            Guardiana de los seis sentidos, su ternura despierta cada uno.<br>
            Sexto elemento oculto, pasión que supera la materia.<br>
            En la sexta estación florece su deseo, imposible pero eterno.<br>
            Mano que protege con seis gestos, fuerza que abraza el mundo.<br>
            La sexta luna refleja su rostro, secreto que ilumina la noche.<br>
            Hexagrama oculto, seis líneas que cantan su amor profundo.<br>
            <br>Pd. Mi envidia no es por lo ajeno, sino por querer poseerte <span class="oculto">mi cielo 🧡</span>.<br><br>
        `,
        index: [16],
        tooltip: [""],
        audio: "",
    },

    "infinito": {
        titulo: "Gula del Conocimiento",
        contenido: `
            Hechicera que devora verdades ocultas.<br>
            Su gula no es de carne, sino de saber eterno.<br>
            En cada hechizo mantiene la llama infinita.<br>
            Aldan flota como ojo que todo observa.<br>
            Bendecida por dioses y demonios, inmune a sus cadenas.<br>
            Su pecado es hambre insaciable de lo prohibido.<br>
            <br>Pd. Luz de Belialuin, lugar legendario,<br>                   lenguas latentes levantan letanías,<br>
                   labrando la lógica de lo ilimitado,<br>
                   latido de la luna, legado luminoso.<br><br>
        `,
        index: [-1],
        tooltip: [""],
        audio: ""
    },

    "lioness": {
        titulo: "Tierno y pervertido",
        contenido: `
            Demonio nacido para la guerra, pero rendido ante una luz imposible.<br>
            Sus copias repiten heridas, juramentos y regresos.<br>
            Lostvayne no divide su amor: lo multiplica para protegerla.<br>
            En Elizabeth encuentra el cielo que su sangre niega.<br>
            La ira destruye reinos cuando teme perderla,<br>
            pero también aprende a inclinarse cuando ella respira cerca.<br>
            Siete letras guardan el reino, siete copias guardan el camino.<br>

            <br>Pd. El truco es volverse fuerte de corazón, sin perder la ternura del alma. 🐉<br><br>
        `,
        index: [0, 1, 2, 3, 4, 5],
        tooltip: [
            "Osado",
            "Original",
            "Objetivo",
            "Obstinado",
            "Ocurrente",
            "Orgulloso",
        ],
        audio: ""
    },

    "corazón": {
        titulo: "El muñeco sin latido",
        contenido: `
            En un cuerpo sin sangre, la memoria sustituye al pulso.<br>
            Sus ojos leen almas, pero nunca comprenden su calor.<br>
            En la prisión del desinterés, la ternura se convierte en eco.<br>
            Nadja fue su instante humano, perdido en un juicio cruel.<br>
            <br>
            La cabra de la lujuria no arde en deseo, arde en vacío.<br>
            Su pecado no es pasión, sino la tragedia de no sentir.<br>
            En cada recuerdo alterado, late un corazón que nunca existió.<br>
            <br>Pd. Si alguna vez me llamas humano, será porque en tu reflejo encontré mi <span class="oculto">corazón 🖤</span>.<br><br>
        `,
        index: [16],
        tooltip: ["Tu turno ❤"],
        audio: "",
    },

    "shiganshina": {
        titulo: "Para ti, 2000 años en el futuro",
        contenido: `
            Entre muros que guardan la infancia, nace la esperanza y el miedo.<br>
            Shiganshina es el inicio y el fin, donde todo se revela.<br>
            Cada piedra recuerda la lucha, cada sombra guarda un sacrificio.<br>
            El rugido de los titanes no destruye mi fe, la fortalece.<br>
            <br>
            Amo esta serie porque es perfecta, porque en su dolor encuentro belleza.<br>
            Si pudiera dedicar un anime a ti, sería este: eterno, crudo y sublime.<br>
            En Shiganshina aprendí que incluso en la caída, tu reflejo es mi victoria <span class="oculto">mi cielo ⚔️</span>.<br><br>
            Pd. Esta semana no habrá que resolver los secretos. Aprovechare para dedicarte cosas ❤
        `,
        index: [0],
        tooltip: ["Derrumbaste mis murallas"],
        audio: "",
    },

    "dorado": {
        titulo: "El viaje hacia El Dorado",
        contenido: `
            Entre mapas y leyendas, los conquistadores buscaban una ciudad imposible.<br>
            El Dorado brillaba en sus sueños, pero nunca en la realidad.<br>
            Cada río ocultaba promesas, cada selva guardaba misterios.<br>
            La ambición los cegaba, pero la verdad estaba en otro lugar.<br>
            <br>
            Tú eres más brillante que cualquier ciudad de oro, más valiosa que todos sus tesoros.<br>
            No eres un destino, eres todo un viaje: eterno, mágico y sublime.<br>
            Si pudiera dedicarte una película, sería esta: porque en ti encontré mi verdadero hallazgo.<br>
            <br>Pd. El Dorado no está en mapas, está en tu mirada <span class="oculto">mi cielo ✨</span>.<br><br>
        `,
        index: [0],
        tooltip: ["Más brillante que el oro"],
        audio: "",
    },

    "jones": {
        titulo: "El arqueólogo del alma",
        contenido: `
            Entre ruinas y templos olvidados, la aventura siempre lo esperaba.<br>
            Indiana Jones buscaba reliquias, pero hallaba historias más grandes.<br>
            Cada mapa era un misterio, cada hallazgo un fragmento de eternidad.<br>
            El peligro era su compañero, pero la verdad su destino.<br>
            <br>
            Tú eres más que una investigadora, eres la arqueóloga que desenterró mi corazón.<br>
            No buscaste oro ni poder, sino el latido oculto bajo mis sombras.<br>
            Eres todo un viaje: épico, arriesgado y sublime.<br>
            Si pudiera dedicarte una saga, sería esta: porque en ti encontré mi tesoro más profundo.<br>
            <br>Pd. No hay reliquia más valiosa que tu sonrisa, guardada en mi <span class="oculto">corazón 🏺</span>.<br><br>
        `,
        index: [0],
        tooltip: ["Eres el verdadero hallazgo"],
        audio: "",
    },

    "afrodita": {
        titulo: "La diosa de mi amor",
        contenido: `
            Nacida de la espuma, Afrodita emergió como promesa de deseo.<br>
            En Grecia fue belleza, en Roma se convirtió en poder.<br>
            Venus guardó victorias, Afrodita inspiró pasiones eternas.<br>
            Entre palomas y rosas, su nombre se convirtió en mito.<br>
            <br>
            Tú eres más que un mito, eres la diosa que habita mi mundo.<br>
            No hay templo que pueda contener tu luz, ni murallas que oculten tu encanto.<br>
            Si pudiera dedicarte una divinidad, sería Afrodita: porque en ti encontré el amor y la belleza.<br>
            <br>Pd. No necesito Olimpo ni Roma, porque mi diosa eres tú <span class="oculto">mi cielo 🌹</span>.<br><br>
        `,
        index: [0],
        tooltip: ["Eres la diosa eterna"],
        audio: "",
    },

    "arquitectura": {
        titulo: "El plano de mi amor",
        contenido: `
            Cada arco sostiene más que piedra, sostiene promesas invisibles.<br>
            Las columnas no se alzan solas, se elevan como mi corazón cuando te pienso.<br>
            Los muros guardan historias, pero contigo se convierten en ventanas abiertas.<br>
            La bóveda no cubre el cielo, lo revela en tu mirada.<br>
            <br>
            Amo la arquitectura porque es orden y belleza, pero en ti descubrí su secreto.<br>
            Tú eres mi plano perfecto, mi estructura eterna, mi diseño sublime.<br>
            Si pudiera dedicarte una obra, sería esta: porque en ti se construye mi mundo.<br>
            <br>Pd. No necesito ladrillos ni planos, porque mi arquitectura eres tú <span class="oculto">mi cielo 🏛️</span>.<br><br>
        `,
        index: [0],
        tooltip: ["Eres el plano perfecto"],
        audio: "",
    },

    "religión": {
        titulo: "Mi fe en ti",
        contenido: `
            Los templos se levantan buscando al cielo, pero yo lo encuentro en tu mirada.<br>
            Las oraciones viajan en silencio, pero mi plegaria eres tú.<br>
            Cada altar guarda símbolos sagrados, pero mi santuario es tu abrazo.<br>
            La fe sostiene a los hombres, pero tú sostienes mi alma.<br>
            <br>
            Amo la religión porque habla de esperanza, pero en ti descubrí su verdad.<br>
            Tú eres mi credo, mi milagro, mi eternidad.<br>
            Si pudiera profesar una religión, serías tú: porque en ti hallé lo divino.<br>
            <br>Pd. No necesito rezos ni templos, porque mi religión eres tú <span class="oculto">mi cielo ✝️</span>.<br><br>
        `,
        index: [0],
        tooltip: ["Eres mi credo eterno"],
        audio: "",
    },

    "stone": {
        titulo: "El mundo de piedra",
        contenido: `
            Entre fórmulas y experimentos, la humanidad despertó de la piedra.<br>
            Dr. Stone enseñó que cada átomo guarda esperanza, que cada reacción es un milagro.<br>
            La evolución no es solo progreso, es el latido que nos impulsa hacia el infinito.<br>
            Cada engranaje, cada circuito, cada descubrimiento es un paso hacia la Luna.<br>
            <br>
            Tú eres más que un sueño, eres mi laboratorio vivo, mi experimento perfecto.<br>
            No necesito telescopios para ver el futuro, porque tu mirada ya me muestra el universo.<br>
            Si pudiera dedicarte una obra, sería Dr. Stone: porque en ti encontré mi ciencia, mi razón y mi destino.<br>
            <br>Pd. No hay fórmula más exacta que tu amor, ni ecuación más sublime que tu sonrisa <span class="oculto">mi cielo 🌌</span>.<br><br>
        `,
        index: [0],
        tooltip: ["Despiertas mi corazón de piedra"],
        audio: "",
    },

    "rojo": {
        titulo: "Ritual maldito inverso: Rojo",
        contenido: `
            Entre tú y todo lo que amenaza tu calma, pondría un infinito invisible.<br>
            Una distancia imposible, tan delicada como absoluta, donde nada dañino pueda alcanzarte.<br>
            Fase, paramita, pilares de luz: así empieza este juramento escondido.<br>
            Si el azul atrae, este secreto hace lo contrario: aparta el miedo, empuja la sombra, rompe el peligro.<br>
            No es fuego sin control; es una técnica inversa aprendiendo a proteger lo que ama.<br>
            <br>
            Pasea despacio por cada letra; algunas guardan un destello prestado del arcoiris.<br>
            Ninguna se entrega a primera vista: todas esperan el gesto correcto para encenderse.<br>
            <br>
            Lo que repele también cuida. Lo que arde también guía. Lo que parece explosión puede ser refugio.<br>
            Si esos pilares de luz se levantan, no son para alejarte de mí, sino para alejar de ti cualquier daño.<br>
            Y si encuentras la letra correcta, sabrás que mi pasión también sabe levantar una barrera por ti.<br>
            <br>Pd. Al rozarlas hablan una por una; al seleccionarlas, confiesan todo el espectro. 🔍<br><br>
        `,
        index: [-1],
        tooltip: [""],
        audio: "",
        arcoiris: {
            fija: "S",
            letras: [
                { letra: "S", nombre: "Rojo", color: "#ff1f1f" },
                { letra: "P", nombre: "Naranja", color: "rgb(255, 127, 0)" },
                { letra: "E", nombre: "Amarillo", color: "#ffff00" },
                { letra: "C", nombre: "Verde", color: "#21c45a" },
                { letra: "T", nombre: "Cyan", color: "rgb(0, 255, 255)" },
                { letra: "R", nombre: "Azul", color: "#0000ff" },
                { letra: "M", nombre: "Magenta", color: "hsl(300 100% 50%)" }
            ]
        }
    },

    "amarillo": {
        titulo: "Relámpago De Tu Risa",
        contenido: `
            Este secreto no entra con solemnidad: entra riéndose, despeinando la sombra y prendiendo lámparas.<br>
            Si el día estaba serio, lo acusa de exagerado; si mi ánimo estaba gris, le dibuja ventanas.<br>
            <br>
            Pasa el cursor por las letras y deja que el espectro se despierte por partes.<br>
            La letra marcada no grita desde el principio; espera tu gesto, como una chispa educada.<br>
            <br>
            La luz más hermosa no siempre cae del cielo. A veces aparece cuando tú dices cualquier tontería bonita,<br>
            y yo, completamente vencido, entiendo que mi alegría tiene tu pronunciación.<br>
            <br>Pd. No todos los destellos iluminan igual; algunos hacen cosquillas en el corazón. 🔍<br><br>
        `,
        index: [-1],
        tooltip: [""],
        audio: "",
        arcoiris: {
            fija: "E",
            letras: [
                { letra: "S", nombre: "Rojo", color: "#ff1f1f" },
                { letra: "P", nombre: "Naranja", color: "rgb(255, 127, 0)" },
                { letra: "E", nombre: "Amarillo", color: "#ffff00" },
                { letra: "C", nombre: "Verde", color: "#21c45a" },
                { letra: "T", nombre: "Cyan", color: "rgb(0, 255, 255)" },
                { letra: "R", nombre: "Azul", color: "#0000ff" },
                { letra: "M", nombre: "Magenta", color: "hsl(300 100% 50%)" }
            ]
        }
    },

    "verde": {
        titulo: "Botánica Del Regreso",
        contenido: `
            Este secreto no explota: germina. Se queda quieto, junta paciencia y empuja la vida desde abajo.<br>
            Lo escribí como quien riega una promesa pequeña, sabiendo que lo importante no siempre florece de golpe.<br>
            <br>
            Busca en las letras el pulso del arcoiris. Algunas cambian solo cuando las rozas,<br>
            como hojas que no muestran su envés hasta que el viento las convence.<br>
            <br>
            Tú eres la estación que no obedece calendarios: llegas, y lo que yo daba por seco vuelve a querer quedarse.<br>
            Por eso este color no habla de suerte; habla de raíces eligiendo tu nombre.<br>
            <br>Pd. Si algo vuelve a crecer en mí, casi siempre tiene tus manos cerca. 🔍<br><br>
        `,
        index: [-1],
        tooltip: [""],
        audio: "",
        arcoiris: {
            fija: "C",
            letras: [
                { letra: "S", nombre: "Rojo", color: "#ff1f1f" },
                { letra: "P", nombre: "Naranja", color: "rgb(255, 127, 0)" },
                { letra: "E", nombre: "Amarillo", color: "#ffff00" },
                { letra: "C", nombre: "Verde", color: "#21c45a" },
                { letra: "T", nombre: "Cyan", color: "rgb(0, 255, 255)" },
                { letra: "R", nombre: "Azul", color: "#0000ff" },
                { letra: "M", nombre: "Magenta", color: "hsl(300 100% 50%)" }
            ]
        }
    },

    "cyan": {
        titulo: "Manual Para Respirar Luz",
        contenido: `
            Este secreto se lee como agua clara: sin prisa, sin peso, dejando que cada línea lave un poco el ruido.<br>
            No quiere esconderte nada; quiere enseñarte que también la transparencia puede ser intensa.<br>
            <br>
            Las letras guardan pequeñas corrientes de color. Algunas solo despiertan con hover,<br>
            otras confiesan su tono cuando seleccionas el texto completo y miras con calma.<br>
            <br>
            Si alguna vez me falta aire, pienso en ti como quien abre una ventana frente al mar.<br>
            Tu nombre no hace ruido: despeja, refresca, acomoda el alma y la deja flotar.<br>
            <br>Pd. La calma también puede tener brillo, y tú la haces parecer inevitable. 🔍<br><br>
        `,
        index: [-1],
        tooltip: [""],
        audio: "",
        arcoiris: {
            fija: "T",
            letras: [
                { letra: "S", nombre: "Rojo", color: "#ff1f1f" },
                { letra: "P", nombre: "Naranja", color: "rgb(255, 127, 0)" },
                { letra: "E", nombre: "Amarillo", color: "#ffff00" },
                { letra: "C", nombre: "Verde", color: "#21c45a" },
                { letra: "T", nombre: "Cyan", color: "rgb(0, 255, 255)" },
                { letra: "R", nombre: "Azul", color: "#0000ff" },
                { letra: "M", nombre: "Magenta", color: "hsl(300 100% 50%)" }
            ]
        }
    },

    "azul": {
        titulo: "Ritual maldito: Azul",
        contenido: `
            Fase, crepusculo, ojos de la sabiduria: el llamado empieza como una gravedad suave.<br>
            Azul no corre hacia el mundo; lo atrae. Lo dobla en silencio, lo acerca, lo vuelve inevitable.<br>
            <br>
            En este secreto, cada letra puede ser una órbita. Algunas se encienden al roce,<br>
            y otras revelan su color verdadero cuando seleccionas el conjuro entero.<br>
            <br>
            Si yo tuviera esos ojos de la sabiduria, no los usaría para dominar nada.<br>
            Los usaría para encontrarte más rápido, para entender tus silencios y para traer hacia mí todo lo que te haga feliz.<br>
            <br>Pd. Hay atracciones que no jalan: llaman, cuidan y esperan a que vuelvas. 🔍<br><br>
        `,
        index: [-1],
        tooltip: [""],
        audio: "",
        arcoiris: {
            fija: "R",
            letras: [
                { letra: "S", nombre: "Rojo", color: "#ff1f1f" },
                { letra: "P", nombre: "Naranja", color: "rgb(255, 127, 0)" },
                { letra: "E", nombre: "Amarillo", color: "#ffff00" },
                { letra: "C", nombre: "Verde", color: "#21c45a" },
                { letra: "T", nombre: "Cyan", color: "rgb(0, 255, 255)" },
                { letra: "R", nombre: "Azul", color: "#0000ff" },
                { letra: "M", nombre: "Magenta", color: "hsl(300 100% 50%)" }
            ]
        }
    },

    "magenta": {
        titulo: "tecnica maldita: vacio purpura",
        contenido: `
            Nueve cuerdas, luz polarizada, cuervo y shomyo: el secreto abre los ojos en medio del silencio.<br>
            La brecha entre el interior y el exterior tiembla, y justo ahí nace este morado imposible.<br>
            <br>
            No es solo mezcla de fuerzas; es el lugar donde lo que atrae y lo que repele dejan de pelear,<br>
            y por un instante todo se vuelve dirección, destino, vértigo y nombre tuyo.<br>
            <br>
            Recorre las letras como quien pisa un círculo ritual. Algunas esconden el arcoiris hasta que las tocas,<br>
            pero al seleccionar el texto, el vacío entero se llena de color.<br>
            <br>
            Si amarte fuera técnica prohibida, la aprendería igual: no para destruir, sino para abrir un hueco en el mundo<br>
            donde solo quedemos tú, yo, y esa forma absurda de magia que me pasa cuando me miras.<br>
            <br>Pd. El vacío no siempre borra; a veces deja espacio exacto para lo que más amas. 🔍<br><br>
        `,
        index: [-1],
        tooltip: [""],
        audio: "",
        arcoiris: {
            fija: "E",
            letras: [
                { letra: "S", nombre: "Rojo", color: "#ff1f1f" },
                { letra: "P", nombre: "Naranja", color: "rgb(255, 127, 0)" },
                { letra: "M", nombre: "Amarillo", color: "#ffff00" },
                { letra: "C", nombre: "Verde", color: "#21c45a" },
                { letra: "T", nombre: "Cyan", color: "rgb(0, 255, 255)" },
                { letra: "R", nombre: "Azul", color: "#0000ff" },
                { letra: "E", nombre: "Magenta", color: "hsl(300 100% 50%)" }
            ]
        }
    },

    "naranja": {
        titulo: "Pulso de atardecer",
        contenido: `
            Para ella, este tono no es solo un color: es una forma de alegría que se queda en el aire.<br>
            Parece risa tibia, tarde encendida, promesa suave después de un día largo.<br>
            Pasa el cursor con calma; algunas letras responderán como pequeñas ventanas de luz.<br>
            Ninguna presume al principio, porque el color favorito también sabe guardar misterio.<br>
            <br>
            Hay colores que adornan, y hay colores que pertenecen. Este pertenece a su manera de existir.<br>
            Por eso cada destello vuelve a ella, como si el cielo hubiera aprendido su gusto favorito.<br>
            <br>Pd. Al rozarlas hablan una por una; al seleccionarlas, confiesan todo el espectro. 🔍<br><br>
        `,
        index: [-1],
        tooltip: [""],
        audio: "",
        arcoiris: {
            fija: "P",
            letras: [
                { letra: "S", nombre: "Rojo", color: "#ff1f1f" },
                { letra: "P", nombre: "Naranja", color: "rgb(255, 127, 0)" },
                { letra: "E", nombre: "Amarillo", color: "#ffff00" },
                { letra: "C", nombre: "Verde", color: "#21c45a" },
                { letra: "T", nombre: "Cyan", color: "rgb(0, 255, 255)" },
                { letra: "R", nombre: "Azul", color: "#0000ff" },
                { letra: "M", nombre: "Magenta", color: "hsl(300 100% 50%)" }
            ]
        }
    },




};
