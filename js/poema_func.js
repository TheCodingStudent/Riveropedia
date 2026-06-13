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

    let html = poema.estrofas.map(estrofa => `<p>${estrofa.join("<br>")}</p>`).join("");
    if (poema.ocultar) html = envolverLetras(html, poema.ocultar);
    if (poema.blur) html = aplicarBlur(html, poema.blur);

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
