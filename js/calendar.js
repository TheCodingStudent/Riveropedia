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

let mesActual = 5;

const inicio = new Date(2026, 4, 25);
const fin = new Date(2026, 6, 31);

const excepciones = {
    "2026-05-07": "Gina",
    "2026-05-23": "Gina",
    "2026-10-18": "Armando"
};

const hoy = new Date();
hoy.setHours(0, 0, 0, 0);

function formatearFecha(fecha) {
    return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}-${String(fecha.getDate()).padStart(2, "0")}`;
}

function poemaExiste(fechaISO) {
    return typeof poemas !== "undefined" &&
        Object.prototype.hasOwnProperty.call(poemas, fechaISO);
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
    if (mesTexto) {
        mesTexto.textContent =
            mes.charAt(0).toUpperCase() + mes.slice(1);
    }

    /* espacios vacíos */
    for (let i = 0; i < offset; i++) {
        const vacio = document.createElement("div");
        vacio.classList.add("dia-vacio");
        grid.appendChild(vacio);
    }

    /* días */
    for (let d = 1; d <= totalDias; d++) {

        const boton = document.createElement("button");
        boton.classList.add("dia");
        boton.textContent = d;

        const fecha = new Date(2026, mesIndex, d);
        fecha.setHours(0, 0, 0, 0);

        const fechaISO = formatearFecha(fecha);

        const dentroDeRango = fecha >= inicio && fecha <= hoy && fecha <= fin;
        const esExcepcion = Object.prototype.hasOwnProperty.call(excepciones, fechaISO);
        const autorExcepcion = excepciones[fechaISO];

        if (dentroDeRango || esExcepcion) {

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
                const desbloqueado = true;

                const hoyISO = formatearFecha(new Date());

                if (
                    fechaISO === hoyISO &&
                    !desbloqueado
                ) {
                    window.location.href =
                        BASE + "info/pendiente.html?fecha=" + fechaISO;
                    return;
                }

                const poema = typeof poemas !== "undefined"
                    ? poemas[fechaISO]
                    : null;

                if (poema) {

                    localStorage.setItem(fechaISO, "visitado");
                    boton.classList.add("visitado");

                    window.location.href =
                        BASE + "info/poema.html?fecha=" + fechaISO;

                } else {

                    window.location.href =
                        BASE + "info/pendiente.html?fecha=" + fechaISO;
                }
            });

        } else {
            boton.classList.add("futuro");
            boton.disabled = true;
        }

        grid.appendChild(boton);
    }
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