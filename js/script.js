const BASE = "/Riveropedia/";

const sonidoError = new Audio(BASE + "wrong.mp3");
sonidoError.preload = "auto";

function speak(text) {

    const message =
        new SpeechSynthesisUtterance(text);

    const voices =
        speechSynthesis.getVoices();

    const voice =
        voices.find(v =>
            v.name.includes("Sabina")
        ) ||
        voices.find(v =>
            v.name.includes("Dalia")
        ) ||
        voices.find(v =>
            v.name.includes("Paulina")
        ) ||
        voices.find(v =>
            v.name.includes("Helena")
        ) ||
        voices.find(v =>
            v.lang.startsWith("es")
        );

    if (voice) {
        message.voice = voice;
        console.log("Usando:", voice.name);
    }

    message.lang = "es-MX";
    message.rate = 1;
    message.pitch = 1.5;

    speechSynthesis.speak(message);
}

function navegarBusqueda() {
    const form = document.getElementById("busqueda-form");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();

        const input = document.getElementById("busqueda");
        const palabra = input?.value?.trim().toLowerCase();

        if (!palabra) return;

        if (palabra === "sideral"){
            location.href = BASE + "info/sideral.html";
        }

        else if (
            typeof secretos !== "undefined" &&
            Object.prototype.hasOwnProperty.call(secretos, palabra)
        ) {
            location.href =
                BASE + "info/secreto.html?clave=" +
                encodeURIComponent(palabra);
        } else {
            sonidoError.currentTime = 0;
            sonidoError.play().catch(() => { });
            input.value = "";
        }
    });
}

function getFechaPorTitulo(titulo) {
    return Object.entries(poemas).find(([fecha, poema]) =>
        poema.titulo === titulo
    )?.[0];
}

function initAutocomplete() {

    const input = document.getElementById("busqueda");
    const lista = document.getElementById("sugerencias");

    if (!input || !lista || typeof poemas === "undefined") return;

    const titulos = Object.values(poemas).map(p => p.titulo);

    input.addEventListener("input", () => {

        const valor = input.value.toLowerCase();
        lista.innerHTML = "";

        if (!valor) return;

        const filtrados = titulos.filter(t =>
            t.toLowerCase().includes(valor)
        );

        filtrados.slice(0, 6).forEach(titulo => {

            const li = document.createElement("li");
            li.textContent = titulo;

            li.addEventListener("click", () => {

                const fecha = getFechaPorTitulo(titulo);

                if (fecha) {
                    window.location.href =
                        BASE + "info/poema.html?fecha=" + fecha;
                }
            });

            lista.appendChild(li);
        });
    });
}

function initSherlocked() {
    const link = document.getElementById("link-sherlocked");
    if (!link) return;
    const desbloqueado = localStorage.getItem("sherlocked") === "true";

    if (!desbloqueado) {
        link.classList.add("sherlocked-locked");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    navegarBusqueda();
    initAutocomplete();
    initMesNavigation?.();
    initSherlocked();

    const grid = document.getElementById("grid");
    if (grid) renderCalendario(mesActual);
});

document.addEventListener("contextmenu", e => {
    e.preventDefault();
});

document.addEventListener("keydown", e => {

    if (
        (e.ctrlKey || e.metaKey) &&
        ["c"].includes(e.key.toLowerCase())
    ) {
        e.preventDefault();
    }

});