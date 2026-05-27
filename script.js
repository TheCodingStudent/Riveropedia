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

// Rango permitido
const inicio = new Date(2026, 4, 25); // 25 mayo 2026
const fin = new Date(2026, 6, 31);    // 31 julio 2026

// Excepciones
const excepciones = ["2026-05-07", "2026-10-18"];

// Fecha actual SIN hora
const hoy = new Date();
hoy.setHours(0, 0, 0, 0);

function formatearFecha(fecha) {
    return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}-${String(fecha.getDate()).padStart(2, "0")}`;
}

function renderCalendario(mes) {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    const totalDias = diasPorMes[mes];
    const mesNumero = Object.keys(diasPorMes).indexOf(mes);

    // Actualizar select
    const selectMes = document.getElementById("mes");
    if (selectMes.value !== mes) {
        selectMes.value = mes;
    }

    for (let d = 1; d <= totalDias; d++) {

        const boton = document.createElement("button");
        boton.classList.add("dia");
        boton.textContent = d;

        // Fecha local correcta
        const fecha = new Date(2026, mesNumero, d);
        fecha.setHours(0, 0, 0, 0);

        const fechaISO = formatearFecha(fecha);

        // Condiciones
        const dentroDeRango = fecha >= inicio && fecha <= fin;
        const esExcepcion = excepciones.includes(fechaISO);
        const noEsFuturo = fecha <= hoy;

        if ((dentroDeRango || esExcepcion) && noEsFuturo) {

            boton.classList.add("disponible");
            boton.dataset.dia = fechaISO;

            // Revisar visitado
            if (localStorage.getItem(fechaISO) === "visitado") {
                boton.classList.add("visitado");
                boton.innerHTML = `${d} <span class="x">X</span>`;
            }

            // Click
            boton.addEventListener("click", () => {

                localStorage.setItem(fechaISO, "visitado");

                boton.classList.add("visitado");
                boton.innerHTML = `${d} <span class="x">X</span>`;

                window.location.href = `poemas/${fechaISO}.html`;
            });

        } else {

            boton.classList.add("futuro");
            boton.disabled = true;
        }

        grid.appendChild(boton);
    }
}

// Cambio de mes
document.getElementById("mes").addEventListener("change", e => {
    renderCalendario(e.target.value);
});

// Render inicial
renderCalendario("mayo");