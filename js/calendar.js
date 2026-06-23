const diasPorMes = {
    enero: 31, febrero: 28, marzo: 31, abril: 30, mayo: 31, junio: 30,
    julio: 31, agosto: 31, septiembre: 30, octubre: 31, noviembre: 30, diciembre: 31
};

const meses = Object.keys(diasPorMes);
let mesActual = 5;

const inicio = new Date(2026, 4, 25);
const fin = new Date(2026, 6, 31);
const excepciones = { "2026-05-07": "Gina", "2026-05-23": "Gina", "2026-10-18": "Armando" };
const hoy = new Date();
hoy.setHours(0, 0, 0, 0);

function formatearFecha(fecha) {
    const y = fecha.getFullYear();
    const m = String(fecha.getMonth() + 1).padStart(2, "0");
    const d = String(fecha.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function renderCalendario(mesIndex) {
    const grid = document.getElementById("grid");
    if (!grid) return;

    grid.innerHTML = "";
    const mes = meses[mesIndex];
    const totalDias = diasPorMes[mes];
    const primerDia = new Date(2026, mesIndex, 1).getDay();
    const offset = primerDia === 0 ? 6 : primerDia - 1;
    const mesTexto = document.getElementById("mes-actual");
    if (mesTexto) mesTexto.textContent = mes.charAt(0).toUpperCase() + mes.slice(1);

    for (let i = 0; i < offset; i++) {
        const vacio = document.createElement("div");
        vacio.classList.add("dia-vacio");
        grid.appendChild(vacio);
    }

    for (let d = 1; d <= totalDias; d++) {
        const boton = document.createElement("button");
        const fecha = new Date(2026, mesIndex, d);
        const fechaISO = formatearFecha(fecha);
        const esExcepcion = Object.prototype.hasOwnProperty.call(excepciones, fechaISO);
        const dentroDeRango = fecha >= inicio && fecha <= hoy && fecha <= fin;

        boton.classList.add("dia");
        boton.textContent = d;
        fecha.setHours(0, 0, 0, 0);

        if (dentroDeRango || esExcepcion) prepararDiaDisponible(boton, fechaISO, esExcepcion);
        else {
            boton.classList.add("futuro");
            boton.disabled = true;
        }

        grid.appendChild(boton);
    }
}

function prepararDiaDisponible(boton, fechaISO, esExcepcion) {
    const autor = excepciones[fechaISO];
    const poema = typeof poemas !== "undefined" ? poemas[fechaISO] : null;
    const icono = obtenerIconoCalendario(poema?.calendarioIcono, autor);

    boton.classList.add("disponible");
    boton.dataset.dia = fechaISO;
    boton.dataset.icon = icono.valor;
    if (poema?.titulo) {
        const diaDelMes = Number(fechaISO.slice(-2));
        boton.dataset.tooltip = poema.titulo;
        boton.title = poema.titulo;
        boton.setAttribute("aria-label", `${diaDelMes}: ${poema.titulo}`);
    }
    boton.style.setProperty("--calendar-icon-color", icono.color);
    boton.style.setProperty("--calendar-icon-scale", icono.escala);

    if (esExcepcion && autor) boton.classList.add(autor.toLowerCase());
    if (localStorage.getItem(fechaISO) === "visitado") boton.classList.add("visitado");

    boton.addEventListener("click", () => {
        if (!poema) {
            location.href = BASE + "info/pendiente.html?fecha=" + fechaISO;
            return;
        }

        localStorage.setItem(fechaISO, "visitado");
        boton.classList.add("visitado");
        location.href = BASE + "info/poema.html?fecha=" + fechaISO;
    });
}

function obtenerIconoCalendario(config, autor) {
    const colorBase = autor === "Gina" ? "orange" : autor === "Armando" ? "blue" : "red";
    if (!config) return { valor: "♥", color: colorBase, escala: "1" };
    if (typeof config === "string") return { valor: config, color: colorBase, escala: "1" };

    return {
        valor: config.valor || config.icono || "♥",
        color: config.color || colorBase,
        escala: String(config.escala ?? 1)
    };
}

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
