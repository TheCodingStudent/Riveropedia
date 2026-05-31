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

    return Object.prototype.hasOwnProperty.call(
        poemas,
        fechaISO
    );
}

function renderCalendario(mes) {

    const grid =
        document.getElementById("grid");

    grid.innerHTML = "";

    const totalDias =
        diasPorMes[mes];

    const mesNumero =
        Object.keys(diasPorMes)
            .indexOf(mes);

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

        const fecha =
            new Date(2026, mesNumero, d);

        fecha.setHours(0, 0, 0, 0);

        const fechaISO =
            formatearFecha(fecha);

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

            boton.classList.add(
                "disponible"
            );

            boton.dataset.dia =
                fechaISO;

            if (esExcepcion) {

                if (
                    autorExcepcion ===
                    "Armando"
                ) {

                    boton.classList.add(
                        "armando"
                    );
                }

                if (
                    autorExcepcion ===
                    "Gina"
                ) {

                    boton.classList.add(
                        "gina"
                    );
                }
            }

            if (
                localStorage.getItem(
                    fechaISO
                ) === "visitado"
            ) {

                boton.classList.add(
                    "visitado"
                );

                boton.innerHTML =
                    `${d} <span class="x">X</span>`;
            }

            boton.addEventListener(
                "click",
                () => {

                    const ahora =
                        new Date();

                    const desbloqueado =
                        ahora.getHours() >=
                        21;

                    if (
                        fechaISO ===
                            formatearFecha(
                                hoy
                            ) &&
                        !desbloqueado
                    ) {

                        window.location.href =
                            `pendiente.html?fecha=${fechaISO}`;

                        return;
                    }

                    if (
                        poemaExiste(
                            fechaISO
                        )
                    ) {

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
                            `poema.html?fecha=${fechaISO}`;

                    } else {

                        window.location.href =
                            `pendiente.html?fecha=${fechaISO}`;
                    }
                }
            );

        } else {

            boton.classList.add(
                "futuro"
            );

            boton.disabled = true;
        }

        grid.appendChild(boton);
    }
}

const selectorMes =
    document.getElementById("mes");

if (selectorMes) {

    selectorMes.addEventListener(
        "change",
        e => {

            renderCalendario(
                e.target.value
            );
        }
    );
}

const formularioBusqueda =
    document.getElementById(
        "busqueda-form"
    );

if (formularioBusqueda) {

    formularioBusqueda.addEventListener(
        "submit",
        e => {

            e.preventDefault();

            const palabra =
                document
                    .getElementById(
                        "busqueda"
                    )
                    .value
                    .trim()
                    .toLowerCase();

            if (!palabra) {

                return;
            }

            window.location.href =
                `secretos/${palabra}.html`;
        }
    );
}

if (
    document.getElementById(
        "grid"
    )
) {

    renderCalendario("mayo");
}