const fecha = new URLSearchParams(location.search).get("fecha");
const poema = fecha && typeof poemas !== "undefined" ? poemas[fecha] : null;
const $ = id => document.getElementById(id);

const puedeAbrirse = fechaISO => {
    if (!fechaISO) return false;
    const [y, m, d] = fechaISO.split("-").map(Number);
    const fechaPoema = new Date(y, m - 1, d);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return fechaPoema <= hoy;
};

function envolverLetras(html, letras) {
    const conjunto = new Set((Array.isArray(letras) ? letras : [...letras]).map(l => l.toLowerCase()));
    let dentroTag = false, resultado = "";
    for (const c of html) {
        if (c === "<") dentroTag = true;
        resultado += !dentroTag && conjunto.has(c.toLowerCase()) ? `<span class="oculto-tecla">${c}</span>` : c;
        if (c === ">") dentroTag = false;
    }
    return resultado;
}

function aplicarBlur(html, blur) {
    let dentroTag = false, indice = 0, resultado = "";
    for (const c of html) {
        if (c === "<") dentroTag = true;
        if (!dentroTag && indice < blur.length && c.toLowerCase() === blur[indice][0].toLowerCase()) {
            resultado += `<span class="blur-letra" data-zoom="${blur[indice][1]}">${c}</span>`;
            indice++;
        } else resultado += c;
        if (c === ">") dentroTag = false;
    }
    return resultado;
}

function actualizarBlur() {
    const zoom = window.visualViewport?.scale || window.devicePixelRatio || 1;
    document.querySelectorAll(".blur-letra").forEach(el => {
        el.classList.toggle("revelada", zoom >= parseFloat(el.dataset.zoom));
    });
}

function aplicarMask(el, textoReal) {
    const textoVisible = el.textContent;
    el.classList.add("mask-container");
    el.innerHTML = `<span class="mask-falso">${textoVisible}</span><span class="mask-real">${textoReal}</span>`;
    const real = el.querySelector(".mask-real");

    el.addEventListener("mousemove", e => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left, y = e.clientY - rect.top, radio = rect.height * 0.5;
        real.style.setProperty("--mx", `${x}px`);
        real.style.setProperty("--my", `${y}px`);
        real.style.setProperty("--radio", `${radio}px`);
        real.style.clipPath = `circle(${radio}px at ${x}px ${y}px)`;
    });

    el.addEventListener("mouseleave", () => real.style.clipPath = "circle(0px at 0px 0px)");
}

function estrofasHtml(estrofas) {
    return estrofas.map(estrofa => `<p>${estrofa.join("<br>")}</p>`).join("");
}

function estrofasHtmlConIniciales(estrofas) {
    return estrofas.map(estrofa => {
        const versos = [...estrofa];
        versos[0] = versos[0].replace(/^(\S)/, `<span class="inicial-revelada">$1</span>`);
        return `<p>${versos.join("<br>")}</p>`;
    }).join("");
}

function renderCopias() {
    const seleccion = poema.estadoInicial?.length ? [...poema.estadoInicial] : poema.estrofasCopias.map(() => 0);
    const correcto = poema.combinacionCorrecta;
    const contenedor = $("poema-texto");
    let ultimaAnimacion = null;

    const render = () => {
        contenedor.innerHTML = poema.estrofasCopias.map((grupo, i) => `
            <article class="copia-estrofa ${ultimaAnimacion?.index === i ? ultimaAnimacion.clase : ""}">
                <button class="copia-btn" type="button" data-index="${i}" data-dir="-1" aria-label="Estrofa anterior">‹</button>
                <div class="copia-texto">${estrofasHtml([grupo[seleccion[i]]])}</div>
                <button class="copia-btn" type="button" data-index="${i}" data-dir="1" aria-label="Estrofa siguiente">›</button>
            </article>
        `).join("");
        ultimaAnimacion = null;
    };

    const revelar = () => {
        contenedor.classList.add("tesoro-revelado");
        $("poema-titulo").classList.add("titulo-revelado");
        $("poema-titulo").textContent = poema.revelacion?.titulo || poema.titulo;
        contenedor.innerHTML = `<div class="poema-revelado">${estrofasHtmlConIniciales(poema.estrofas)}</div>`;
        $("poema-firma").innerHTML = `<span>— ${poema.autor}</span><br><small>${poema.revelacion?.pd || poema.pd}</small>`;
    };

    render();
    contenedor.addEventListener("click", e => {
        const btn = e.target.closest(".copia-btn");
        if (!btn || contenedor.classList.contains("tesoro-revelado")) return;

        const index = Number(btn.dataset.index);
        const dir = Number(btn.dataset.dir);
        const total = poema.estrofasCopias[index].length;
        seleccion[index] = (seleccion[index] + dir + total) % total;
        ultimaAnimacion = { index, clase: dir > 0 ? "copia-slide-next" : "copia-slide-prev" };
        render();

        if (seleccion.every((valor, i) => valor === correcto[i])) revelar();
    });
}

function renderPoema() {
    if (!puedeAbrirse(fecha)) {
        location.replace("/Riveropedia/info/tramposa.html?fecha=" + encodeURIComponent(fecha || ""));
        return;
    }

    if (!poema) {
        location.href = "/Riveropedia/info/pendiente.html" + (fecha ? `?fecha=${encodeURIComponent(fecha)}` : "");
        return;
    }

    document.title = poema.titulo;
    $("poema-fecha").textContent = poema.fecha;
    $("poema-titulo").textContent = poema.titulo;

    if (poema.mecanica === "copias") {
        renderCopias();
        $("poema-firma").innerHTML = `<span>— ${poema.autor}</span><br><small>${poema.pd}</small>`;
        return;
    }

    let html = estrofasHtml(poema.estrofas);
    if (poema.ocultar) html = envolverLetras(html, poema.ocultar);
    if (poema.blur) html = aplicarBlur(html, poema.blur);
    if (poema.carrusel) {
        let versos = estrofasHtml(poema.estrofas);
        html = `
            <div class="carrusel">
                <div class="carrusel-track">${versos}</div>
                <div class="carrusel-track">${versos}</div>
            </div>
        `;
    }


    $("poema-texto").innerHTML = html;
    $("poema-firma").innerHTML = `<span>— ${poema.autor}</span><br><small>${poema.pd}</small>`;
    if (poema.mask) aplicarMask($("poema-titulo"), poema.mask);
    actualizarBlur();
}

function initEmailForm() {
    const form = $("form");
    if (!form) return;
    if (typeof emailjs !== "undefined") emailjs.init("keJJLe8j0STrmJjvm");

    form.addEventListener("submit", e => {
        e.preventDefault();
        $("time").value = poema?.titulo || "";

        if (typeof emailjs === "undefined") {
            alert("EmailJS no está disponible");
            return;
        }

        emailjs
            .sendForm("service_j62vr7a", "template_9b5jaiy", form)
            .then(() => alert("Mensaje enviado ✅"))
            .catch(err => alert("Error ❌ " + JSON.stringify(err)));
    });
}

function initPoemaKeys() {
    document.addEventListener("keydown", e => {
        if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;
        const tecla = e.key.toLowerCase();
        document.querySelectorAll(".oculto-tecla").forEach(el => {
            if (el.textContent.toLowerCase() === tecla) el.classList.add("revelado");
        });
    });
}

window.addEventListener("resize", actualizarBlur);
window.visualViewport?.addEventListener("resize", actualizarBlur);
window.visualViewport?.addEventListener("scroll", actualizarBlur);

renderPoema();
initEmailForm();
initPoemaKeys();
