const ALFABETO = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

function normalizar(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
}

function desplazarLetra(letra, desplazamiento) {
    const indice = ALFABETO.indexOf(letra);

    if (indice === -1) {
        return letra;
    }

    let nuevoIndice =
        (indice + desplazamiento) % ALFABETO.length;

    if (nuevoIndice < 0) {
        nuevoIndice += ALFABETO.length;
    }

    return ALFABETO[nuevoIndice];
}

function cesar(texto, desplazamiento) {
    let resultado = "";

    for (const letra of texto) {
        resultado += desplazarLetra(
            letra,
            desplazamiento
        );
    }

    return resultado;
}

function cesarPalabra(texto, clave, descifrar = false) {

    const desplazamientos = [...clave]
        .map(letra => ALFABETO.indexOf(letra) + 1)
        .filter(n => n > 0);

    if (!desplazamientos.length) {
        return texto;
    }

    let resultado = "";
    let indiceClave = 0;

    for (const letra of texto) {

        const indice = ALFABETO.indexOf(letra);

        if (indice === -1) {
            resultado += letra;
            continue;
        }

        let desplazamiento =
            desplazamientos[
                indiceClave % desplazamientos.length
            ];

        if (descifrar) {
            desplazamiento *= -1;
        }

        resultado += desplazarLetra(
            letra,
            desplazamiento
        );

        indiceClave++;
    }

    return resultado;
}

function procesar() {

    const texto = normalizar(
        document.getElementById("texto-entrada").value
    );

    const clave = normalizar(
        document.getElementById("clave").value.trim()
    );

    const descifrar =
        document.getElementById("modo").value === "descifrar";

    if (!texto || !clave) {
        return;
    }

    let resultado;

    if (/^-?\d+$/.test(clave)) {

        let desplazamiento = parseInt(clave);

        if (descifrar) {
            desplazamiento *= -1;
        }

        resultado = cesar(
            texto,
            desplazamiento
        );

    } else {

        resultado = cesarPalabra(
            texto,
            clave,
            descifrar
        );
    }

    document.getElementById("texto-salida").value =
        resultado;
}

document
    .getElementById("procesar")
    .addEventListener("click", procesar);

["texto-entrada", "clave"].forEach(id => {
    document
        .getElementById(id)
        .addEventListener("keydown", e => {
            if (e.key === "Enter") {
                procesar();
            }
        });
});