(() => {
    const fechaPiano = new URLSearchParams(location.search).get("fecha");
    const poemaPiano = fechaPiano && typeof poemas !== "undefined" ? poemas[fechaPiano] : null;
    if (!poemaPiano?.piano) return;

    const notas = [
        { nombre: "La", frecuencia: 440, tipo: "blanca" },
        { nombre: "La♯", frecuencia: 466.16, tipo: "negra", posicion: 1 },
        { nombre: "Si", frecuencia: 493.88, tipo: "blanca" },
        { nombre: "Do", frecuencia: 523.25, tipo: "blanca" },
        { nombre: "Do♯", frecuencia: 554.37, tipo: "negra", posicion: 3 },
        { nombre: "Re", frecuencia: 587.33, tipo: "blanca" },
        { nombre: "Re♯", frecuencia: 622.25, tipo: "negra", posicion: 4 },
        { nombre: "Mi", frecuencia: 659.25, tipo: "blanca" },
        { nombre: "Fa", frecuencia: 698.46, tipo: "blanca" },
        { nombre: "Fa♯", frecuencia: 739.99, tipo: "negra", posicion: 6 },
        { nombre: "Sol", frecuencia: 783.99, tipo: "blanca" }
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

    [...blancas, ...negras].forEach(nota => {
        const tecla = document.createElement("button");
        tecla.type = "button";
        tecla.className = `piano-tecla ${nota.tipo}`;
        tecla.dataset.frecuencia = nota.frecuencia;
        tecla.setAttribute("aria-label", `${nota.nombre}, ${nota.frecuencia} hercios`);
        tecla.title = `${nota.nombre} · ${nota.frecuencia} Hz`;
        tecla.innerHTML = `<span class="piano-nota">${nota.nombre}</span>`;
        if (nota.posicion) tecla.style.setProperty("--posicion", nota.posicion);
        teclas.appendChild(tecla);
    });

    let audioCtx;
    const voces = new Map();

    const iniciarNota = async (tecla, pointerId) => {
        if (voces.has(pointerId)) return;
        audioCtx ||= new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === "suspended") await audioCtx.resume();

        const ahora = audioCtx.currentTime;
        const oscilador = audioCtx.createOscillator();
        const ganancia = audioCtx.createGain();
        oscilador.type = "sine";
        oscilador.frequency.setValueAtTime(Number(tecla.dataset.frecuencia), ahora);
        ganancia.gain.setValueAtTime(.0001, ahora);
        ganancia.gain.exponentialRampToValueAtTime(.22, ahora + .025);
        oscilador.connect(ganancia).connect(audioCtx.destination);
        oscilador.start(ahora);
        voces.set(pointerId, { oscilador, ganancia, tecla });
        tecla.classList.add("activa");
    };

    const detenerNota = pointerId => {
        const voz = voces.get(pointerId);
        if (!voz || !audioCtx) return;
        const ahora = audioCtx.currentTime;
        voz.ganancia.gain.cancelScheduledValues(ahora);
        voz.ganancia.gain.setValueAtTime(Math.max(voz.ganancia.gain.value, .0001), ahora);
        voz.ganancia.gain.exponentialRampToValueAtTime(.0001, ahora + .12);
        voz.oscilador.stop(ahora + .13);
        voz.tecla.classList.remove("activa");
        voces.delete(pointerId);
    };

    teclas.addEventListener("pointerdown", event => {
        const tecla = event.target.closest(".piano-tecla");
        if (!tecla) return;
        event.preventDefault();
        tecla.setPointerCapture(event.pointerId);
        iniciarNota(tecla, event.pointerId);
    });
    teclas.addEventListener("pointerup", event => detenerNota(event.pointerId));
    teclas.addEventListener("pointercancel", event => detenerNota(event.pointerId));
    teclas.addEventListener("lostpointercapture", event => detenerNota(event.pointerId));

    document.body.classList.add("piano-activo");
    document.body.appendChild(piano);
})();
