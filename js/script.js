const BASE = "/Riveropedia/";
const sonidoError = new Audio(BASE + "wrong.mp3");
sonidoError.preload = "none";

function prepararSonidoError() {
    if (sonidoError.readyState > 0) return;
    sonidoError.preload = "auto";
    sonidoError.load();
}

function speak(text) {
    const message = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const voice = voices.find(v => v.name.includes("Sabina")) ||
        voices.find(v => v.name.includes("Dalia")) ||
        voices.find(v => v.name.includes("Paulina")) ||
        voices.find(v => v.name.includes("Helena")) ||
        voices.find(v => v.lang.startsWith("es"));

    if (voice) message.voice = voice;
    message.lang = "es-MX";
    message.rate = 1;
    message.pitch = 1.5;
    speechSynthesis.speak(message);
}

function navegarBusqueda() {
    const form = document.getElementById("busqueda-form");
    const input = document.getElementById("busqueda");
    if (!form || !input) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        const palabra = input.value.trim().toLowerCase();
        if (!palabra) return;

        if (palabra === "sideral") {
            location.href = BASE + "secrets/sideral.html";
            return;
        }
        else if (palabra === "camelot") {
            location.href = BASE + "secrets/camelot.html";
            return;
        }
        else if (palabra === "marqués") {
            location.href = BASE + "secrets/marques.html";
            return;
        }

        if (typeof secretos !== "undefined" && Object.hasOwn(secretos, palabra)) {
            location.href = BASE + "info/secreto.html?clave=" + encodeURIComponent(palabra);
            return;
        }

        prepararSonidoError();
        sonidoError.currentTime = 0;
        sonidoError.play().catch(() => {});
        input.value = "";
    });
}

function getFechaPorTitulo(titulo) {
    return Object.entries(poemas).find(([, poema]) => poema.titulo === titulo)?.[0];
}

function initAutocomplete() {
    const input = document.getElementById("busqueda");
    const lista = document.getElementById("sugerencias");
    if (!input || !lista || typeof poemas === "undefined") return;

    const titulos = Object.values(poemas).map(p => p.titulo);
    input.addEventListener("input", () => {
        const valor = input.value.trim().toLowerCase();
        lista.innerHTML = "";
        if (!valor) return;

        titulos
            .filter(titulo => titulo.toLowerCase().includes(valor))
            .slice(0, 6)
            .forEach(titulo => {
                const li = document.createElement("li");
                li.textContent = titulo;
                li.addEventListener("click", () => {
                    const fecha = getFechaPorTitulo(titulo);
                    if (fecha) location.href = BASE + "info/poema.html?fecha=" + fecha;
                });
                lista.appendChild(li);
            });
    });
}

function initSherlocked() {
    const link = document.getElementById("link-sherlocked");
    if (!link || localStorage.getItem("sherlocked") === "true") return;
    link.classList.add("sherlocked-locked");
}

document.addEventListener("DOMContentLoaded", () => {
    navegarBusqueda();
    initAutocomplete();
    initSherlocked();
    setTimeout(prepararSonidoError, 3000);
    if (typeof initMesNavigation === "function") initMesNavigation();
    if (typeof renderCalendario === "function" && document.getElementById("grid")) renderCalendario(mesActual);
});

document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "c") e.preventDefault();
});
