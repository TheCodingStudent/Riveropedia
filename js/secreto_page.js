const secretoParams = new URLSearchParams(location.search);
const claveSecreto = secretoParams.get("clave");
const $secreto = id => document.getElementById(id);
const comoLista = valor => Array.isArray(valor) ? valor : [valor];
const letrasComoSet = letras => new Set((Array.isArray(letras) ? letras : [...String(letras)]).map(l => l.toLowerCase()));

function resaltarLetraConTooltip(texto, indices, tooltips) {
    const chars = texto.split("");
    indices.forEach((i, idx) => {
        if (i >= 0 && i < chars.length) chars[i] = `<span class="resaltada" data-tooltip="${tooltips[idx]}">${chars[i]}</span>`;
    });
    return chars.join("");
}

function ocultarTitulo(titulo, letras) {
    const conjunto = letrasComoSet(letras);
    return titulo.split("").map(c => conjunto.has(c.toLowerCase()) ? `<span class="letra-robada" data-letra="${c.toLowerCase()}">${c}</span>` : c).join("");
}

function marcarRobables(html, letras) {
    const conjunto = letrasComoSet(letras);
    let resultado = "", dentroTag = false;
    for (const c of html) {
        if (c === "<") dentroTag = true;
        resultado += !dentroTag && conjunto.has(c.toLowerCase()) ? `<span class="robar" data-letra="${c.toLowerCase()}">${c}</span>` : c;
        if (c === ">") dentroTag = false;
    }
    return resultado;
}

function aplicarArcoiris(html, config) {
    const letras = config?.letras || [];
    const mapa = new Map(letras.map(item => [String(item.letra || "").toLowerCase(), item]));
    const fija = String(config?.fija || "").toLowerCase();
    let resultado = "", dentroTag = false;

    for (const c of html) {
        if (c === "<") dentroTag = true;

        const item = mapa.get(c.toLowerCase());
        if (!dentroTag && item) {
            const clase = c.toLowerCase() === fija ? "arcoiris-letra fija" : "arcoiris-letra";
            resultado += `<span class="${clase}" style="--arcoiris-color:${item.color}" title="${item.nombre || item.color}">${c}</span>`;
        } else {
            resultado += c;
        }

        if (c === ">") dentroTag = false;
    }

    return resultado;
}

function aplicarMask(elemento, textoReal) {
    const textoVisible = elemento.textContent;
    elemento.classList.add("mask-container");
    elemento.innerHTML = `<span class="mask-falso">${textoVisible}</span><span class="mask-real">${textoReal}</span>`;
    const real = elemento.querySelector(".mask-real");
    elemento.addEventListener("mousemove", e => {
        const rect = elemento.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top, radio = rect.height * 0.5;
        real.style.setProperty("--mx", `${x}px`);
        real.style.setProperty("--my", `${y}px`);
        real.style.setProperty("--radio", `${radio}px`);
        real.style.clipPath = `circle(${radio}px at ${x}px ${y}px)`;
    });
    elemento.addEventListener("mouseleave", () => real.style.clipPath = "circle(0px at 0px 0px)");
}

function renderSecreto() {
    if (!claveSecreto || !secretos[claveSecreto]) {
        $secreto("titulo").textContent = "Secreto no encontrado";
        $secreto("contenido").innerHTML = "<p>No existe ningún secreto asociado a esta clave.</p>";
        return;
    }

    const secreto = secretos[claveSecreto];
    document.title = secreto.titulo;
    $secreto("clave").textContent = claveSecreto;
    let tituloFinal = resaltarLetraConTooltip(secreto.titulo, comoLista(secreto.index), comoLista(secreto.tooltip));
    let contenidoFinal = secreto.contenido;

    if (secreto.robar) {
        tituloFinal = ocultarTitulo(tituloFinal, secreto.robar);
        contenidoFinal = marcarRobables(contenidoFinal, secreto.robar);
    }

    if (secreto.arcoiris) {
        document.body.classList.add("secreto-arcoiris-activo");
        tituloFinal = aplicarArcoiris(tituloFinal, secreto.arcoiris);
        contenidoFinal = aplicarArcoiris(contenidoFinal, secreto.arcoiris);
    }

    $secreto("titulo").innerHTML = tituloFinal;
    $secreto("contenido").innerHTML = contenidoFinal;
    if (secreto.mask) aplicarMask($secreto("titulo"), secreto.mask);
}

document.addEventListener("click", e => {
    if (!e.target.classList.contains("robar")) return;
    const letra = e.target.dataset.letra;
    e.target.classList.add("robada");
    document.querySelector(`.letra-robada[data-letra="${letra}"]:not(.revelada)`)?.classList.add("revelada");
});

renderSecreto();
