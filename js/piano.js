(() => {
    const fechaPiano = new URLSearchParams(location.search).get("fecha");
    const poemaPiano = fechaPiano && typeof poemas !== "undefined" ? poemas[fechaPiano] : null;
    if (!poemaPiano?.piano) return;

    const notas = [
        {nombre: "Do",   letra: "Z", frecuencia: 523.25, tipo: "blanca"},
        {nombre: "Do♯",  letra: "S", frecuencia: 554.37, tipo: "negra", posicion: 1 },
        {nombre: "Re",   letra: "X", frecuencia: 587.33, tipo: "blanca"},
        {nombre: "Re♯",  letra: "D", frecuencia: 622.25, tipo: "negra", posicion: 2 },
        {nombre: "Mi",   letra: "C", frecuencia: 659.26, tipo: "blanca"},
        {nombre: "Fa",   letra: "V", frecuencia: 698.46, tipo: "blanca"},
        {nombre: "Fa♯",  letra: "G", frecuencia: 739.99, tipo: "negra", posicion: 4},
        {nombre: "Sol",  letra: "B", frecuencia: 783.99, tipo: "blanca"},
        {nombre: "Sol♯", letra: "H", frecuencia: 830.61, tipo: "negra", posicion: 5},
        {nombre: "La",   letra: "N", frecuencia: 880.00, tipo: "blanca"},
        {nombre: "La♯",  letra: "J", frecuencia: 932.33, tipo: "negra", posicion: 6},
        {nombre: "Si",   letra: "M", frecuencia: 987.77, tipo: "blanca"}
    ];

    const piano = document.createElement("aside");
    piano.className = "piano-flotante";
    piano.setAttribute("aria-label", "Piano de una octava");
    piano.innerHTML = `
        <div class="piano-adorno" aria-hidden="true">✦ una octava para ti ✦</div>
        <div class="piano-teclas"></div>
    `;

    const teclas = piano.querySelector(".piano-teclas");
    const blancas = notas.filter(nota => nota.tipo === "blanca");
    const negras = notas.filter(nota => nota.tipo === "negra");
    const teclasPorLetra = new Map();
    let despertarTimer;

    const normalizarNota = nota => String(nota || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();

    [...blancas, ...negras].forEach(nota => {
        const tecla = document.createElement("button");
        const letra = nota.letra?.toLowerCase();
        tecla.type = "button";
        tecla.className = `piano-tecla ${nota.tipo}`;
        tecla.dataset.nota = normalizarNota(nota.nombre);
        tecla.dataset.frecuencia = nota.frecuencia;
        if (letra) {
            tecla.dataset.letra = letra;
            teclasPorLetra.set(letra, tecla);
        }
        tecla.setAttribute("aria-label", `${nota.nombre}, ${nota.frecuencia} hercios${nota.letra ? `, tecla ${nota.letra}` : ""}`);
        tecla.title = `${nota.nombre} · ${nota.frecuencia} Hz${nota.letra ? ` · ${nota.letra}` : ""}`;
        tecla.innerHTML = `
            <span class="piano-nota">${nota.nombre}</span>
            ${nota.letra ? `<span class="piano-letra">${nota.letra}</span>` : ""}
        `;
        if (nota.posicion) tecla.style.setProperty("--posicion", nota.posicion);
        teclas.appendChild(tecla);
    });

    let audioCtx;
    const voces = new Map();
    const armonicosPiano = [
        { multiplicador: 1, amplitud: 1 },
        // { multiplicador: 2, amplitud: .42 },
        // { multiplicador: 3, amplitud: .22 },
        // { multiplicador: 4, amplitud: .12 },
        // { multiplicador: 5, amplitud: .07 },
        // { multiplicador: 6, amplitud: .04 }
    ];

    const iniciarNota = async (tecla, pointerId) => {
        if (voces.has(pointerId)) return false;
        audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === "suspended") await audioCtx.resume();

        const ahora = audioCtx.currentTime;
        const ganancia = audioCtx.createGain();
        const filtro = audioCtx.createBiquadFilter();
        const frecuenciaBase = Number(tecla.dataset.frecuencia);
        const osciladores = armonicosPiano.map(({ multiplicador, amplitud }, index) => {
            const oscilador = audioCtx.createOscillator();
            const gananciaArmonico = audioCtx.createGain();
            oscilador.type = "sine";
            oscilador.frequency.setValueAtTime(frecuenciaBase * multiplicador, ahora);
            oscilador.detune.setValueAtTime(index ? (index % 2 ? 1.8 : -1.2) : 0, ahora);
            gananciaArmonico.gain.setValueAtTime(amplitud, ahora);
            oscilador.connect(gananciaArmonico).connect(ganancia);
            oscilador.start(ahora);
            return oscilador;
        });

        filtro.type = "lowpass";
        filtro.frequency.setValueAtTime(5200, ahora);
        filtro.frequency.exponentialRampToValueAtTime(2400, ahora + .45);
        filtro.Q.setValueAtTime(.7, ahora);

        ganancia.gain.setValueAtTime(.0001, ahora);
        ganancia.gain.exponentialRampToValueAtTime(.18, ahora + .012);
        ganancia.gain.exponentialRampToValueAtTime(.065, ahora + .32);
        ganancia.gain.exponentialRampToValueAtTime(.028, ahora + 1.7);
        ganancia.connect(filtro).connect(audioCtx.destination);
        voces.set(pointerId, { osciladores, ganancia, tecla });
        tecla.classList.add("activa");
        piano.classList.add("piano-despierto");
        clearTimeout(despertarTimer);
        return true;
    };

    const detenerNota = pointerId => {
        const voz = voces.get(pointerId);
        if (!voz || !audioCtx) return;
        const ahora = audioCtx.currentTime;
        voz.ganancia.gain.cancelScheduledValues(ahora);
        voz.ganancia.gain.setValueAtTime(Math.max(voz.ganancia.gain.value, .0001), ahora);
        voz.ganancia.gain.exponentialRampToValueAtTime(.0001, ahora + .18);
        voz.osciladores.forEach(oscilador => oscilador.stop(ahora + .19));
        voz.tecla.classList.remove("activa");
        voces.delete(pointerId);
        if (!voces.size) {
            despertarTimer = setTimeout(() => piano.classList.remove("piano-despierto"), 900);
        }
    };

    const notasPoema = [...document.querySelectorAll("#poema-texto i > b, #poema-texto b > i, #poema-texto em > strong, #poema-texto strong > em")]
        .map(elemento => ({ elemento, nota: normalizarNota(elemento.textContent) }))
        .filter(item => ["do", "re", "mi", "fa", "sol", "la", "si"].includes(item.nota));

    const cancion = Array.isArray(poemaPiano.song)
        ? poemaPiano.song.map(normalizarNota)
        : notasPoema.map(item => item.nota);

    let progreso = 0;
    let secretoMostrado = false;

    const reiniciarCancion = () => {
        progreso = 0;
        notasPoema.forEach(item => item.elemento.classList.remove("nota-correcta"));
    };

    const mostrarSecreto = () => {
        if (secretoMostrado) return;
        secretoMostrado = true;
        const secreto = poemaPiano.secretoPiano || {};
        const mensajeSecreto = poemaPiano.mensaje || secreto.mensaje || "Tocaste lo que el poema guardaba en silencio.";
        const modal = document.createElement("div");
        modal.className = "piano-secreto";
        modal.innerHTML = `
            <div class="piano-secreto-card" role="dialog" aria-modal="true" aria-label="${secreto.titulo || "Secreto musical"}">
                <button class="piano-secreto-cerrar" type="button" aria-label="Cerrar secreto">×</button>
                <div class="piano-secreto-brillo" aria-hidden="true">✦</div>
                <h3>${secreto.titulo || "La canción escondida"}</h3>
                <p class="piano-secreto-intro">Tocaste lo que el poema guardaba en silencio.</p>
                <p class="piano-secreto-mensaje"><strong></strong></p>
            </div>
        `;
        modal.querySelector(".piano-secreto-mensaje strong").textContent = mensajeSecreto;
        document.body.appendChild(modal);
        modal.querySelector(".piano-secreto-cerrar").focus();
        modal.addEventListener("click", event => {
            if (event.target === modal || event.target.closest(".piano-secreto-cerrar")) modal.remove();
        });
        window.addEventListener("keydown", function cerrarConEscape(event) {
            if (event.key !== "Escape") return;
            modal.remove();
            window.removeEventListener("keydown", cerrarConEscape);
        });
    };

    const evaluarCancion = notaTocada => {
        if (!cancion.length) return;
        const notaEsperada = cancion[progreso];
        const marcaActual = notasPoema[progreso];

        if (notaTocada === notaEsperada) {
            marcaActual?.elemento.classList.add("nota-correcta");
            progreso += 1;
            if (progreso >= cancion.length) mostrarSecreto();
            return;
        }

        reiniciarCancion();
        if (marcaActual) {
            marcaActual.elemento.classList.add("nota-error");
            setTimeout(() => marcaActual.elemento.classList.remove("nota-error"), 420);
        }
    };

    const tocarTecla = async (tecla, id) => {
        const empezo = await iniciarNota(tecla, id);
        if (empezo) evaluarCancion(tecla.dataset.nota);
    };

    teclas.addEventListener("pointerdown", event => {
        const tecla = event.target.closest(".piano-tecla");
        if (!tecla) return;
        event.preventDefault();
        tecla.setPointerCapture(event.pointerId);
        tocarTecla(tecla, event.pointerId);
    });
    
    teclas.addEventListener("pointerup", event => detenerNota(event.pointerId));
    teclas.addEventListener("pointercancel", event => detenerNota(event.pointerId));
    teclas.addEventListener("lostpointercapture", event => detenerNota(event.pointerId));

    const esCampoDeTexto = elemento => {
        const etiqueta = elemento?.tagName?.toLowerCase();
        return etiqueta === "input" || etiqueta === "textarea" || etiqueta === "select" || elemento?.isContentEditable;
    };

    window.addEventListener("keydown", event => {
        if (event.repeat || event.ctrlKey || event.metaKey || event.altKey || esCampoDeTexto(event.target)) return;
        const tecla = teclasPorLetra.get(event.key.toLowerCase());
        if (!tecla) return;
        event.preventDefault();
        tocarTecla(tecla, `teclado:${event.key.toLowerCase()}`);
    });

    window.addEventListener("keyup", event => {
        detenerNota(`teclado:${event.key.toLowerCase()}`);
    });

    document.body.classList.add("piano-activo");
    document.body.appendChild(piano);
})();
