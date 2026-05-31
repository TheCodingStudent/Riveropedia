const diasPorMes = {
    enero: 31,
    febrero: 28,
    marzo: 31,
    abril: 30,
    mayo: 31,
    junio: 30,
    julio: 31,
    agosto: 31,
    septiembre: 30,
    octubre: 31,
    noviembre: 30,
    diciembre: 31
};

const meses = Object.keys(diasPorMes);

let mesActual = 4; // mayo

const inicio = new Date(2026, 4, 25);
const fin = new Date(2026, 6, 31);

const excepciones = {
    "2026-05-07": "Gina",
    "2026-05-23": "Gina",
    "2026-10-18": "Armando"
};

const hoy = new Date();
hoy.setHours(0, 0, 0, 0);

/* =========================
   UTILIDADES
========================= */

function formatearFecha(fecha) {
    return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}-${String(fecha.getDate()).padStart(2, "0")}`;
}

function poemaExiste(fechaISO) {
    return typeof poemas !== "undefined" &&
        Object.prototype.hasOwnProperty.call(poemas, fechaISO);
}

/* =========================
   CALENDARIO
========================= */

function renderCalendario(mesIndex) {

    const grid = document.getElementById("grid");
    if (!grid) return;

    grid.innerHTML = "";

    const mes = meses[mesIndex];
    const totalDias = diasPorMes[mes];

    const primerDia = new Date(2026, mesIndex, 1).getDay();
    const offset = primerDia === 0 ? 6 : primerDia - 1;

    const mesTexto = document.getElementById("mes-actual");
    if (mesTexto) {
        mesTexto.textContent =
            mes.charAt(0).toUpperCase() + mes.slice(1);
    }

    // espacios vacíos
    for (let i = 0; i < offset; i++) {
        const vacio = document.createElement("div");
        vacio.classList.add("dia-vacio");
        grid.appendChild(vacio);
    }

    // días
    for (let d = 1; d <= totalDias; d++) {

        const boton = document.createElement("button");
        boton.classList.add("dia");
        boton.textContent = d;

        const fecha = new Date(2026, mesIndex, d);
        fecha.setHours(0, 0, 0, 0);

        const fechaISO = formatearFecha(fecha);

        const dentroDeRango = fecha >= inicio && fecha <= fin;
        const esExcepcion = Object.prototype.hasOwnProperty.call(excepciones, fechaISO);
        const autorExcepcion = excepciones[fechaISO];
        const noEsFuturo = fecha <= hoy;

        if ((dentroDeRango && noEsFuturo) || esExcepcion) {

            boton.classList.add("disponible");
            boton.dataset.dia = fechaISO;

            if (esExcepcion) {
                if (autorExcepcion === "Armando") boton.classList.add("armando");
                if (autorExcepcion === "Gina") boton.classList.add("gina");
            }

            if (localStorage.getItem(fechaISO) === "visitado") {
                boton.classList.add("visitado");
            }

            boton.addEventListener("click", () => {

                const ahora = new Date();
                const desbloqueado = ahora.getHours() >= 21;

                if (
                    fechaISO === formatearFecha(hoy) &&
                    !desbloqueado
                ) {
                    window.location.href = `../info/pendiente.html?fecha=${fechaISO}`;
                    return;
                }

                if (poemaExiste(fechaISO)) {

                    localStorage.setItem(fechaISO, "visitado");
                    boton.classList.add("visitado");

                    window.location.href = `../info/poema.html?fecha=${fechaISO}`;

                } else {
                    window.location.href = `../info/pendiente.html?fecha=${fechaISO}`;
                }
            });

        } else {
            boton.classList.add("futuro");
            boton.disabled = true;
        }

        grid.appendChild(boton);
    }
}

/* =========================
   NAVEGACIÓN DE MES
========================= */

function initMesNavigation() {

    const btnPrev = document.getElementById("prev-mes");
    const btnNext = document.getElementById("next-mes");

    if (!btnPrev || !btnNext) return;

    btnPrev.addEventListener("click", () => {
        mesActual = (mesActual - 1 + 12) % 12;
        renderCalendario(mesActual);
    });

    btnNext.addEventListener("click", () => {
        mesActual = (mesActual + 1) % 12;
        renderCalendario(mesActual);
    });
}

/* =========================
   BÚSQUEDA GLOBAL
========================= */

function navegarBusqueda() {

    const form = document.getElementById("busqueda-form");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();

        const input = document.getElementById("busqueda");
        const palabra = input?.value?.trim().toLowerCase();

        if (!palabra) return;

        if (
            typeof secretos !== "undefined" &&
            Object.prototype.hasOwnProperty.call(secretos, palabra)
        ) {
            location.href =
                `../info/secreto.html?clave=${encodeURIComponent(palabra)}`;
        } else {
            sonidoError.currentTime = 0;
            sonidoError.play();
            input.value = "";
        }
    });
}

const sonidoError = new Audio("../wrong.mp3");
sonidoError.preload = "auto";

/* =========================
   INIT GLOBAL SEGURO
========================= */

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
                        `/info/poema.html?fecha=${fecha}`;
                }

            });

            lista.appendChild(li);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {

    navegarBusqueda();
    initAutocomplete();
    initMesNavigation?.();

    const grid = document.getElementById("grid");

    if (grid) {
        renderCalendario(mesActual);
    }
});