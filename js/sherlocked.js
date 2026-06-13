const ALFABETO = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const $sher = id => document.getElementById(id);

function normalizar(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}

function desplazarLetra(letra, desplazamiento) {
    const indice = ALFABETO.indexOf(letra);
    if (indice === -1) return letra;
    const nuevoIndice = ((indice + desplazamiento) % ALFABETO.length + ALFABETO.length) % ALFABETO.length;
    return ALFABETO[nuevoIndice];
}

function cesar(texto, desplazamiento) {
    return [...texto].map(letra => desplazarLetra(letra, desplazamiento)).join("");
}

function cesarPalabra(texto, clave, descifrar = false) {
    const desplazamientos = [...clave].map(letra => ALFABETO.indexOf(letra) + 1).filter(Boolean);
    if (!desplazamientos.length) return texto;

    let indiceClave = 0;
    return [...texto].map(letra => {
        if (!ALFABETO.includes(letra)) return letra;
        const base = desplazamientos[indiceClave++ % desplazamientos.length];
        return desplazarLetra(letra, descifrar ? -base : base);
    }).join("");
}

function procesar() {
    const texto = normalizar($sher("texto-entrada").value);
    const clave = normalizar($sher("clave").value.trim());
    const descifrar = $sher("modo").value === "descifrar";
    if (!texto || !clave) return;

    const resultado = /^-?\d+$/.test(clave)
        ? cesar(texto, descifrar ? -parseInt(clave, 10) : parseInt(clave, 10))
        : cesarPalabra(texto, clave, descifrar);

    $sher("texto-salida").value = resultado;
}

function initSherlockedTool() {
    const boton = $sher("procesar");
    if (!boton) return;

    boton.addEventListener("click", procesar);
    $sher("modo").addEventListener("change", e => boton.textContent = e.target.value === "descifrar" ? "Descifrar" : "Cifrar");
    ["texto-entrada", "clave"].forEach(id => $sher(id).addEventListener("keydown", e => {
        if (e.key === "Enter") procesar();
    }));
}

initSherlockedTool();
