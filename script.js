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
const inicio = new Date(2026, 4, 25);
const fin = new Date(2026, 6, 31);

// Excepciones
const excepciones = {
    "2026-05-07": "Gina",
    "2026-05-23": "Gina",
    "2026-10-18": "Armando"
};

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

    const mesNumero =
        Object.keys(diasPorMes).indexOf(mes);

    // Actualizar select
    const selectMes =
        document.getElementById("mes");

    if (selectMes.value !== mes) {
        selectMes.value = mes;
    }

    for (let d = 1; d <= totalDias; d++) {

        const boton =
            document.createElement("button");

        boton.classList.add("dia");

        boton.textContent = d;

        // Fecha local correcta
        const fecha =
            new Date(2026, mesNumero, d);

        fecha.setHours(0, 0, 0, 0);

        const fechaISO =
            formatearFecha(fecha);

        // Condiciones
        const dentroDeRango =
            fecha >= inicio &&
            fecha <= fin;

        const esExcepcion =
            fechaISO in excepciones;

        const autorExcepcion =
            excepciones[fechaISO];

        const noEsFuturo =
            fecha <= hoy;

        if (
            (dentroDeRango && noEsFuturo) ||
            esExcepcion
        ) {

            boton.classList.add("disponible");

            boton.dataset.dia = fechaISO;

            // Color especial
            if (esExcepcion) {

                if (autorExcepcion === "Armando") {

                    boton.classList.add("armando");
                }

                if (autorExcepcion === "Gina") {

                    boton.classList.add("gina");
                }
            }

            // Revisar visitado
            if (
                localStorage.getItem(fechaISO) ===
                "visitado"
            ) {

                boton.classList.add("visitado");

                boton.innerHTML =
                    `${d} <span class="x">X</span>`;
            }

            // Click
            boton.addEventListener(
                "click",
                async () => {

                    const ahora =
                        new Date();

                    const desbloqueado =
                        ahora.getHours() >= 21;

                    // Si es hoy y aún no son las 9 PM
                    if (
                        fechaISO === formatearFecha(hoy) &&
                        !desbloqueado
                    ) {

                        window.location.href =
                            `poemas/pendiente.html?fecha=${fechaISO}`;

                        return;
                    }

                    try {

                        const response =
                            await fetch(
                                `poemas/${fechaISO}.html`,
                                {
                                    method: "HEAD"
                                }
                            );

                        // SOLO marcar visitado si existe
                        if (response.ok) {

                            localStorage.setItem(
                                fechaISO,
                                "visitado"
                            );

                            boton.classList.add(
                                "visitado"
                            );

                            boton.innerHTML =
                                `${d} <span class="x">X</span>`;

                            window.location.href =
                                `poemas/${fechaISO}.html`;

                        } else {

                            window.location.href =
                                `poemas/pendiente.html?fecha=${fechaISO}`;
                        }

                    } catch {

                        window.location.href =
                            `poemas/pendiente.html?fecha=${fechaISO}`;
                    }
                }
            );

        } else {

            boton.classList.add("futuro");

            boton.disabled = true;
        }

        grid.appendChild(boton);
    }
}

// Cambio de mes
document.getElementById("mes")
    .addEventListener("change", e => {

        renderCalendario(e.target.value);
    });

// Render inicial
renderCalendario("mayo");
