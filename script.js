const diasPorMes = {
    enero: 31, febrero: 28, marzo: 31, abril: 30,
    mayo: 31, junio: 30, julio: 31, agosto: 31,
    septiembre: 30, octubre: 31, noviembre: 30, diciembre: 31
};

// Rango permitido
const inicio = new Date("2026-05-25");
const fin = new Date("2026-07-31");
const excepciones = ["2026-05-07", "2026-10-18"];

// Fecha actual
const hoy = new Date();

function renderCalendario(mes) {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";

    const totalDias = diasPorMes[mes];
    const mesNumero = Object.keys(diasPorMes).indexOf(mes) + 1;

    // 🔧 Actualizar el select al mes actual
    const selectMes = document.getElementById("mes");
    if (selectMes.value !== mes) {
        selectMes.value = mes;
    }

    for (let d = 1; d <= totalDias; d++) {
        const boton = document.createElement("button");
        boton.classList.add("dia");
        boton.textContent = d;

        const fecha = new Date(`2026-${String(mesNumero).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
        const fechaISO = fecha.toISOString().split("T")[0];

        // Condiciones de disponibilidad
        if (((fecha >= inicio && fecha <= fin) || excepciones.includes(fechaISO)) && fecha <= hoy) {
            boton.classList.add("disponible");
            boton.dataset.dia = fechaISO;

            // Revisar si ya fue visitado
            if (localStorage.getItem(fechaISO) === "visitado") {
                boton.classList.add("visitado");
                boton.innerHTML = `${d} <span class="x">X</span>`;
            }

            // Acción al hacer click
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


document.getElementById("mes").addEventListener("change", e => {
    renderCalendario(e.target.value);
});

// Render inicial
renderCalendario("mayo");
